import React from "react";

function AdminSidebar({
  onLogout,
  onUsersClick,
  onTicketsClick
}) {

  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">

        <div className="admin-logo-icon">
          IT
        </div>

        <div>
          <h2>IT Helpdesk</h2>
          <span>Admin Portal</span>
        </div>

      </div>


      <nav className="admin-menu">

        <button className="admin-menu-item active">

          <span>⌂</span>
          Dashboard

        </button>


        <button
          className="admin-menu-item"
          onClick={onTicketsClick}
        >

          <span>▣</span>
          Tickets

        </button>


        <button
          className="admin-menu-item"
          onClick={onUsersClick}
        >

          <span>◉</span>
          Users

        </button>

      </nav>


      <div className="admin-sidebar-bottom">

        <button
          className="admin-menu-item logout-item"
          onClick={onLogout}
        >

          <span>↪</span>
          Logout

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;