import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function PassFormWrapper({ title, onSubmit, children }) {
  const { t } = useTranslation();
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {t(title)}
      </Typography>
      {children}
    </Box>
  );
}
export default PassFormWrapper;
