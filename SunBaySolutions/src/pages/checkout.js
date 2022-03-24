import React, { useState } from "react";
import CheckOut from "../components/Admin/CheckOut";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import UnifiedSidebar from "../components/Sidebar/UnifiedSidebar";
import Footer from "../components/Footer";

function InventoryPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <UnifiedSidebar isOpen={isOpen} toggle={toggle} />
      <CheckOut />
      <Footer />
    </>
  );
}

export default InventoryPage;
