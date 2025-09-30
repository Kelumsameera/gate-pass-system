import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { getPassById } from "../services/api";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function QRDisplay() {
  const { t } = useTranslation();
  const { passId } = useParams();
  const [passData, setPassData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPass() {
      try {
        const response = await getPassById(passId);
        setPassData(response.data);
      } catch {
        setError(t("errorFetchingPass")); // removed unused 'err'
      }
    }
    fetchPass();
  }, [passId, t]); // added 't' to dependencies

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {t("qrCode")}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {passData && (
        <>
          <Typography>
            {t("passId")}: {passData._id}
          </Typography>
          <Typography>
            {t("passType")}: {passData.type}
          </Typography>
          <Typography>
            {t("status")}: {passData.status}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <QRCodeCanvas value={passData._id} size={256} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default QRDisplay;
