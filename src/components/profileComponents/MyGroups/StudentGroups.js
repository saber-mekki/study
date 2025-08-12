import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ShowGroup from "./ShowGroup";

export default function StudentGroups() {
    const [groups, setGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const user = useSelector((state) => state.user);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/students/${user.idUser}/groups`)
            .then((res) => {
                setGroups(res.data);         
            })
            .catch((err) => {
                console.error(err);
            });
    }, [user.idUser]);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentGroups = groups.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(groups.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h3>My Groups</h3>
            {currentGroups.map(group => (
                <ShowGroup groupStudent={group} />
            ))}
            <div className="d-flex justify-content-center mt-3">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary me-2"
                >
                    Prev
                </button>
                <span style={{ lineHeight: "2.5rem" }}>
                    Page {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary ms-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
