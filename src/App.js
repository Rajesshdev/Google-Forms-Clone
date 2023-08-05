import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Template from "./Pages/Template";
import Forms from "./Pages/Forms";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Forms} />
        <Route path="/assets/forms/add" exact component={Template} />
        <Route path="/assets/forms/edit/:editid" exact component={Template} />
      </BrowserRouter>
    </div>
  );
}

export default App;
