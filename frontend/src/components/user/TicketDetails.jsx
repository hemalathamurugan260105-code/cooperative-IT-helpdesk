import React, {
  useEffect,
  useRef,
  useState
} from "react";

function TicketDetails({ ticket }) {

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);


  // =========================
  // CLOSE MENU ON OUTSIDE CLICK
  // =========================

  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setShowMenu(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);


  // =========================
  // COPY TICKET ID
  // =========================

  const copyTicketId = async () => {

    try {

      await navigator.clipboard.writeText(
        ticket._id
      );

      alert("Ticket ID copied!");

      setShowMenu(false);

    } catch (error) {

      console.error(error);

    }

  };


  // No ticket selected

  if (!ticket) {

    return (

      <section className="ticket-details empty-details">

        <div className="empty-icon">
          🎫
        </div>

        <h2>
          Select a Ticket
        </h2>

        <p>
          Select a ticket from the list to view its details.
        </p>

      </section>

    );

  }


  return (

    <section className="ticket-details">

      {/* =========================
          HEADER
      ========================= */}

      <div className="details-header">

        <div>

          <span className="details-ticket-id">
            Ticket #{ticket._id.slice(-6)}
          </span>

          <h2>
            {ticket.title}
          </h2>

        </div>


        {/* THREE DOT MENU */}

        <div
          className="ticket-menu-wrapper"
          ref={menuRef}
        >

          <button
            className="more-btn"
            onClick={() =>
              setShowMenu((previous) => !previous)
            }
          >
            ⋮
          </button>


          {showMenu && (

            <div className="ticket-action-menu">

              <button
                onClick={copyTicketId}
              >
                <span>▣</span>
                Copy Ticket ID
              </button>


              <div className="ticket-menu-divider" />


              <div className="ticket-menu-info">

                <span>
                  Ticket Status
                </span>

                <strong>
                  {ticket.status}
                </strong>

              </div>


              <div className="ticket-menu-info">

                <span>
                  Priority
                </span>

                <strong>
                  {ticket.priority}
                </strong>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          TICKET INFORMATION
      ========================= */}

      <div className="ticket-info">

        <div className="info-item">

          <span>
            Status
          </span>

          <strong
            className={`details-status ${
              ticket.status
                ?.toLowerCase()
                .replace(/\s+/g, "-")
            }`}
          >
            {ticket.status}
          </strong>

        </div>


        <div className="info-item">

          <span>
            Priority
          </span>

          <strong
            className={`details-priority ${
              ticket.priority?.toLowerCase()
            }`}
          >
            {ticket.priority}
          </strong>

        </div>


        <div className="info-item">

          <span>
            Created
          </span>

          <strong>

            {ticket.createdAt
              ? new Date(
                  ticket.createdAt
                ).toLocaleDateString()
              : "-"}

          </strong>

        </div>

      </div>


      {/* =========================
          COMPLAINT
      ========================= */}

      <div className="details-section">

        <h3>
          Complaint Description
        </h3>

        <div className="description-box">

          <p>
            {ticket.description}
          </p>

        </div>

      </div>


      {/* =========================
          ADMIN UPDATE
      ========================= */}

      <div className="details-section">

        <h3>
          Admin Update
        </h3>


        <div className="resolution-box">


          {/* RESOLVED */}

          {ticket.status === "Resolved" ? (

            <>

              <span className="resolution-icon">
                ✓
              </span>

              <div>

                <strong>
                  Issue Resolved
                </strong>

                <p>
                  Your complaint has been resolved
                  by the IT helpdesk.
                </p>

              </div>

            </>


          ) : ticket.status === "In Review" ? (

            /* IN REVIEW */

            <>

              <span className="progress-icon">
                ↻
              </span>

              <div>

                <strong>
                  Admin is reviewing your issue
                </strong>

                <p>
                  Your ticket is currently being
                  reviewed by the IT helpdesk team.
                </p>

              </div>

            </>


          ) : (

            /* OPEN */

            <>

              <span className="open-icon">
                !
              </span>

              <div>

                <strong>
                  Ticket received
                </strong>

                <p>
                  Your complaint has been submitted
                  and is waiting for admin review.
                </p>

              </div>

            </>

          )}

        </div>

      </div>


      {/* =========================
          RESOLUTION NOTES
      ========================= */}

      {ticket.resolutionNotes && (

        <div className="details-section">

          <h3>
            Resolution Notes
          </h3>

          <div className="description-box">

            <p>
              {ticket.resolutionNotes}
            </p>

          </div>

        </div>

      )}


      {/* =========================
          FOOTER
      ========================= */}

      <div className="details-footer">

        <p>
          Need more help? Contact IT Helpdesk.
        </p>

      </div>

    </section>

  );

}

export default TicketDetails;