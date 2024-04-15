import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import FeatureCard from "./components/FeatureCard/FeatureCard";

const MainComponent = () => {
  return (
    <div className="container">
      <FeatureCard />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("mainComponent"));
root.render(<MainComponent />);

export default MainComponent;
