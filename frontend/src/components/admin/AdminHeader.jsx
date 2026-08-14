import React, { useEffect, useRef, useState } from "react";

function AdminHeader({
  user,
  search,
  setSearch
}) {

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

    <header className="admin-header">

      {/* SEARCH */}

      <div className="admin-search">

        🔍

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* =========================
          ADMIN PROFILE
      ========================= */}

      <div
        className="admin-profile-wrapper"
        ref={profileRef}
      >

        {/* PROFILE HEADER */}

        <div
          className="admin-profile"
          onClick={() =>
            setShowProfile((previous) => !previous)
          }
        >

          <div className="admin-avatar">

            {user?.name
              ?.charAt(0)
              .toUpperCase() || "A"}

          </div>


          <div>

            <strong>
              {user?.name || "Admin"}
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>


        {/* =========================
            PROFILE DROPDOWN
        ========================= */}

        {showProfile && (

          <div
            className="admin-profile-dropdown"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="profile-dropdown-header">

              <div className="profile-large-avatar">

                {user?.name
                  ?.charAt(0)
                  .toUpperCase() || "A"}

              </div>


              <div>

                <strong>
                  {user?.name || "Admin"}
                </strong>

                <span>
                  Administrator
                </span>

              </div>

            </div>


            <div className="profile-divider"></div>


            <div className="profile-info">

              {/* EMAIL */}

              <div>

                <small>
                  Email
                </small>

                <p>
                  {user?.email || "No email"}
                </p>

              </div>


              {/* ROLE */}

              <div>

                <small>
                  Role
                </small>

                <p>
                  Administrator
                </p>

              </div>


              {/* STATUS */}

              <div>

                <small>
                  Status
                </small>

                <p className="profile-active">
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

export default AdminHeader;