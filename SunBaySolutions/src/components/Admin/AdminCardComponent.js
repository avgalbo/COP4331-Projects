import React from "react";

import {
  AdminCard,
  AdminH2,
} from "./AdminElements";

const AdminCardComponent = (props) => {
  return (
    <AdminCard>
      <AdminH2>{props.username}</AdminH2>
      <AdminH2>{props.roomnumber}</AdminH2>
    </AdminCard>
  );
};

export default AdminCardComponent;
