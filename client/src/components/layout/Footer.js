import React from "react";

export default () => {
  // Footer Component Gets Date
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()}ChatAI
    </footer>
  );
};
