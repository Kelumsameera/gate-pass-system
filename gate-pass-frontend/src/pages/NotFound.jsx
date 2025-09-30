import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        {t("pageNotFound")}
      </Typography>
      <Button component={Link} to="/" variant="contained">
        {t("goToHome")}
      </Button>
    </Box>
  );
}
export default NotFound;
