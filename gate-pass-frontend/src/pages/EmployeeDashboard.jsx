import React, { useState, useEffect } from "react";
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  QrCode,
  MapPin,
  Package,
  Users,
  Calendar,
  Filter,
  Search,
  Download,
  Bell,
  User,
  TrendingUp,
  Activity,
} from "lucide-react";

function EmployeeDashboard() {
  const [passes, setPasses] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPass, setSelectedPass] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  // Mock user data
  const currentUser = {
    name: "John Doe",
    employeeId: "EMP001",
    department: "IT Department",
    profileImage: null,
  };

  // Mock pass data
  useEffect(() => {
    const mockPasses = [
      {
        id: 1,
        type: "exit",
        purpose: "Bank visit for loan documentation",
        destination: "Commercial Bank, Colombo",
        status: "manager_approved",
        priority: "normal",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        expectedReturn: new Date(Date.now() + 7200000).toISOString(),
        approvedBy: "Jane Smith (Manager)",
        qrCode: "QR123456789",
      },
      {
        id: 2,
        type: "equipment",
        purpose: "Home office setup for remote work",
        equipmentDetails: "Dell Laptop (Asset #LP001), Wireless Mouse, Charger",
        status: "pending",
        priority: "high",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        endDate: new Date(Date.now() + 432000000).toISOString(),
      },
      {
        id: 3,
        type: "visitor",
        purpose: "Client meeting for project discussion",
        visitorName: "Michael Johnson",
        visitorCompany: "ABC Corp",
        status: "executive_approved",
        priority: "urgent",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        startDate: new Date(Date.now() + 86400000).toISOString(),
        approvedBy: "Tom Executive",
      },
      {
        id: 4,
        type: "exit",
        purpose: "Medical appointment",
        destination: "Asiri Hospital, Colombo",
        status: "rejected",
        priority: "low",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        rejectedBy: "Jane Smith (Manager)",
        rejectionReason: "Insufficient advance notice",
      },
      {
        id: 5,
        type: "equipment",
        purpose: "Conference presentation setup",
        equipmentDetails: "Projector, Presentation Clicker",
        status: "verified",
        priority: "normal",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        verifiedAt: new Date(Date.now() - 86400000).toISOString(),
        verifiedBy: "Security Officer Mike",
      },
    ];

    setTimeout(() => {
      setPasses(mockPasses);
      setFilteredPasses(mockPasses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = passes;

    if (statusFilter !== "all") {
      filtered = filtered.filter((pass) => pass.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (pass) =>
          pass.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pass.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (pass.destination &&
            pass.destination.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPasses(filtered);
  }, [passes, statusFilter, searchTerm]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "yellow",
        icon: Clock,
        label: "Pending Review",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        textColor: "text-yellow-700 dark:text-yellow-300",
        borderColor: "border-yellow-200 dark:border-yellow-800",
      },
      executive_approved: {
        color: "blue",
        icon: CheckCircle,
        label: "Executive Approved",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        textColor: "text-blue-700 dark:text-blue-300",
        borderColor: "border-blue-200 dark:border-blue-800",
      },
      manager_approved: {
        color: "green",
        icon: CheckCircle,
        label: "Manager Approved",
        bgColor: "bg-green-100 dark:bg-green-900/20",
        textColor: "text-green-700 dark:text-green-300",
        borderColor: "border-green-200 dark:border-green-800",
      },
      rejected: {
        color: "red",
        icon: XCircle,
        label: "Rejected",
        bgColor: "bg-red-100 dark:bg-red-900/20",
        textColor: "text-red-700 dark:text-red-300",
        borderColor: "border-red-200 dark:border-red-800",
      },
      verified: {
        color: "purple",
        icon: CheckCircle,
        label: "Verified",
        bgColor: "bg-purple-100 dark:bg-purple-900/20",
        textColor: "text-purple-700 dark:text-purple-300",
        borderColor: "border-purple-200 dark:border-purple-800",
      },
    };
    return configs[status] || configs.pending;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "text-gray-500",
      normal: "text-blue-500",
      high: "text-orange-500",
      urgent: "text-red-500",
    };
    return colors[priority] || colors.normal;
  };

  const getPassTypeIcon = (type) => {
    const icons = {
      exit: MapPin,
      equipment: Package,
      visitor: Users,
    };
    return icons[type] || MapPin;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-LK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStats = () => {
    const total = passes.length;
    const pending = passes.filter((p) => p.status === "pending").length;
    const approved = passes.filter(
      (p) => p.status === "manager_approved"
    ).length;
    const rejected = passes.filter((p) => p.status === "rejected").length;

    return { total, pending, approved, rejected };
  };

  const stats = getStats();

  const showQRCode = (pass) => {
    setSelectedPass(pass);
    setShowQRModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {currentUser.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser.employeeId} • {currentUser.department}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                New Request
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Approved
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Rejected
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Gate Pass Requests
            </h2>

            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="executive_approved">Executive Approved</option>
                <option value="manager_approved">Manager Approved</option>
                <option value="rejected">Rejected</option>
                <option value="verified">Verified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pass Requests List */}
        <div className="space-y-4">
          {filteredPasses.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No requests found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't submitted any gate pass requests yet"}
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center mx-auto">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Request
              </button>
            </div>
          ) : (
            filteredPasses.map((pass) => {
              const statusConfig = getStatusConfig(pass.status);
              const TypeIcon = getPassTypeIcon(pass.type);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={pass.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                            {pass.type} Pass
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Request #{pass.id} • {formatDate(pass.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                        >
                          <StatusIcon className="w-4 h-4 inline mr-1" />
                          {statusConfig.label}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                            pass.priority
                          )}`}
                        >
                          {pass.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Purpose
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {pass.purpose}
                        </p>
                      </div>

                      {pass.destination && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Destination
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {pass.destination}
                          </p>
                        </div>
                      )}

                      {pass.equipmentDetails && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Equipment
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {pass.equipmentDetails}
                          </p>
                        </div>
                      )}

                      {pass.visitorName && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Visitor
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {pass.visitorName}
                            {pass.visitorCompany && ` (${pass.visitorCompany})`}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status-specific information */}
                    {pass.status === "rejected" && pass.rejectionReason && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-700 dark:text-red-300">
                          <strong>Rejection Reason:</strong>{" "}
                          {pass.rejectionReason}
                        </p>
                        {pass.rejectedBy && (
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            Rejected by: {pass.rejectedBy}
                          </p>
                        )}
                      </div>
                    )}

                    {pass.approvedBy && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <strong>Approved by:</strong> {pass.approvedBy}
                        </p>
                      </div>
                    )}

                    {pass.verifiedBy && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 mb-4">
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          <strong>Verified by:</strong> {pass.verifiedBy} on{" "}
                          {formatDate(pass.verifiedAt)}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>

                      {pass.status === "manager_approved" && (
                        <button
                          onClick={() => showQRCode(pass)}
                          className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          View QR Code
                        </button>
                      )}

                      <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* QR Code Modal */}
        {showQRModal && selectedPass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    QR Code - Pass #{selectedPass.id}
                  </h3>
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Show this QR code to security for verification
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Pass Type:</strong> {selectedPass.type}
                      <br />
                      <strong>Status:</strong>{" "}
                      {getStatusConfig(selectedPass.status).label}
                      <br />
                      <strong>Valid Until:</strong>{" "}
                      {formatDate(
                        selectedPass.expectedReturn || selectedPass.endDate
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
