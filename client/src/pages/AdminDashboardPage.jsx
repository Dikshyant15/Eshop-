import React, { useState } from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[220px] mt-5">
            <AdminSidebar active={active} setActive={setActive} />
          </div>
          <AdminDashboardMain active={active} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;