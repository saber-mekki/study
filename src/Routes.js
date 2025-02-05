import React, {Component} from "react";
import {Router, Route, Switch, HashRouter} from "react-router-dom";
import history from "./History";
import HomeOne from "./components/HomeOne";
import HomeTwo from "./components/HomeTwo";
import HomeThree from "./components/HomeThree";
import AboutOne from "./components/AboutOne";
import AboutTwo from "./components/AboutTwo";
import AboutThree from "./components/AboutThree";
import Courses from "./components/Courses";
import Blog from "./components/Blog";
import JobBoard from "./components/JobBoard";
import CourseDetailsOne from "./components/CourseDetailsOne";
import CourseDetailsTwo from "./components/CourseDetailsTwo";
import BlogDetails from "./components/BlogDetails";
import Contact from "./components/Contact";

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <HashRouter basename="/">
                    <Switch>
                        <Route exact path={'/'} render={(props) => (<HomeOne {...props} />)} />
                        <Route exact path={'/home-one'} render={(props) => (<HomeOne {...props} />)} />
                        <Route exact path={'/home-two'} render={(props) => (<HomeTwo {...props} />)} />
                        <Route exact path={'/home-three'} render={(props) => (<HomeThree {...props} />)} />
                        <Route exact path={'/about-one'} render={(props) => (<AboutOne {...props} />)} />
                        <Route exact path={'/about-two'} render={(props) => (<AboutTwo {...props} />)} />
                        <Route exact path={'/about-three'} render={(props) => (<AboutThree {...props} />)} />
                        <Route exact path={'/courses'} render={(props) => (<Courses {...props} />)} />
                        <Route exact path={'/blog'} render={(props) => (<Blog {...props} />)} />
                        <Route exact path={'/job-board'} render={(props) => (<JobBoard {...props} />)} />
                        <Route exact path={'/course-details-one'} render={(props) => (<CourseDetailsOne {...props} />)} />
                        <Route exact path={'/course-details-two'} render={(props) => (<CourseDetailsTwo {...props} />)} />
                        <Route exact path={'/blog-details'} render={(props) => (<BlogDetails {...props} />)} />
                        <Route exact path={'/contact'} render={(props) => (<Contact {...props} />)} />
                    </Switch>
                </HashRouter>
            </Router>
        )
    }
}

export default Routes;