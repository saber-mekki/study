import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PageHeaderTwo = ({ title }) => {
  const { t } = useTranslation();

  return (
    <section className="py-80 bg-gray">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="section-title font-weight-bold mb-20">{title}</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent p-0 font-weight-600 mb-0">
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/" className="text-primary initiate-scripts">
                    {t("Home")}
                  </Link>
                </li>
                <li className="breadcrumb-item">{title}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeaderTwo;
