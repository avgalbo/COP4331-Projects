import React, { useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import UnifiedSidebar from "../components/Sidebar/UnifiedSidebar";
import Footer from "../components/Footer";
import AboutEmployeePageComponent from "../components/Employee/AboutEmployeePage";

function AboutEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <UnifiedSidebar isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <AboutEmployeePageComponent />
      <Footer />
    </>
  );
}

export default AboutEmployeePage;
