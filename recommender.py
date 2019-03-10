# Import Dependencies Needed 
import numpy as np 
import pandas as pd 
import sys 
# Needed for Mongo Client
import pymongo
from pymongo import MongoClient

# print str(sys.argv[1])

# Setting URI to be - 
uri = 'mongodb://DylanBrohan:Thegodfather00@ds259463.mlab.com:59463/chatai' 

# Mongo connection to database collection
MONGODB_URI = "mongodb://DylanBrohan:Thegodfather00@ds259463.mlab.com:59463/chatai"
client = MongoClient(MONGODB_URI, connectTimeoutMS=30000)
# Database
db = client.get_database("chatai")
# data object correlates to the collection in the database
data = db.recommender

# Creating the data into a dataframe
data = pd.DataFrame(list(data.find()))
  
# The objective is to generate some Language recommendations for a user, given Languages they have already rated 
#Create the Matrix Table that will be used in creating similarties
userItemRatingMatrix=pd.pivot_table(data, values='rating', index=['userId'], columns=['itemId'])
# function to find the similarity between 2 users. 
# use a correlation to do so 
from scipy.spatial.distance import correlation 
def similarity(user1,user2):
    user1=np.array(user1)-np.nanmean(user1) 
    # normalizing user1 by 
    # the mean rating of user 1 for any Language.    
    #  np.nanmean() - returns the mean of an array after ignoring and NaN values 
    user2=np.array(user2)-np.nanmean(user2)
    # finds the similarity between 2 users
    # subset each user to be represented only by the ratings for the 
    # Languages the 2 users have in common 
    commonItemIds=[i for i in range(len(user1)) if user1[i]>0 and user2[i]>0]
    # Gives us languages for which both users have non NaN ratings 
    if len(commonItemIds)==0:
        # If there are no Languages in common 
        return 0
    else:
        user1=np.array([user1[i] for i in commonItemIds])
        user2=np.array([user2[i] for i in commonItemIds])
        return correlation(user1,user2)
    
# Using this similarity function, find the nearest neighbours of the active user
def nearestNeighbourRatings(activeUser,K):
    # This function will find the K Nearest neighbours of the active user, then 
    # use their ratings to predict the activeUsers ratings for other Languages 
    similarityMatrix=pd.DataFrame(index=userItemRatingMatrix.index,
                                  columns=['Similarity'])
    # Creates an empty matrix whose row index is userIds, and the value will be 
    # similarity of that user to the active User
    for i in userItemRatingMatrix.index:
        similarityMatrix.loc[i]=similarity(userItemRatingMatrix.loc[activeUser],
                                          userItemRatingMatrix.loc[i])
        # Find the similarity between user i and the active user and add it to the 
        # similarityMatrix 
    similarityMatrix=pd.DataFrame.sort_values(similarityMatrix,
                                              ['Similarity'],ascending=[0])
    # Sort the similarity matrix in the descending order of similarity 
    nearestNeighbours=similarityMatrix[:K]
    # The above line will give us the K Nearest neighbours    
    # taking the nearest neighbours and use their ratings 
    # to predict the active user's rating for every language
    neighbourItemRatings=userItemRatingMatrix.loc[nearestNeighbours.index]
    # the similarity matrix had an index which was the userId, By sorting 
    # and picking the top K rows, the nearestNeighbours dataframe now has 
    # a dataframe whose row index is the userIds of the K Nearest neighbours 

    predictItemRating=pd.DataFrame(index=userItemRatingMatrix.columns, columns=['Rating'])
    # A placeholder for the predicted item ratings. It's row index is the 
    # list of itemIds which is the same as the column index of userItemRatingMatrix
    for i in userItemRatingMatrix.columns:
        # for each item 
        predictedRating=np.nanmean(userItemRatingMatrix.loc[activeUser])
        # start with the average rating of the user
        for j in neighbourItemRatings.index:
            # for each neighbour in the neighbour list 
            if userItemRatingMatrix.loc[j,i]>0:
                # If the neighbour has rated that item
                # Add the rating of the neighbour for that item
                #    adjusted by 
                #    the average rating of the neighbour 
                #    weighted by 
                #    the similarity of the neighbour to the active user
                predictedRating += (userItemRatingMatrix.loc[j,i]
                                    -np.nanmean(userItemRatingMatrix.loc[j]))*nearestNeighbours.loc[j,'Similarity']
        # We are out of the loop which uses the nearest neighbours, add the 
        # rating to the predicted Rating matrix
        predictItemRating.loc[i,'Rating']=predictedRating
    return predictItemRating


# using these predicted Ratings to find the top N Recommendations for the
# active user 
def topNRecommendations(activeUser,N):
    predictItemRating=nearestNeighbourRatings(activeUser,5)
    # Use the 5 nearest neighbours to find the predicted ratings
    languagesAlreadyRated=list(userItemRatingMatrix.loc[activeUser]
                              .loc[userItemRatingMatrix.loc[activeUser]>0].index)
    # find the list of items whose ratings which are not NaN
    predictItemRating=predictItemRating.drop(languagesAlreadyRated)
    topRecommendations=pd.DataFrame.sort_values(predictItemRating,
                                                ['Rating'],ascending=[0])[:N]
    
    # This will give us the list of itemIds which are the top recommendations 
    # Let's find the corresponding movie titles 
    topRecommendationTitles=(data.loc[data.itemId.isin(topRecommendations.index)])
    topRecommendationTitles = topRecommendationTitles[:3]
    return list(topRecommendationTitles.title)
    
# activeUser= db.scout.findOne()


# activeUser=1

# userId = db.recommender.userId
# activeUser = db.recommender.find_one(
#   sort=[( '_id', pymongo.DESCENDING 
#  )]
# )

# userId = db.recommender.userId
# userId = {userId:userId}
# activeUser = db.recommender.find(userId, pymongo.DESCENDING)  

# userId = frozenset(userId.items())
# activeUser = db.recommender.find_one().sort([(userId, -1)]).limit(1)

activeUser = db.recommender.find_one().sort([('userId', -1)]).limit(1)


print(topNRecommendations(activeUser,10))

