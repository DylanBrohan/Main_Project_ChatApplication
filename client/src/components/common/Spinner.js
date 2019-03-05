import React from "react";
import spinner from "./spinner.gif";
export default () => {
  // Spinned class runs on mount if necessary
  // Img is A imported Gif
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
