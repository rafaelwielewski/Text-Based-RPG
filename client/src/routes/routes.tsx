import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Register from "@/pages/authentication/register";
import Login from "@/pages/authentication/page";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route element = {<Login />}  path="/login" />
           <Route element = {<Register />}  path="/" />
       </BrowserRouter>
   )
}

export default Routes;