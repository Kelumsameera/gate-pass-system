import { useEffect, useState } from "react";
import { getProfile } from "../api/user";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getProfile(token)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>
      <p>Email: {user.email}</p>
      <p>Employee ID: {user.employeeId}</p>
    </div>
  );
}
