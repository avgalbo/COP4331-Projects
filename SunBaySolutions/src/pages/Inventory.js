import React, { useState } from "react";
import Inventory from "../components/Admin/Inventory.js";
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
      <Inventory />
      <Footer />
    </>
  );
}

export default InventoryPage;
