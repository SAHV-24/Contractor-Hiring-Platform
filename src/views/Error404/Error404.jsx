import React from "react";
import "./Error404.css";

export const Error404 = () => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <img
        className="2xl:h-96 xl:h-64"
        src="https://i.imgur.com/qIufhof.png"
        alt="404 Not Found"
      />
      <div>
        <h3 className="p-0 m-0 text-3xl text-center">
          Esta página no pudo ser encontrada
          <br /> -(￣o￣) . z Z
        </h3>
      </div>
    </div>
  );
};
