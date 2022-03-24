import React, { useState } from "react";
import Guest from "../components/Guest";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import UnifiedSidebar from "../components/Sidebar/UnifiedSidebar.js";
import Footer from "../components/Footer";

function GuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <UnifiedSidebar isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <Guest />
      <Footer />
    </>
  );
}

export default GuestPage;
