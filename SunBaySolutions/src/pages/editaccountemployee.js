import React, { useState } from "react";
import EditAccountEmployee from "../components/Employee/EditAccountEmployee";
import ScrollToTop from "../components/ScrollToTop";

function EditAccountEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ScrollToTop />
      <EditAccountEmployee />
    </>
  );
}

export default EditAccountEmployeePage;
