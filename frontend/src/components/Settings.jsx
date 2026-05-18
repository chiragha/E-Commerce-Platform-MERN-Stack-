import React from "react";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="bg-white rounded-[30px] shadow-lg p-8 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account preferences and profile.
          </p>
        </div>

        {/* Profile Card */}
        <div className="mt-8 bg-white rounded-[30px] p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
              {user?.firstName?.charAt(0) || "U"}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            
            <div className="bg-blue-50 rounded-2xl p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-800">
                Profile Settings
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Update your personal information.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-800">
                Security
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Change password and secure account.
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-800">
                Notifications
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Manage alerts and emails.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-800">
                Payment Methods
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Manage payment information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;