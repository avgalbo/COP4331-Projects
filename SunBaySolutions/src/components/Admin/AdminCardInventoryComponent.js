import React from "react";
// import Icon1 from "../../images/svg-1.svg";

import { AdminCard, AdminH2, AdminP, FormButtonDelete } from "./AdminAddInventoryElements";

const AdminCardComponent = (props) => {
  return (
    <AdminCard style={{backgroundImage:`url(${props.img})`}}>
      {/* <AdminIcon src={Icon1} /> */}
      <AdminH2>{props.items}</AdminH2>
      <AdminP>{props.des}</AdminP>
      <FormButtonDelete type="submit" class="button">
        delete
      </FormButtonDelete>
    </AdminCard>
  );
};

export default AdminCardComponent;