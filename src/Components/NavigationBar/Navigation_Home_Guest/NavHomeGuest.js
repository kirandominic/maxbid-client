import React from 'react'
import'./NavHomeGuest.css'
import {useNavigate} from "react-router-dom"

function NavHomeGuest() {
  const navigate = useNavigate();

  return (
    <div className='navigation-guest'><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
        <button type="button" className="btn btn-light sell" onClick={navigate("/Home-Guest")}>Home</button>
        </li>

        <li class="nav-item">
        <button type="button" className="btn btn-light sell" onClick={navigate("/login")}>Home</button>

        </li>
        <li class="nav-item">
        <button type="button" className="btn btn-light sell" onClick={navigate("/Register")}>Home</button>
        </li>
      </ul>

    </div>
  </nav></div>
  )
}

export default NavHomeGuest