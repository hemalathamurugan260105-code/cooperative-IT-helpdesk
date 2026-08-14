import React from "react";

function TicketTable({
  tickets,
  selectedTicket,
  setSelectedTicket
}) {

  return (
    <div className="ticket-table-card">

      <div className="table-heading">

        <div>
          <h2>Recent Tickets</h2>
          <p>Manage user support requests</p>
        </div>

        <span className="total-tickets">
          {tickets.length} Tickets
        </span>

      </div>


      {tickets.length === 0 ? (

        <div className="no-tickets">
          <h3>No tickets found</h3>
          <p>There are no user tickets available.</p>
        </div>

      ) : (

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Ticket</th>
                <th>User</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {tickets.map((ticket) => (

                <tr
                  key={ticket._id}
                  onClick={() =>
                    setSelectedTicket(ticket)
                  }
                  className={
                    selectedTicket?._id === ticket._id
                      ? "selected-row"
                      : ""
                  }
                >

                  <td>

                    <div className="ticket-name">

                      <div className="ticket-small-icon">
                        IT
                      </div>

                      <div>
                        <strong>
                          {ticket.title}
                        </strong>

                        <span>
                          #{ticket._id.slice(-6)}
                        </span>
                      </div>

                    </div>

                  </td>


                  <td>
                    User
                  </td>


                  <td>

                    <span
                      className={`priority-badge ${ticket.priority?.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>

                  </td>


                  <td>

                    <span
                      className={`admin-status ${ticket.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {ticket.status}
                    </span>

                  </td>


                  <td>
                    {ticket.createdAt
                      ? new Date(
                          ticket.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default TicketTable;
