import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 4, py: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
      <Typography variant="body2">{t("footerText")}</Typography>
    </Box>
  );
}
export default Footer;
