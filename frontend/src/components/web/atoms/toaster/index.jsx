import React from "react";

export const CloseButton = ({ closeToast }) => {
  return (
    <button type="button" onClick={closeToast} aria-label="Close">
      ×
    </button>
  );
};
