import { Component } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    const { t } = this.props.t; // Access translation function
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h4">{t("errorOccurred")}</Typography>
          <Typography>{t("errorMessage")}</Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            {t("refresh")}
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

// Wrap ErrorBoundary to use hooks
function ErrorBoundaryWithTranslation(props) {
  const { t } = useTranslation();
  return <ErrorBoundary {...props} t={t} />;
}

export default ErrorBoundaryWithTranslation;
