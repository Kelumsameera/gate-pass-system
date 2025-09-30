import React, { useState } from "react";
import { Camera, User, CreditCard, Shield } from "lucide-react";

function SignUP() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    role: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const roles = [
    { value: "", label: "Select Role" },
    { value: "employee", label: "Employee" },
    { value: "executive", label: "Executive" },
    { value: "manager", label: "Manager" },
    { value: "security", label: "Security Officer" },
    { value: "hr_admin", label: "HR Admin" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Please select a valid image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Image size should be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      setErrors((prev) => ({
        ...prev,
        profileImage: "",
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("profileImage");
    if (fileInput) fileInput.value = "";
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.employeeId.trim())
      newErrors.employeeId = "Employee ID is required";
    if (!formData.role) newErrors.role = "Role selection is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Employee ID validation (alphanumeric, 3-10 characters)
    const empIdRegex = /^[A-Za-z0-9]{3,10}$/;
    if (formData.employeeId && !empIdRegex.test(formData.employeeId)) {
      newErrors.employeeId =
        "Employee ID should be 3-10 alphanumeric characters";
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", {
        ...formData,
        profileImage: formData.profileImage ? formData.profileImage.name : null,
      });

      // Here you would typically send the data to your backend
      alert("Registration submitted successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
          Gate Pass System Registration
        </h1>

        <div className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Image
            </label>

            <div className="relative">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            <div>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <Camera className="w-4 h-4 mr-2" />
                Choose Image
              </label>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-sm">{errors.profileImage}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                <User className="w-4 h-4 mr-2" />
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="John"
                className={`px-4 py-3 rounded-xl border ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Doe"
                className={`px-4 py-3 rounded-xl border ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="john.doe@company.com"
              className={`px-4 py-3 rounded-xl border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee ID */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Employee ID *
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                required
                placeholder="EMP001"
                className={`px-4 py-3 rounded-xl border ${
                  errors.employeeId
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                3-10 alphanumeric characters
              </p>
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className={`px-4 py-3 rounded-xl border ${
                  errors.role
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="********"
                className={`px-4 py-3 rounded-xl border ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="********"
                className={`px-4 py-3 rounded-xl border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <User className="w-5 h-5 mr-2" />
            Create Account
          </button>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUP;
