function UserSidebar({
  onLogout,
  onNewTicket,
  onTicketsClick
}) {

  return (

    <aside className="user-sidebar">

      {/* Logo */}

      <div className="user-logo">

        <div className="user-logo-icon">
          🛠
        </div>

        <div>
          <h2>IT Helpdesk</h2>
          <span>User Panel</span>
        </div>

      </div>


      {/* Navigation */}

      <nav className="user-nav">

        <a
          href="#"
          className="active"
        >
          <span>⌂</span>
          Dashboard
        </a>


        <a
          href="#tickets"
          onClick={(e) => {

            e.preventDefault();

            onTicketsClick();

          }}
        >
          <span>🎫</span>
          My Tickets
        </a>


        <button
          className="new-ticket-side-btn"
          onClick={onNewTicket}
        >
          <span>＋</span>
          New Ticket
        </button>

      </nav>


      {/* Logout */}

      <div className="user-sidebar-bottom">

        <button
          className="user-logout"
          onClick={onLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>

  );
}

export default UserSidebar;