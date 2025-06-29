import React from "react";
import CourseSection from "./layouts/CourseSection";
import SectionTwo from "./layouts/SectionTwo";
import { useTranslation } from "react-i18next";

export default function Courses() {

   const { t } = useTranslation();
 

  return (
    <SectionTwo title={t('courses')}>
      <CourseSection  />
    </SectionTwo>
  );
}
