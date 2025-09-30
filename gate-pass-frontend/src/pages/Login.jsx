import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Shield, LogIn } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    identifier: "", // Can be email or employee ID
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("email"); // "email" or "employeeId"
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Identifier validation
    if (!formData.identifier.trim()) {
      newErrors.identifier =
        loginType === "email" ? "Email is required" : "Employee ID is required";
    } else if (loginType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.identifier)) {
        newErrors.identifier = "Please enter a valid email address";
      }
    } else {
      // Employee ID validation
      const empIdRegex = /^[A-Za-z0-9]{3,10}$/;
      if (!empIdRegex.test(formData.identifier)) {
        newErrors.identifier =
          "Employee ID should be 3-10 alphanumeric characters";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login attempt:", {
        loginType,
        identifier: formData.identifier,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      // Mock authentication - in real app, this would be an API call
      const mockUsers = {
        "admin@company.com": { role: "hr_admin", name: "Admin User" },
        "manager@company.com": { role: "manager", name: "Manager User" },
        emp001: { role: "employee", name: "John Doe" },
        sec001: { role: "security", name: "Security Officer" },
        exec001: { role: "executive", name: "Executive User" },
      };

      if (
        mockUsers[formData.identifier] &&
        formData.password === "password123"
      ) {
        alert(
          `Login successful! Welcome ${mockUsers[formData.identifier].name} (${
            mockUsers[formData.identifier].role
          })`
        );
        // Here you would typically redirect to dashboard
      } else {
        setErrors({
          general:
            "Invalid credentials. Try: admin@company.com / password123 or emp001 / password123",
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchLoginType = () => {
    setLoginType(loginType === "email" ? "employeeId" : "email");
    setFormData((prev) => ({ ...prev, identifier: "" }));
    setErrors({});
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Gate Pass System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to access your account
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => loginType !== "email" && switchLoginType()}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              loginType === "email"
                ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => loginType !== "employeeId" && switchLoginType()}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              loginType === "employeeId"
                ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Employee ID
          </button>
        </div>

        {/* Demo Credentials Alert */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
          <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
            Demo Credentials:
          </p>
          <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <div>Email: admin@company.com / password123</div>
            <div>Employee ID: emp001 / password123</div>
          </div>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">
              {errors.general}
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Identifier Input */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 dark:text-gray-300 flex items-center font-medium">
              {loginType === "email" ? (
                <Mail className="w-4 h-4 mr-2" />
              ) : (
                <User className="w-4 h-4 mr-2" />
              )}
              {loginType === "email" ? "Email Address" : "Employee ID"}
            </label>
            <input
              type={loginType === "email" ? "email" : "text"}
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              required
              placeholder={
                loginType === "email" ? "your@company.com" : "EMP001"
              }
              className={`px-4 py-3 rounded-xl border ${
                errors.identifier
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 dark:text-gray-300 flex items-center font-medium">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </>
            )}
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Secure access to Gate Pass Management System
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
