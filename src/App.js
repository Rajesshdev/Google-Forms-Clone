{
  /*File: App.js
   Objective: 
   The objective of the page is is to configure the routing system for a React application using React Router. 
   It enables the application to render different components based on the current URL path.
   The code imports the necessary dependencies, including React, Switch, Route, Router from "react-router-dom", StylesProvider, and createGenerateClassName from "@material-ui/core/styles".
   It creates a custom generateClassName function using createGenerateClassName from "@material-ui/core/styles". 
   This function generates unique class names for CSS modules and applies a production prefix to ensure unique styling.
   The code exports a functional component that receives a "history" object as a prop. 
   The "history" object allows the application to track the browser history and navigate between different routes.
   Within the component, a div element is rendered as the root element for the routing configuration.
   The StylesProvider component from Material-UI is used to provide a context for generating unique class names. 
   The custom generateClassName function is passed as the "generateClassName" prop to ensure unique class names for Material-UI components.
   The Router component from react-router-dom is used to define the routing configuration. The "history" prop is provided to enable navigation and tracking of the browser history.
   Inside the Router component, the Switch component is used to wrap multiple Route components. 
   The Switch component ensures that only one Route is rendered at a time, based on the current URL path.

   Four Route components are defined within the Switch component:
   The first Route component specifies the path "/assets/forms/list" and renders the Forms component when the path matches.
   The second Route component specifies the path "/assets/forms/add" and renders the Template component when the path matches.
   The third Route component specifies the path "/assets/forms/edit/:editid" and renders the Template component when the path matches. The ":editid" is a placeholder for a dynamic value that can be accessed within the Template component.
   The fourth Route component specifies the path "/assets/forms/configure" and renders the Configure component when the path matches.
   
   By defining these routes, the application can render different components based on the current URL path. When a user navigates to a specific path, the corresponding component will be rendered.
   
   The routing configuration allows for easy navigation and organization of different pages or components within the React application, providing a smooth user experience and efficient management of application states.

*/
}
import React,{useEffect} from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Template from "./Pages/Template";
import Forms from "./Pages/Forms";
// Import Router Hook
import { useHistory } from "react-router-dom";
// Create a custom generateClassName function with a production prefix
const generateClassName = createGenerateClassName({
  productionPrefix: "assets",
});

// Define the routing configuration component
export default ({ history }) => {

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Forms} />
            <Route path="/assets/forms/add" exact component={Template} />
            <Route path="/assets/forms/edit/:editid" exact component={Template} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
