import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Pagination, Stack, Typography } from "@mui/material";

import ShowGroup from "./ShowGroup";

export default function StudentGroups() {
  const { t } = useTranslation();
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/students/${user.idUser}/groups`
      )
      .then((res) => setGroups(res.data))
      .catch((err) => console.error(err));
  }, [user.idUser]);

  const totalPages = Math.ceil(groups.length / itemsPerPage);
  const currentGroups = groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <Typography variant="h5" gutterBottom>
        {t("My Groups")}
      </Typography>

      {currentGroups.map((group, idx) => (
        <ShowGroup key={idx} groupStudent={group} />
      ))}

      {totalPages > 1 && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
            size="large"
            shape="rounded"
          />
        </Stack>
      )}
    </div>
  );
}
