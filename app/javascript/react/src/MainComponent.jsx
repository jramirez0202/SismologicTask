import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import FeatureTable from "./components/FeatureTable/FeatureTable";

const MainComponent = () => {
  return (
    <div className="container">
      <FeatureTable/>
    </div>
  );
};
    const root = ReactDOM.createRoot(document.getElementById("mainComponent"));
      root.render(
        <MainComponent/>
      );


export default MainComponent;