import React from "react";

import { useSelector } from "react-redux";
import StudentGroups from "./StudentGroups";
import TutorGroups from "./TutorGroups";

export default function MyGroups() {
  

    const user = useSelector((state) => state.user);

    return user.role ==="student" ?<StudentGroups />:<TutorGroups />
}
