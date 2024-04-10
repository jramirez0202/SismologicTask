import React from "react";
import { ReactDOM } from "react-dom";
import { createRoot } from "react-dom/client";
import  Index  from "../react/src/page/home/Index";


document.addEventListener("DOMContentLoaded",() => {
  const root = createRoot(document.getElementById("home-index-root"));
  root.render(<Index hello={'helooa'}/>);
})