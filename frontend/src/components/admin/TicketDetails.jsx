import React, { useState, useEffect } from "react";

function TicketDetails({
  ticket,
  onUpdate,
  updating
}) {

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {

    if (ticket) {
      setStatus(ticket.status || "");
      setPriority(ticket.priority || "");
    }

  }, [ticket]);


  if (!ticket) {

    return (
      <div className="ticket-details empty-admin-details">

        <div className="empty-details-icon">
          ◇
        </div>

        <h3>Select a ticket</h3>

        <p>
          Select a ticket from the table to manage it.
        </p>

      </div>
    );

  }
const handleUpdate = () => {

    onUpdate(
      ticket._id,
      {
        status,
        priority
      }
    );

  };
return (
    <div className="ticket-details">

      <div className="details-top">

        <div>
<span className="ticket-label">
            SUPPORT TICKET
          </span>

          <h2>
            {ticket.title}
          </h2>
<span className="ticket-number">
            Ticket #{ticket._id.slice(-6)}
          </span>

        </div>
        <span
          className={`admin-status large ${status
            ?.toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {status}
        </span>

      </div>
<div className="complaint-section">

        <h3>User Complaint</h3>

        <div className="complaint-box">

          <p>
            {ticket.description}
          </p>

        </div>

      </div>


      <div className="admin-update-section">

        <h3>Manage Ticket</h3>


        <div className="update-grid">

          <div>

            <label>
              Ticket Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
<option value="Open">
                Open
              </option>

              <option value="In Review">
                In Review
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>
<div>
<label>
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
               <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </select>

          </div>

        </div>
<button
          className="update-ticket-button"
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating
            ? "Updating..."
            : "Update Ticket"}
        </button>

      </div>
            <div className="ticket-info">



<div>
          <span>Created</span>

          <strong>
            {ticket.createdAt
              ? new Date(
                  ticket.createdAt
                ).toLocaleString()
              : "-"}
          </strong>
        </div>

        <div>
          <span>Last Updated</span>

          <strong>
            {ticket.updatedAt
              ? new Date(
                  ticket.updatedAt
                ).toLocaleString()
              : "-"}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default TicketDetails;