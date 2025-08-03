import React from "react";
import { Router, Route, Switch, HashRouter, Redirect } from "react-router-dom";

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
import Profile from "./components/layouts/Profile";
import Tutors from "./components/Tutors";
import { isAuthenticated } from "./helper";
import { ProtectedRoute } from "./ProtectedRoute";
import SignInModal from "./components/SignInModal";
import AdminDashboard from "./dashboard/AdminDashboard";
import Video from "./components/video";
import Page404 from "./Page404";

function Routes() {

   
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
                    <Route exact path={'/job-board'} render={(props) => (<JobBoard {...props} />)} />
                    <Route exact path={'/course-details-one'} render={(props) => (<CourseDetailsOne {...props} />)} />
                    <Route exact path={'/course-details-two'} render={(props) => (<CourseDetailsTwo {...props} />)} />

                    <Route exact path={'/blog'} render={(props) => (<Blog {...props} />)} />
                    <Route exact path={'/contact'} render={(props) => (<Contact {...props} />)} />
                    <Route exact path={'/login'} render={(props) => (<SignInModal {...props} />)} />
                    <Route exact path={'/login'} render={(props) => (<SignInModal {...props} />)} />
                    <ProtectedRoute exact path="/room/:roomId" component={Video} />
                    <ProtectedRoute exact path={'/video'} component={Video} />
                  
                  <Route exact path={'/dash'} render={(props) => (<AdminDashboard {...props} />)} />


                    <Route exact path="/blog-details/:id" component={BlogDetails} />

                    <Route exact path={'/tutors'} render={(props) => (<Tutors {...props} />)} />

                    {isAuthenticated() ? (
                        <>
                            <Route exact path="/profile">
                                <Redirect to="/profile/accueil" />
                            </Route>

                            <Route path="/profile/:section" render={(props) => <Profile {...props} />} />
                        </>
                    ) : (
                        <Redirect to="/login" />
                    )}

                     <ProtectedRoute  exact path="/dash/admin" component={AdminDashboard} />
                 <ProtectedRoute exact path="/dashboard" component={Courses} />
                    <ProtectedRoute exact path={'/blog'} component={Blog} />
                    <Route component={Page404} />
                    <ProtectedRoute exact path={'/video'} component={Video} />
                    <Route render={() => <Redirect to="/login" />} />
                </Switch>
            </HashRouter>
        </Router>
    )
}

export default Routes;