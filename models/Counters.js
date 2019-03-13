var Counters = new Schema({
  _id: String, // the schema name
  count: Number
});

Counters.statics.findAndModify = function(query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

var Counter = mongoose.model("Counter", Counters);

function incrementCounter(schemaName, callback) {
  Counter.findAndModify(
    { _id: schemaName },
    [],
    { $inc: { count: 1 } },
    { new: true, upsert: true },
    function(err, result) {
      if (err) callback(err);
      else callback(null, result.count);
    }
  );
}
