import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [data, setData] = useState  ("");
    useEffect(()=>{
        setData("no data")
    },[])
    
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>{data}</p>
        </div>
    );
};

export default AdminDashboard;
