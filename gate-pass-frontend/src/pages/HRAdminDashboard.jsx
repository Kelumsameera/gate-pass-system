import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Shield,
  BarChart3,
  FileText,
  Settings,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Calendar,
  MapPin,
  Package,
  Building,
  Mail,
  Phone,
  MoreVertical,
  Plus,
  RefreshCw,
} from "lucide-react";

function HRAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [passes, setPasses] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data initialization
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        employeeId: "EMP001",
        email: "john.doe@company.com",
        role: "employee",
        department: "IT Department",
        status: "active",
        joinDate: "2023-01-15",
        lastLogin: "2024-01-15T10:30:00Z",
        totalRequests: 12,
        profileImage: null,
      },
      {
        id: 2,
        name: "Jane Smith",
        employeeId: "MGR001",
        email: "jane.smith@company.com",
        role: "manager",
        department: "Operations",
        status: "active",
        joinDate: "2022-08-20",
        lastLogin: "2024-01-14T15:45:00Z",
        totalRequests: 8,
        profileImage: null,
      },
      {
        id: 3,
        name: "Mike Security",
        employeeId: "SEC001",
        email: "mike.security@company.com",
        role: "security",
        department: "Security",
        status: "active",
        joinDate: "2023-03-10",
        lastLogin: "2024-01-15T08:00:00Z",
        totalRequests: 3,
        profileImage: null,
      },
      {
        id: 4,
        name: "Tom Executive",
        employeeId: "EXEC001",
        email: "tom.executive@company.com",
        role: "executive",
        department: "Management",
        status: "active",
        joinDate: "2022-05-12",
        lastLogin: "2024-01-13T12:20:00Z",
        totalRequests: 15,
        profileImage: null,
      },
      {
        id: 5,
        name: "Sarah Johnson",
        employeeId: "EMP002",
        email: "sarah.johnson@company.com",
        role: "employee",
        department: "Finance",
        status: "inactive",
        joinDate: "2023-06-01",
        lastLogin: "2024-01-10T09:15:00Z",
        totalRequests: 5,
        profileImage: null,
      },
    ];

    const mockPasses = [
      {
        id: 1,
        userId: 1,
        type: "exit",
        status: "manager_approved",
        createdAt: "2024-01-15T09:00:00Z",
        priority: "normal",
      },
      {
        id: 2,
        userId: 1,
        type: "equipment",
        status: "pending",
        createdAt: "2024-01-14T14:30:00Z",
        priority: "high",
      },
      {
        id: 3,
        userId: 2,
        type: "visitor",
        status: "executive_approved",
        createdAt: "2024-01-13T11:20:00Z",
        priority: "urgent",
      },
      {
        id: 4,
        userId: 4,
        type: "exit",
        status: "rejected",
        createdAt: "2024-01-12T16:45:00Z",
        priority: "low",
      },
      {
        id: 5,
        userId: 1,
        type: "equipment",
        status: "verified",
        createdAt: "2024-01-11T08:30:00Z",
        priority: "normal",
      },
    ];

    const mockAnalytics = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter((u) => u.status === "active").length,
      totalRequests: mockPasses.length,
      pendingRequests: mockPasses.filter((p) => p.status === "pending").length,
      approvedRequests: mockPasses.filter(
        (p) => p.status === "manager_approved"
      ).length,
      rejectedRequests: mockPasses.filter((p) => p.status === "rejected")
        .length,
      monthlyGrowth: 12.5,
      departmentStats: [
        { name: "IT Department", users: 1, requests: 3 },
        { name: "Operations", users: 1, requests: 1 },
        { name: "Security", users: 1, requests: 0 },
        { name: "Management", users: 1, requests: 1 },
        { name: "Finance", users: 1, requests: 0 },
      ],
    };

    setTimeout(() => {
      setUsers(mockUsers);
      setPasses(mockPasses);
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "passes", label: "Pass Analytics", icon: FileText },
    { id: "reports", label: "Reports", icon: Download },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-LK", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleColor = (role) => {
    const colors = {
      employee:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
      manager:
        "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
      executive:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
      security:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
      hr_admin: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    };
    return colors[role] || colors.employee;
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
      : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading HR Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                HR Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage users, monitor activities, and generate reports
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics.totalUsers}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />+
                      {analytics.monthlyGrowth}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {analytics.activeUsers}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(
                        (analytics.activeUsers / analytics.totalUsers) * 100
                      )}
                      % of total
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Requests
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {analytics.totalRequests}
                    </p>
                    <p className="text-xs text-purple-600 flex items-center mt-1">
                      <FileText className="w-3 h-3 mr-1" />
                      This week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Pending Approvals
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {analytics.pendingRequests}
                    </p>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      Need attention
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Department Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Department Overview
                </h3>
                <div className="space-y-4">
                  {analytics.departmentStats?.map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {dept.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {dept.users} users
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {dept.requests}
                        </p>
                        <p className="text-xs text-gray-500">requests</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Pass approved
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        John Doe's exit pass approved by Jane Smith
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>

                  <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        New request pending
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Equipment pass awaiting approval
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">4h ago</span>
                  </div>

                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <UserPlus className="w-5 h-5 text-blue-500 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        New user added
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Sarah Johnson joined Finance department
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  User Management ({filteredUsers.length} users)
                </h2>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search users..."
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Role & Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Requests
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {user.profileImage ? (
                                <img
                                  src={user.profileImage}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.employeeId} • {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {user.role.replace("_", " ").toUpperCase()}
                            </span>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {user.department}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(user.lastLogin)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.totalRequests}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pass Analytics Tab */}
        {activeTab === "passes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Pass Status Distribution
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Approved
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {analytics.approvedRequests} (
                      {Math.round(
                        (analytics.approvedRequests / analytics.totalRequests) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Pending
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {analytics.pendingRequests} (
                      {Math.round(
                        (analytics.pendingRequests / analytics.totalRequests) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Rejected
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {analytics.rejectedRequests} (
                      {Math.round(
                        (analytics.rejectedRequests / analytics.totalRequests) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Pass Type Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Exit Pass
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {passes.filter((p) => p.type === "exit").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Equipment Pass
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {passes.filter((p) => p.type === "equipment").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-purple-500 mr-3" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Visitor Pass
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {passes.filter((p) => p.type === "visitor").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Generate Reports
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <FileText className="w-8 h-8 text-blue-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    User Activity Report
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Comprehensive report of user activities and pass requests
                  </p>
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Generate Report
                  </button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <BarChart3 className="w-8 h-8 text-green-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Analytics Report
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Statistical analysis of pass requests and approvals
                  </p>
                  <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Generate Report
                  </button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <Shield className="w-8 h-8 text-purple-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Security Report
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Security incidents and verification logs
                  </p>
                  <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Auto-approve exit passes
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically approve exit passes under 2 hours
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Email notifications
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Send email notifications for pass approvals
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      SMS notifications
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Send SMS notifications for urgent requests
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HRAdminDashboard;
