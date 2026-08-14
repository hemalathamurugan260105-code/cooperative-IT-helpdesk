import React, {
  useEffect,
  useRef,
  useState
} from "react";

function UserHeader({ user }) {

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);


  // =========================
  // CLOSE PROFILE ON OUTSIDE CLICK
  // =========================

  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {

        setShowProfile(false);

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


  return (

    <header className="user-header">

      {/* SEARCH */}

      <div className="header-search">

        <span>⌕</span>

        <input
          type="text"
          placeholder="Search tickets..."
        />

      </div>


      {/* PROFILE */}

      <div
        className="user-profile-wrapper"
        ref={profileRef}
      >

        <div
          className="user-profile"
          onClick={() =>
            setShowProfile((previous) => !previous)
          }
        >

          <span className="notification">
            ♧
          </span>


          <div className="user-avatar">

            {user?.name
              ?.charAt(0)
              .toUpperCase() || "U"}

          </div>


          <div className="user-profile-info">

            <strong>
              {user?.name || "User"}
            </strong>

            <small>
              Helpdesk User
            </small>

          </div>

        </div>


        {/* PROFILE DROPDOWN */}

        {showProfile && (

          <div className="user-profile-dropdown">

            <div className="user-dropdown-header">

              <div className="user-large-avatar">

                {user?.name
                  ?.charAt(0)
                  .toUpperCase() || "U"}

              </div>


              <div>

                <strong>
                  {user?.name || "User"}
                </strong>

                <small>
                  Helpdesk User
                </small>

              </div>

            </div>


            <div className="user-profile-divider" />


            <div className="user-profile-details">

              <div>

                <label>
                  Name
                </label>

                <p>
                  {user?.name || "Not available"}
                </p>

              </div>


              <div>

                <label>
                  Email
                </label>

                <p>
                  {user?.email || "Not available"}
                </p>

              </div>


              <div>

                <label>
                  Role
                </label>

                <p>
                  {user?.role || "User"}
                </p>

              </div>


              <div>

                <label>
                  Status
                </label>

                <p className="user-active-status">
                  ● Active
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </header>

  );

}

export default UserHeader;