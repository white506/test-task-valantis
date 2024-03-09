import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">DIAMONDS EARTH</div>
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              ENGAGEMENT RINGS
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              WEDDING RINGS
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              DIAMONDS
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              GEMSTONES
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              JEWLRY
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              GIFTS
            </a>
          </li>
          <li className="header__nav__list__item">
            <a href="#" className="header__nav__list__item__link">
              ABOUT
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
