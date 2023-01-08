import "./App.css"
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import logo from "./Images/AndyAndMollySmall.jpg"
import SwitchWithSlide from "./SwitchWithSlide";
import React from "react";
import HeaderItem from "./components/headerItem";
import HomePage from "./pages/HomePage";
import WeddingInfo from "./pages/WeddingInfo";
import RSVP from "./pages/RSVP";
import OurStory from "./pages/OurStory";

function App() {
    let location = useLocation();
    const history = useHistory();

    function headerButtonClick(route) {
      if (!isEvening) {
        history.push(route);
      }
      else {
        history.push("/Evening" + route);
      }
    }

    let isEvening = location.pathname.startsWith("/Evening");
    console.log(location.pathname, isEvening);
    return (
      <div className="App">
        <div className="header">
          <img src={logo} alt="" className="headerImage" />
          <p className="title">Andy and Molly</p>
        </div>
        <p className="date">23<sup>rd</sup> July 2023</p>
        <div className="stickyHeader">
          <div className="headerItems">
            <HeaderItem name="Home" isActive={location.pathname.endsWith("Home") || location.pathname.endsWith("/")} headerButtonClick={() => headerButtonClick("/Home")} />
            <HeaderItem name="Our Story" isActive={location.pathname.endsWith("/OurStory")} headerButtonClick={() => headerButtonClick("/OurStory")} />
            <HeaderItem name={isEvening ? "Reception Info" : "Wedding Info"} isActive={location.pathname.endsWith("/Info")} headerButtonClick={() => headerButtonClick("/Info")} />
            <HeaderItem name="RSVP" isActive={location.pathname.endsWith("RSVP")} headerButtonClick={() => headerButtonClick("/RSVP")} />
          </div>
          <div className="tear" />
        </div>

        <div className="Pages">
          <SwitchWithSlide>
            <Switch location={location}>
              <Route
                exact path={["/", "/Home", "/Evening", "/Evening/Home"]}
                render={(props) => <HomePage isEvening={isEvening} />}
              />
              <Route
                exact path={["/OurStory", "/Evening/OurStory"]}
                render={(props) => <OurStory />}
              />
              <Route
                exact path={["/Info", "/Evening/Info"]}
                render={(props) => <WeddingInfo isEvening={isEvening} />}
              />
              <Route
                exact path={["/RSVP", "/Evening/RSVP"]}
                render={(props) => <RSVP isEvening={isEvening} />}
              />
            </Switch>
          </SwitchWithSlide>
        </div>
      </div>
    );
    }

export default App;
