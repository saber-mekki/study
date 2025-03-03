const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null; 
};
export {isAuthenticated}