import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import EarthquakeTable from "./components/EarthquakeTable/EarthquakeTable";

const MainComponent = () => {
  return (
    <div className="container">
      <h1>esto es una prueba</h1>
      <EarthquakeTable/>
    </div>
  );
};
    const root = ReactDOM.createRoot(document.getElementById("mainComponent"));
      root.render(
        <MainComponent/>
      );


export default MainComponent;