import { useState } from "react";

import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import ExitPassForm from "../components/forms/ExitPassForm";
import EquipmentPassForm from "../components/forms/EquipmentPassForm";
import VisitorPassForm from "../components/forms/VisitorPassForm";
import VehiclePassForm from "../components/forms/VehiclePassForm";
import EmergencyPassForm from "../components/forms/EmergencyPassForm";
import { useTranslation } from "react-i18next";

function RequestPass() {
  const { t } = useTranslation();

  const [passType, setPassType] = useState("Exit");

  const renderForm = () => {
    switch (passType) {
      case "Exit":
        return <ExitPassForm />;
      case "Equipment":
        return <EquipmentPassForm />;
      case "Visitor":
        return <VisitorPassForm />;
      case "Vehicle":
        return <VehiclePassForm />;
      case "Emergency":
        return <EmergencyPassForm />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>{t("passType")}</InputLabel>
        <Select
          value={passType}
          onChange={(e) => setPassType(e.target.value)}
          label={t("passType")}
        >
          <MenuItem value="Exit">{t("exit")}</MenuItem>
          <MenuItem value="Equipment">{t("equipment")}</MenuItem>
          <MenuItem value="Visitor">{t("visitor")}</MenuItem>
          <MenuItem value="Vehicle">{t("vehicle")}</MenuItem>
          <MenuItem value="Emergency">{t("emergency")}</MenuItem>
        </Select>
      </FormControl>
      {renderForm()}
    </Box>
  );
}
export default RequestPass;
