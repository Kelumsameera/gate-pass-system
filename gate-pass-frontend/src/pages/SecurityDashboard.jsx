// src/pages/SecurityDashboard.jsx
import React, { useState } from "react";
import QrScanner from "@yudiel/react-qr-scanner";
import { verifyPass, getPassById } from "../services/api";
import { Box, Typography, Button } from "@mui/material";

function SecurityDashboard() {
  const [scanResult, setScanResult] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      try {
        const pass = await getPassById(data);
        const verified = await verifyPass(pass.id);
        console.log("Verified:", verified);
      } catch (err) {
        console.error("Pass verification failed", err);
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Security Dashboard
      </Typography>
      <QrScanner
        onDecode={handleScan}
        onError={handleError}
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%" }}
      />
      {scanResult && (
        <Typography variant="body1" mt={2}>
          Scanned Data: {scanResult}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => setScanResult("")}
      >
        Clear
      </Button>
    </Box>
  );
}

export default SecurityDashboard;
