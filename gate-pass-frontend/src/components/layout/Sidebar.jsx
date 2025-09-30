import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust if default export
import { useTranslation } from "react-i18next";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./Sidebar.module.css";

// Map user roles to routes and labels
const ROLE_ROUTES = {
  employee: [
    { path: "/", label: "dashboard" },
    { path: "/request-pass", label: "requestPass" },
  ],
  visitor: [
    { path: "/", label: "dashboard" },
    { path: "/request-pass", label: "requestPass" },
  ],
  executive: [{ path: "/executive", label: "executiveDashboard" }],
  manager: [{ path: "/manager", label: "managerDashboard" }],
  security: [{ path: "/security", label: "securityDashboard" }],
  hr_admin: [{ path: "/admin", label: "hrAdminDashboard" }],
};

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const { i18n, t } = useTranslation();

  if (!user) return null; // Hide sidebar if no user

  const userRoutes = ROLE_ROUTES[user.role.toLowerCase()] || [];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
      }}
    >
      {/* Header */}
      <Typography variant="h6" sx={{ p: 2 }}>
        {t("gatePassSystem")}
      </Typography>

      {/* Language Selector */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select language" }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="si">Sinhala</MenuItem>
          <MenuItem value="ta">Tamil</MenuItem>
        </Select>
      </FormControl>

      <Divider />

      {/* Navigation */}
      <List>
        {userRoutes.map((route) => (
          <ListItem
            key={route.path}
            component={NavLink}
            to={route.path}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <ListItemText primary={t(route.label)} />
          </ListItem>
        ))}

        <Divider />

        {/* Logout */}
        <ListItem button onClick={logout}>
          <ListItemText primary={t("logout")} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
