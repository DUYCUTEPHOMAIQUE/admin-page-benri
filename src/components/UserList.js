import React, { useEffect, useState } from "react";
import { getUsers } from "../services/dataService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-2">User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-b py-2">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
