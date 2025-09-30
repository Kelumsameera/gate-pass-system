import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Gate Pass System
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please login to continue
      </Typography>
      <Button component={Link} to="/login" variant="contained" color="primary">
        Go to Login
      </Button>
    </Box>
  );
}
