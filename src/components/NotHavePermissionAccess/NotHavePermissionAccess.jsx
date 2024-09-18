import React from "react";
import bgDeniedPage from "../../assets/images/bg_denied_page.png";

function NotHavePermissionAccess() {
  return (
    <div className="w-full mt-[var(--height-header)] h-[calc(100vh-var(--height-header))]">
      <img
        src={bgDeniedPage}
        alt=""
        className="object-cover w-full max-h-full"
      />
    </div>
  );
}

export default NotHavePermissionAccess;
