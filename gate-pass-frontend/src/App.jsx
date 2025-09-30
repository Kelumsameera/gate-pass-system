import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Sidebar from "./components/layout/Sidebar";
// import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Sidebar />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

// ✅ Export your App component
export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import HRAdminDashboard from "./pages/HRAdminDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* <Route path="/" element={<HRAdminDashboard />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// // export default App;
// VisitorPass EmployeesExitPass EquipmentPass VehiclePass
