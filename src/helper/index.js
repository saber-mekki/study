
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

const isStudent = () => {
  return localStorage.getItem("role") === "student";
};

const isTutor = () => {
  return localStorage.getItem("role") === "tutor";
};

export {
  isAuthenticated,
  isAdmin,
  isStudent,
  isTutor
};
