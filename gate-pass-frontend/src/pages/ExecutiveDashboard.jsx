import { useState, useEffect, useContext } from "react";
import { useFetchPass } from "../hooks/useFetchPass";
import { SocketContext } from "../context/SocketContext";
import { approvePassExecutive } from "../services/api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

function ExecutiveDashboard() {
  const { t } = useTranslation();
  const { passes, loading, error, refetch } = useFetchPass("Pending");
  const { socket } = useContext(SocketContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (passes) {
      setRows(
        passes.map((pass) => ({
          id: pass._id,
          type: pass.type,
          status: pass.status,
          timestamp: new Date(pass.timestamp).toLocaleString("en-US", {
            timeZone: "Asia/Colombo",
          }),
        }))
      );
    }
  }, [passes]);

  useEffect(() => {
    socket.on("newPass", () => {
      refetch();
    });
    return () => {
      socket.off("newPass");
    };
  }, [socket, refetch]);

  const handleAction = async (passId, status) => {
    try {
      await approvePassExecutive(passId, status);
      socket.emit("passUpdated", passId);
      refetch();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert(t("actionError"));
    }
  };

  const columns = [
    { field: "id", headerName: t("passId"), width: 150 },
    { field: "type", headerName: t("passType"), width: 150 },
    { field: "status", headerName: t("status"), width: 150 },
    { field: "timestamp", headerName: t("timestamp"), width: 200 },
    {
      field: "actions",
      headerName: t("actions"),
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleAction(params.row.id, "Approved")}
            variant="contained"
            color="success"
            size="small"
            sx={{ mr: 1 }}
          >
            {t("approve")}
          </Button>
          <Button
            onClick={() => handleAction(params.row.id, "Rejected")}
            variant="contained"
            color="error"
            size="small"
          >
            {t("reject")}
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("executiveDashboard")}
      </Typography>
      {loading && <Typography>{t("loading")}</Typography>}
      {error && (
        <Typography color="error">{t("errorFetchingPasses")}</Typography>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        autoHeight
      />
    </Box>
  );
}
export default ExecutiveDashboard;
