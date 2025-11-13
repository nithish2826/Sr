import {createBrowserRouter} from "react-router-dom";
import App from "../App";

let routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/login",
    element:<App/>
  },

]);

export default routes;