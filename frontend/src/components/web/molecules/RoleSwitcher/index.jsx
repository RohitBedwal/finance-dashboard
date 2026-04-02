import React from "react";
import Select from "../../atoms/select";

const RoleSwitcher = ({ role, setRole }) => {
  return (
    <Select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      options={[
        { label: "Viewer", value: "viewer" },
        { label: "Admin", value: "admin" },
      ]}
    />
  );
};

export default RoleSwitcher;