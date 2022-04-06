import React from "react";
import {
  FaCompass,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <div class="navigation">
      <div class="logo">
        <a class="no-underline" href="#">
          Insta
        </a>
      </div>
      <div class="navigation-search-container">
        <i class="fa fa-search">
          <FaSearch />
        </i>
        <input class="search-field" type="text" placeholder="Search" />
        <div class="search-container">
          <div class="search-container-box">
            <div class="search-results"></div>
          </div>
        </div>
      </div>
      <div class="navigation-icons">
        <a
          href="https://instagram.com/mimoudix"
          target="_blank"
          class="navigation-link"
        >
          <i>
            <FaCompass />
          </i>
        </a>
        <a class="navigation-link notifica">
          <i class="far fa-heart">
            <FaHeart />
            <div class="notification-bubble-wrapper">
              <div class="notification-bubble">
                <span class="notifications-count">99</span>
              </div>
            </div>
          </i>
        </a>
        <a href="https://instagram.com/mimoudix" class="navigation-link">
          <i class="far fa-user-circle">
            <FaUserCircle />
          </i>
        </a>
        <a
          href="https://instagram.com/mimoudix"
          id="signout"
          class="navigation-link"
        >
          <i class="fas fa-sign-out-alt">
            <FaSignOutAlt />
          </i>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
