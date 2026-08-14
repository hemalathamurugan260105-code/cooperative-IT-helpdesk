import React from "react";

function TicketList({
  tickets,
  selectedTicket,
  setSelectedTicket,
  activeFilter,
  setActiveFilter
}) {

  const filters = [
    "All",
    "Open",
    "In Progress",
    "Resolved"
  ];


  return (

    <section
      className="ticket-list"
      id="tickets"
    >

      {/* Header */}

      <div className="ticket-list-header">

        <div>

          <h2>My Tickets</h2>

          <p>
            Your support requests
          </p>

        </div>


        <span>
          {tickets.length}
        </span>

      </div>


      {/* Filter */}

      <div className="ticket-filter">

        {filters.map((filter) => (

          <button
            key={filter}
            className={
              activeFilter === filter
                ? "filter-active"
                : ""
            }
            onClick={() =>
              setActiveFilter(filter)
            }
          >
            {filter}
          </button>

        ))}

      </div>


      {/* Tickets */}

      <div className="tickets">

        {tickets.length === 0 ? (

          <div className="no-tickets">

            <div>
              🎫
            </div>

            <h3>
              No tickets yet
            </h3>

            <p>
              Create a ticket when you need IT support.
            </p>

          </div>

        ) : (

          tickets.map((ticket) => (

            <div
              key={ticket._id}
              className={`ticket-item ${
                selectedTicket?._id === ticket._id
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedTicket(ticket)
              }
            >

              <div className="ticket-item-top">

                <strong>
                  {ticket.title}
                </strong>

                <span className="ticket-date">

                  {ticket.createdAt
                    ? new Date(
                        ticket.createdAt
                      ).toLocaleDateString()
                    : ""}

                </span>

              </div>


              <p>
                {ticket.description}
              </p>


              <div className="ticket-item-bottom">

                <span className="ticket-id">

                  #{ticket._id.slice(-6)}

                </span>


                <span
                  className={`ticket-status ${
                    ticket.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")
                  }`}
                >

                  {ticket.status}

                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );

}

export default TicketList;