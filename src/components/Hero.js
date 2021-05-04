import React from "react";
//import {Navlink} from "react-router-dom"

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Pizza42 Project</h1>

    <p className="lead">
      Making the best pizza since 2020 Lockdown <a href="https://reactjs.org">React.js</a>
    </p>
  </div>
);

export default Hero;

