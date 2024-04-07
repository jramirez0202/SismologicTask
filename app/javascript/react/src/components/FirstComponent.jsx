import * as React from "react";
import * as ReactDOM from "react-dom";
import Counter from "./Counter";

const FirstComponent = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello worlds!</h1>
      <Counter/>
    </div>
  );
};

document.addEventListener("DOMContentLoaded",() => {
    ReactDOM.render(<FirstComponent/>, document.getElementById("firstComponent"))
})

export default FirstComponent;