import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const { email } = useParams();
  const [users, setUsers] = useState("");
  useEffect(() => {
    (async function getUser() {
      const response = await axios.get("/api/registrations", {
        params: { email: email },
      });
      console.log("response", response.data);
      let firstName=response.data[0].firstName;
      firstName= firstName[0].toUpperCase()+firstName.substring(1,firstName.length);
      setUsers({...response.data[0],firstName:firstName});
    })();
  }, []);
  return (
    <div>
      <nav aria-label="breadcrumb" class="main-breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            User Profile
          </li>
        </ol>
      </nav>
      {users && (
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    class="rounded-circle"
                    width="150"
                  />
                  <div class="mt-3">
                    <h4>{users.firstName + " " + users.lastName}</h4>
                    {/* <p class="text-secondary mb-1">Full Stack Developer</p> */}
                    <p class="text-muted font-size-sm">
                      {users.city + "," + users.state + "," + users.country}
                    </p>
                    {/* <button class="btn btn-primary">Follow</button>
                <button class="btn btn-outline-primary">Message</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Full Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {users.firstName + " " + users.lastName}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{users.email}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Date of birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{users.dob}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{users.gender}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {users.city + "," + users.state + "," + users.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
