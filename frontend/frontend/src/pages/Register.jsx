import { useState } from "react";
import { registerUser } from "../api/user";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    employeeId: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
      />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}
