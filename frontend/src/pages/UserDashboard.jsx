import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import UserSidebar from "../components/user/UserSidebar";
import UserHeader from "../components/user/UserHeader";
import TicketList from "../components/user/TicketList";
import TicketDetails from "../components/user/TicketDetails";
import CreateTicket from "../components/user/CreateTicket";

import "../styles/UserDashboard.css";

function UserDashboard() {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  // NEW
  const [activeFilter, setActiveFilter] = useState("All");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");


  // =========================
  // AUTHENTICATION
  // =========================

  useEffect(() => {

    if (!token || !user) {

      navigate("/login");

      return;
    }

    if (user.role === "admin") {

      navigate("/admin-dashboard");

      return;
    }

    getMyTickets();

  }, []);


  // =========================
  // GET MY TICKETS
  // =========================

  const getMyTickets = async () => {

    try {

      const response = await api.get(
        "/tickets/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(response.data);

      if (response.data.length > 0) {

        setSelectedTicket(response.data[0]);

      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to load tickets"
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
  // CREATE TICKET
  // =========================

  const handleTicketCreated = () => {

    setShowCreateTicket(false);

    getMyTickets();

  };


  // =========================
  // SCROLL TO TICKETS
  // =========================

  const scrollToTickets = () => {

    setActiveFilter("All");

    document
      .getElementById("my-tickets-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  };


  // =========================
  // FILTER TICKETS
  // =========================

  const handleFilterChange = (filter) => {

    setActiveFilter(filter);

    document
      .getElementById("my-tickets-section")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  };


  // =========================
  // FILTERED TICKETS
  // =========================

  const filteredTickets = tickets.filter((ticket) => {

    if (activeFilter === "All") {
      return true;
    }

    return (
      ticket.status?.toLowerCase() ===
      activeFilter.toLowerCase()
    );

  });


  // =========================
  // UI
  // =========================

  return (

    <div className="user-layout">


      {/* LEFT SIDEBAR */}

      <UserSidebar
        onLogout={handleLogout}
        onNewTicket={() =>
          setShowCreateTicket(true)
        }
        onTicketsClick={scrollToTickets}
      />


      {/* MAIN AREA */}

      <div className="user-main">


        {/* HEADER */}

        <UserHeader user={user} />


        {/* TICKET AREA */}

        <div
          className="user-workspace"
          id="my-tickets-section"
        >


          {/* LEFT - MY TICKETS */}

          <TicketList
            tickets={filteredTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            activeFilter={activeFilter}
            setActiveFilter={handleFilterChange}
          />


          {/* RIGHT - DETAILS */}

          <TicketDetails
            ticket={selectedTicket}
          />

        </div>

      </div>


      {/* CREATE TICKET */}

      {showCreateTicket && (

        <CreateTicket
          onClose={() =>
            setShowCreateTicket(false)
          }
          onTicketCreated={handleTicketCreated}
          token={token}
        />

      )}

    </div>

  );

}

export default UserDashboard;