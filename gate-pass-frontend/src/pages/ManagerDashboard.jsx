import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  User,
  Calendar,
  MapPin,
  Package,
  Users,
  Search,
  Download,
  Bell,
  TrendingUp,
  Activity,
  FileText,
  Building,
  X,
  Refresh,
} from "lucide-react";

function ManagerDashboard() {
  const [passes, setPasses] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Executive-Approved");

  const currentManager = {
    name: "Jane Smith",
    employeeId: "MGR001",
    department: "Operations",
  };

  const t = (key) => {
    const translations = {
      managerDashboard: "Manager Dashboard",
      loading: "Loading...",
      errorFetchingPasses: "Error fetching passes",
      approve: "Approve",
      reject: "Reject",
      search: "Search passes...",
      viewDetails: "View Details",
      pendingApproval: "Pending Approval",
      approved: "Approved",
      rejected: "Rejected",
      total: "Total Requests",
    };
    return translations[key] || key;
  };

  // Mock data
  useEffect(() => {
    const mockPasses = [
      {
        _id: "1",
        type: "exit",
        status: "Executive-Approved",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        employeeName: "John Doe",
        employeeId: "EMP001",
        department: "IT",
        purpose: "Bank visit",
        destination: "Commercial Bank, Colombo",
        priority: "normal",
        executiveApprovedBy: "Tom Executive",
      },
      {
        _id: "2",
        type: "equipment",
        status: "Executive-Approved",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        employeeName: "Sarah Johnson",
        employeeId: "EMP002",
        department: "Finance",
        purpose: "Home office setup",
        equipmentDetails: "Dell Laptop, Wireless Mouse",
        priority: "high",
      },
    ];
    setTimeout(() => {
      setPasses(mockPasses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = passes;
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPasses(filtered);
  }, [passes, statusFilter, searchTerm]);

  const handleAction = async (passId, status) => {
    // eslint-disable-next-line no-undef
    setActionLoading(passId);
    await new Promise((r) => setTimeout(r, 1000));
    const updated = passes.map((p) => {
      if (p._id === passId) {
        return {
          ...p,
          status: status === "Approved" ? "Manager-Approved" : "Rejected",
          [status === "Approved" ? "managerApprovedBy" : "rejectedBy"]:
            currentManager.name,
        };
      }
      return p;
    });
    setPasses(updated);
    // eslint-disable-next-line no-undef
    setShowModal(false);
    // eslint-disable-next-line no-undef
    setActionLoading(null);
    alert(`Request ${status.toLowerCase()} successfully!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Executive-Approved":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Manager-Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "exit":
        return <MapPin className="w-5 h-5" />;
      case "equipment":
        return <Package className="w-5 h-5" />;
      case "visitor":
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("loading")}
      </div>
    );

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">{t("managerDashboard")}</h1>

      {/* Search & Filter */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="Executive-Approved">Executive Approved</option>
          <option value="Manager-Approved">Manager Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button
          onClick={() => window.location.reload()}
          className="border px-3 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      {/* Pass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPasses.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          filteredPasses.map((pass) => (
            <div key={pass._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(pass.type)}
                  <span>{pass.type} Pass</span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                    pass.status
                  )}`}
                >
                  {pass.status}
                </span>
              </div>
              <p>
                <strong>Employee:</strong> {pass.employeeName} (
                {pass.employeeId})
              </p>
              <p>
                <strong>Purpose:</strong> {pass.purpose}
              </p>
              <div className="flex space-x-2 mt-2">
                {pass.status === "Executive-Approved" && (
                  <>
                    <button
                      onClick={() => handleAction(pass._id, "Approved")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      // eslint-disable-next-line no-undef
                      disabled={actionLoading === pass._id}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(pass._id, "Rejected")}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      // eslint-disable-next-line no-undef
                      disabled={actionLoading === pass._id}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
