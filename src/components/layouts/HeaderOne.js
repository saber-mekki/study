import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

class HeaderOne extends Component {
  render() {
    const { t, i18n } = this.props;

    return (
      <header className="bg-white shadow">
        <div className="container-lg">
          <nav className="navbar navbar-expand-xl navbar-dark px-0">
            <Link to={'/home-one'} className="navbar-brand initiate-scripts">
              <img
                src={process.env.PUBLIC_URL + '/assets/images/logo-2.png'}
                alt=""
                style={{ height: "49px" }}
              />
            </Link>

            <button
              className="navbar-toggler ml-3"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAlt"
              aria-controls="navbarNavAlt"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fas fa-bars" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAlt">    
              <ul className="navbar-nav mt-4 mt-xl-0 ml-auto"> {/* without become tutor*/}
                <li className="nav-item dropdown active">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={'/'}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t('Home')} <i className="fas fa-angle-down" />
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'/home-one'} className="dropdown-item active initiate-scripts">
                        {t('HomeTutor')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/home-two'} className="dropdown-item initiate-scripts">
                        {t('Online Course')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/home-three'} className="dropdown-item initiate-scripts">
                        {t('Online University')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={'/'}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t('About')} <i className="fas fa-angle-down" />
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'/about-one'} className="dropdown-item initiate-scripts">
                        {t('About Us 01')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/about-two'} className="dropdown-item initiate-scripts">
                        {t('About Us 02')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/about-three'} className="dropdown-item initiate-scripts">
                        {t('About Us 03')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to={'/courses'} className="nav-link initiate-scripts">
                    {t('Courses')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/blog'} className="nav-link initiate-scripts">
                    {t('Blog')}
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={'/'}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t('Pages')} <i className="fas fa-angle-down" />
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={'/job-board'} className="dropdown-item initiate-scripts">
                        {t('Job Board')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/course-details-one'} className="dropdown-item initiate-scripts">
                        {t('Course Details 01')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/course-details-two'} className="dropdown-item initiate-scripts">
                        {t('Course Details 02')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/blog-details'} className="dropdown-item initiate-scripts">
                        {t('Blog Details')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to={'/contact'} className="nav-link initiate-scripts">
                    {t('Contact Us')}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#!"
                    data-toggle="modal"
                    data-target="#signin-modal"
                  >
                    {t('Signin')}
                  </a>
                </li>
              
                <li className="nav-item dropdown ">  {/* Langue */}
                  <Link
                    className="nav-link dropdown-toggle"
                    to={'/'}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t('Language')} <i className="fas fa-angle-down" />
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item initiate-scripts" onClick={()=>{
                            i18n.changeLanguage('ar') ;
                        }} > 

                        {t('ar')}
                        </button>
                    </li>
                    <li>
                    <button  className="dropdown-item initiate-scripts" onClick={()=>{
                            i18n.changeLanguage('fr') ;
                        }} > 

                        {t('fr')}
                        </button>
                       
                        <button className="dropdown-item initiate-scripts" onClick={()=>{
                            i18n.changeLanguage('en') ;
                        }} > 

                        {t('eng')}
                        </button>

                    </li>
                    
                  </ul>
                </li>
              </ul>

              <div className="ml-0 ml-xl-4 mt-3 mt-xl-0 mb-3 mb-xl-0 text-center text-xl-right">
                <a
                  href="#!"
                  className="btn btn-sm btn-blue rounded-pill"
                  data-toggle="modal"
                  data-target="#signup-modal"
                >
                  {t('Become A Tutor')}
                </a>
              </div>
            </div>
            
            
       
          </nav>
        </div>
      </header>
    );
  }
}

export default withTranslation()(HeaderOne);
