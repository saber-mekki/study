import React from "react";
import TutorsSection from "./layouts/TutorsSection";
import { useTranslation } from "react-i18next";
import SectionTwo from "./layouts/SectionTwo";

export default function Courses() {
  const { t } = useTranslation();

  return (
    <SectionTwo title={t("Tutors")}>
      <TutorsSection />
    </SectionTwo>
  );
}
