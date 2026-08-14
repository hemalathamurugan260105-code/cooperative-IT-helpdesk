import React, { useState } from "react";
import api from "../../api";

function CreateTicket({
  onClose,
  onTicketCreated,
  token
}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      await api.post(
        "/tickets",
        {
          title,
          description,
          priority
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      alert("Ticket submitted successfully!");


      setTitle("");
      setDescription("");
      setPriority("Medium");


      // Refresh user tickets
      onTicketCreated();


    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create ticket"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="modal-overlay">

      <div className="create-ticket-modal">


        {/* Header */}

        <div className="modal-header">

          <div>

            <h2>
              Create New Ticket
            </h2>

            <p>
              Tell us about your IT problem.
            </p>

          </div>


          <button
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            ×
          </button>

        </div>


        {/* Form */}

        <form onSubmit={handleSubmit}>


          {/* Title */}

          <div className="form-group">

            <label>
              Complaint / Subject
            </label>

            <input
              type="text"
              placeholder="Example: WiFi is not working"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>


          {/* Description */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Explain your problem clearly..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

          </div>


          {/* Priority */}

          <div className="form-group">

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


          {/* Buttons */}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >

              {loading
                ? "Submitting..."
                : "Submit Ticket"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default CreateTicket;