import React, { useState } from "react";
import AboutGuest from "../components/Guest/AboutGuest";
import UnifiedSidebar from "../components/Sidebar/UnifiedSidebar";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import Footer from "../components/Footer";

function AboutGuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <UnifiedSidebar isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <AboutGuest />
      <Footer />
    </>
  );
}

export default AboutGuestPage;
