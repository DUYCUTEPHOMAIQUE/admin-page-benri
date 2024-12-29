import React, { useState, useEffect } from "react";

const UserDialog = ({ isOpen, onClose, user, onSubmit, mode }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_role_system: "member",
    user_status: "active",
  });

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData(user);
    } else if (mode === "add") {
      setFormData({
        user_name: "",
        user_email: "",
        user_password: "",
        user_role_system: "member",
        user_status: "active",
      });
    }
  }, [user, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "add" ? "Add New User" : "Edit User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={formData.user_name}
                onChange={(e) =>
                  setFormData({ ...formData, user_name: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.user_email}
                onChange={(e) =>
                  setFormData({ ...formData, user_email: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>
            {mode === "add" && (
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={formData.user_password}
                  onChange={(e) =>
                    setFormData({ ...formData, user_password: e.target.value })
                  }
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                value={formData.user_role_system}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user_role_system: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                value={formData.user_status}
                onChange={(e) =>
                  setFormData({ ...formData, user_status: e.target.value })
                }
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              >
                <option value="active">active</option>
                <option value="inactive">block</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {mode === "add" ? "Add User" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDialog;
