import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

function SubmitButton({ disabled, label = "submit" }) {
  const { t } = useTranslation();
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      sx={{ mt: 2 }}
      aria-label={t(label)}
    >
      {t(label)}
    </Button>
  );
}
export default SubmitButton;
