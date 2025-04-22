import React from "react";
import TutorsSection from "./layouts/TutorsSection";
import SectionOne from "./layouts/SectionOne";
import { useTranslation } from "react-i18next";

export default function Courses() {
  const { t } = useTranslation();

  return (
    <SectionOne title={t("Tutors")}>
      <TutorsSection />
    </SectionOne>
  );
}
