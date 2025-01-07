import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Criteria from "./component/criteria/criteria";
import Matching from "./component/matching/matching";
import Utility from "./component/utility/utility";
import logo from "../src/img/logo.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "font-awesome/css/font-awesome.min.css";

import { Amplify } from "aws-amplify";
import "./App.css";

import { Button, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import Tracking from "./component/tracking/tracking";
import { useAuthenticator } from "@aws-amplify/ui-react";
import BusinessRuleGenerator from "./component/businessRuleGenerator/businessRuleGenerator";
import QueryGenerator from "./component/queryGenerator/queryGenerator";
import FileInput from "./component/fileInput/fileInput";
import About from "./component/about/about";
Amplify.configure(awsExports);
function App({ signOut, user }) {
  const { route } = useAuthenticator((context) => [context.route]);
  const [openModal, setOpenModal] = useState(false);
  const [hideMenu, setHidemenu] = useState(false);


  const openModalFunc = () => {
    setOpenModal(true);
  }
  const closeModalFunc = () => {
    setOpenModal(false);
  }
  // Use the value of route to decide which page to render
  //return route === 'authenticated' ? <home /> : <Authenticator />;



  return (
    route === "authenticated" && (
      <div className="site-wrap">
        <Router>
          <div className="grid-container">
            <nav className={"site-nav" + (hideMenu ? ' short-nav' : '')}>
              <div className="name">
                <div className="logoBlock" onClick={() => setHidemenu(!hideMenu)}>
                  <img
                    src={logo}
                    className="logo"
                    height="30"
                    width="30"
                    alt="logo"
                  />
                </div>
                {hideMenu || 'Sustainability Dashboard'}
                </div>

              <About
                open={openModal}
                closeOnDocumentClick={() => closeModalFunc()}
                onClose={() => closeModalFunc()}
              />
              <ul className="menu_wrapper">
                {/* <li class="active">
      <a href="#">Dashboard</a>
     
    </li> */}
                <li>
                  {/* <a href="#0">Allocation</a> */}
                  <ul>
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
                    <li>
                      <NavLink
                        to="/tracking"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                      >
                        Tracking
                      </NavLink>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <a href="#0">Credit</a>
                </li> */}
                <li>
                  <NavLink
                    to="/utility"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    Utility
                  </NavLink>
                  <ul>
                    <li>
                      <NavLink
                        to="/brg"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                      >
                        Business rule genertor
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/fileUpload"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                      >
                        Data Upload
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/queryGenerator"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                      >
                        Query generator
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>


              <div className="signOutBtn-wrapper">
                <a
                  className="button"
                  onClick={openModalFunc}>
                  About</a>
                <Button
                  onClick={signOut}
                  type="submit"
                  className="signOut"
                  children="Sign out"
                  size="small"
                  variation="waring"
                >
                  Sign out
                </Button>
              </div>
            </nav>

            {/* <div className="right-sect-wrapper"> */}
            <Routes>
              <Route exact path="/" element={<Criteria />}></Route>
              <Route exact path="/matching" element={<Matching />}></Route>
              <Route exact path="/tracking" element={<Tracking />}></Route>
              <Route exact path="/utility" element={<Utility />}></Route>
              <Route
                exact
                path="/brg"
                element={<BusinessRuleGenerator />}
              ></Route>
              <Route
                exact
                path="/queryGenerator"
                element={<QueryGenerator />}
              ></Route>
              <Route
                exact
                path="/fileUpload"
                element={<FileInput />}
              ></Route>
            </Routes>
              {/* </div> */}
          </div>
        </Router>
      </div>
    )
  );
}

export default withAuthenticator(App);
