import { BrowserRouter as Router,Routes, Route, NavLink } from 'react-router-dom'; 
import Criteria from './component/criteria/criteria';
import Matching from "./component/matching/matching";
import Utility from "./component/utility/utility";
import logo from "../src/img/logo.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "font-awesome/css/font-awesome.min.css";


import { Amplify } from 'aws-amplify';
import './App.css'

import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
 
import awsExports from './aws-exports';
import Tracking from './component/tracking/tracking';
Amplify.configure(awsExports);

function App({ signOut, user }) {
 

  return (
    <div className="App"> 
      <Router>
        <div className="App">
        <div className="grid-container">
        <header className="header">
          {/* <div className="header_main">
            <img
              src={logo}
              className="logo"
              height="20"
              width="20"
              alt="logo"
            />
          </div>  */}
          <div className="navBar">
            <ul className="sidenav__list">
              <li> 
              <div className="header_main">
            <img
              src={logo}
              className="logo"
              height="20"
              width="20"
              alt="logo"
            />
          </div> 
                </li>
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
              <li className="sidenav__list-item">
               
                <i className="fa fa-bookmark-o" /> Credit
              </li>
              <li className="sidenav__list-item"> 
              <NavLink
                      to="/utility"
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active Main" : "Main"
                      }
                    >
                <i className="fa fa-cogs" /> Utility
                </NavLink>
              </li> 
              <div className='signOutBtn-wrapper'>                
              <Button onClick={signOut}
              type="submit"
              className='signOut'
              children="Sign out"
              size="small"
              variation="waring"
              >Sign out</Button> 
              </div>
            </ul>
           
          </div> 
        </header>

        <Routes>
          <Route exact path="/" element={<Criteria />}></Route>
          <Route exact path="/matching" element={<Matching />}></Route>
          <Route exact path="/tracking" element={<Tracking />}></Route>
          <Route exact path="/utility" element={<Utility />}></Route>
        </Routes>
      </div> 
        </div>
    </Router> 
    </div>
  );
}

export default withAuthenticator(App);