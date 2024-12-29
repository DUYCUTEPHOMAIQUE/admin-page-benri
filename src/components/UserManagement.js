import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  deleteUser,
  addUser,
  updateUser,
} from "../services/dataService";
import UserDialog from "../dialogs/UserDialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddNew = () => {
    setDialogMode("add");
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user) => {
    setDialogMode("edit");
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        await fetchUsers();
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (dialogMode === "add") {
        await addUser(formData);
      } else {
        await updateUser(selectedUser._id, formData);
      }
      setIsDialogOpen(false);
      await fetchUsers();
    } catch (err) {
      setError(
        dialogMode === "add" ? "Failed to add user" : "Failed to update user"
      );
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold">User Management</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Users List</h2>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add New User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.user_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={selectedUser}
        onSubmit={handleSubmit}
        mode={dialogMode}
      />
    </div>
  );
};

export default UserManagement;
