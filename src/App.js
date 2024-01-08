import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import { ProductService } from "./Services/mineDataServices";
import logo from "../src/img/logo.png";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import Criteria from "./components/criteria/criteria";
import Matching from "./components/matching/matching";

function App() { 
  
  return (
    <div className="App">
      <div className="grid-container">
        <header className="header">
          <div className="header_main">
            <img
              src={logo}
              className="logo"
              height="20"
              width="20"
              alt="logo"
            />
          </div>
          <div className="header__avatar"></div>
          <div className="navBar">
            <ul className="sidenav__list">
              <li className="sidenav__list-item">
                <i className="fa fa-tasks" /> Dashboard
              </li>
              <li className="sidenav__list-item tooltip">
                <i className="fa fa-exchange" /> Allocation
                <ul className="tooltiptext">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                    >
                      Criteria
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/matching"
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                    >
                      Matching
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__list-item">
                <i className="fa fa-bookmark-o" /> Credit
              </li>
            </ul>
          </div>
          <div className="header__avatar"></div>
        </header>

        <Routes>
          <Route exact path="/" element={<Criteria />}></Route>
          <Route exact path="/matching" element={<Matching />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
