import React, { useState } from "react";
import Employee from "../components/Employee";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import UnifiedSidebar from "../components/Sidebar/UnifiedSidebar.js";
import Footer from "../components/Footer";

function EmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <UnifiedSidebar isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <Employee />
      <Footer />
    </>
  );
}

export default EmployeePage;
