import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import EarthquakeTable from "./EarthquakeTable";

const MainComponent = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello worlds!</h1>
      <EarthquakeTable/>
    </div>
  );
};

document.addEventListener("DOMContentLoaded",() => {
    const root = createRoot(document.getElementById("mainComponent"));
    root.render(<MainComponent/>);
})

export default MainComponent;