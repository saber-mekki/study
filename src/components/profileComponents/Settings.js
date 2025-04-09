import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleConfirmLanguageChange = () => {
        i18n.changeLanguage(selectedLanguage); 
        localStorage.setItem("language", selectedLanguage); 
    };

    return (
        <div>
            <h6 className="mb-2 text-primary">{t("Settings")}</h6>
            <div className="row gutters">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                        <label htmlFor="language">{t("Language")}</label>
                        <select
                            className="form-control"
                            id="language"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            <option value="en">{t("English")}</option>
                            <option value="fr">{t("French")}</option>
                            <option value="gr">{t("German")}</option>
                            <option value="ar">{t("Arabic")}</option>
                        </select>
                    </div>
                  
                    <button onClick={handleConfirmLanguageChange} 
                    type="button"
                    className="btn btn-danger mt-2"
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    {t("confirm")}
                  </button>
                </div>
            </div>
        </div>
    );
}
