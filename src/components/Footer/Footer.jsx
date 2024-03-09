import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links">
        <div className="footer__column">
          <h3 className="footer__heading">ABOUT</h3>
          <ul className="footer__submenu">
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/conflict-free">Conflict Free Diamonds</a>
            </li>
            <li>
              <a href="/recycled-gold">Recycled Gold</a>
            </li>
            <li>
              <a href="/reviews">Reviews</a>
            </li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="footer__heading">ORDERS</h3>
          <ul className="footer__submenu">
            <li>
              <a href="/about">Track Your Order</a>
            </li>
            <li>
              <a href="/conflict-free">Free 30 Day Return</a>
            </li>
            <li>
              <a href="/recycled-gold">Free Shipping Both Ways</a>
            </li>
            <li>
              <a href="/reviews">Free Lifetime Warranty</a>
            </li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="footer__heading">COMTACT US</h3>
          <ul className="footer__submenu">
            <li>
              <a href="/about">Live Chat</a>
            </li>
            <li>
              <a href="/conflict-free">Book Appointment</a>
            </li>
            <li>
              <a href="/recycled-gold">Stores</a>
            </li>
            <li>
              <a href="/reviews">Email Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__social">
        <h3 className="footer__heading">Follow Us</h3>
        <ul className="footer__social-icons">
          <li>
            <a href="https://www.tiktok.com/">TikTok</a>
          </li>
          <li>
            <a href="https://www.youtube.com/">YouTube</a>
          </li>
          <li>
            <a href="https://instagram.com/">Instagram</a>
          </li>
          {/* остальные иконки */}
        </ul>
      </div>
      <div className="footer__copyright">
        <p>©2024 Diamond Earth, LLC</p>
        <ul className="footer__legal-links">
          <li>
            <a href="/terms">Terms & Conditions</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          {/* остальные ссылки */}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
