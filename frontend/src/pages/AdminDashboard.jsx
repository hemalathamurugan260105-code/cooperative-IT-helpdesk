import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import StatCard from "../components/admin/StatCard";
import TicketTable from "../components/admin/TicketTable";
import TicketDetails from "../components/admin/TicketDetails";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");


  // =========================
  // AUTH + LOAD TICKETS
  // =========================

  useEffect(() => {

    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/user-dashboard");
      return;
    }

    getAllTickets();

  }, []);


  // =========================
  // GET ALL TICKETS
  // =========================

  const getAllTickets = async () => {

    try {

      const response = await api.get(
        "/tickets/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTickets(response.data);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        return;
      }

      alert(
        error.response?.data?.message ||
        "Unable to load tickets"
      );

    }

  };


  // =========================
  // UPDATE TICKET
  // =========================

  const updateTicket = async (
    ticketId,
    updateData
  ) => {

    try {

      setUpdating(true);

      const response = await api.put(
        `/tickets/${ticketId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedTicket =
        response.data?.ticket ||
        response.data;


      setTickets((previousTickets) =>

        previousTickets.map((ticket) =>
          ticket._id === ticketId
            ? updatedTicket
            : ticket
        )

      );


      setSelectedTicket(updatedTicket);

      alert(
        "Ticket updated successfully!"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to update ticket"
      );

    } finally {

      setUpdating(false);

    }

  };


  // =========================
  // DELETE TICKET
  // =========================

  const deleteTicket = async (ticketId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await api.delete(
        `/tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      setTickets((previousTickets) =>
        previousTickets.filter(
          (ticket) =>
            ticket._id !== ticketId
        )
      );


      setSelectedTicket(null);

      alert(
        "Ticket deleted successfully!"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to delete ticket"
      );

    }

  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  // =========================
  // SEARCH
  // =========================

  const filteredTickets = tickets.filter((ticket) => {

    const searchText =
      search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      ticket.title?.toLowerCase().includes(searchText) ||
      ticket.description?.toLowerCase().includes(searchText) ||
      ticket.status?.toLowerCase().includes(searchText) ||
      ticket.priority?.toLowerCase().includes(searchText) ||
      ticket._id?.toLowerCase().includes(searchText)
    );

  });


  // =========================
  // COUNTS
  // =========================

  const totalTickets =
    tickets.length;

  const openTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Open"
    ).length;

  const reviewTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "In Review"
    ).length;

  const resolvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Resolved"
    ).length;


  // =========================
  // USERS FROM TICKETS
  // =========================

  const usersMap = new Map();

  tickets.forEach((ticket) => {

    const ticketUser = ticket.user;

    if (!ticketUser) {
      return;
    }

    const userId =
      ticketUser._id ||
      ticketUser.id ||
      ticketUser.email;

    if (!userId) {
      return;
    }

    if (!usersMap.has(userId)) {

      usersMap.set(userId, {
        id: userId,
        name:
          ticketUser.name ||
          ticketUser.username ||
          "User",
        email:
          ticketUser.email ||
          "No email"
      });

    }

  });

  const users = Array.from(usersMap.values());


  // =========================
  // SCROLL FUNCTIONS
  // =========================

  const scrollToUsers = () => {

    document
      .getElementById("users-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  };


  const scrollToTickets = () => {

    document
      .getElementById("tickets-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="admin-layout">

      <AdminSidebar
        onLogout={handleLogout}
        onUsersClick={scrollToUsers}
        onTicketsClick={scrollToTickets}
      />


      <main className="admin-main">

        <AdminHeader
          user={user}
          search={search}
          setSearch={setSearch}
        />


        <div className="admin-content">

          <div className="admin-title">

            <div>

              <h1>
                Dashboard
              </h1>

              <p>
                Manage and resolve user support tickets
              </p>

            </div>

          </div>


          {/* STATISTICS */}

          <div className="stats-grid">

            <StatCard
              title="Total Tickets"
              value={totalTickets}
              icon="▦"
            />

            <StatCard
              title="Open Tickets"
              value={openTickets}
              icon="◷"
            />

            <StatCard
              title="In Review"
              value={reviewTickets}
              icon="◉"
            />

            <StatCard
              title="Resolved"
              value={resolvedTickets}
              icon="✓"
            />

          </div>


          {/* =========================
              USERS SECTION
          ========================= */}

          <section
            id="users-section"
            className="admin-section"
          >

            <div className="section-heading">

              <div>

                <h2>
                  Users
                </h2>

                <p>
                  Users who have created support tickets
                </p>

              </div>

              <span className="section-count">
                {users.length} Users
              </span>

            </div>


            <div className="users-list">

              {users.length === 0 ? (

                <div className="empty-section">
                  No users found
                </div>

              ) : (

                users.map((item) => (

                  <div
                    className="admin-user-card"
                    key={item.id}
                  >

                    <div className="user-avatar">
                      {item.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div className="user-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.email}
                      </p>

                    </div>

                    <span className="user-status">
                      Active
                    </span>

                  </div>

                ))

              )}

            </div>

          </section>


          {/* =========================
              TICKETS SECTION
          ========================= */}

          <section
            id="tickets-section"
            className="admin-section"
          >

            <div className="section-heading">

              <div>

                <h2>
                  Tickets
                </h2>

                <p>
                  Manage and resolve support tickets
                </p>

              </div>

              <span className="section-count">
                {filteredTickets.length} Tickets
              </span>

            </div>


            <TicketTable
              tickets={filteredTickets}
              selectedTicket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
            />

          </section>


          {/* DETAILS */}

          <TicketDetails
            ticket={selectedTicket}
            onUpdate={updateTicket}
            onDelete={deleteTicket}
            updating={updating}
          />

        </div>

      </main>

    </div>

  );

}

export default AdminDashboard;

