import React from "react";

import AccountInfor from "./components/AccountInfor";
import { useSelector } from "react-redux";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ChangeInformation from "./components/ChangeInformation/ChangeInformation";
Account.propTypes = {};

function Account(props) {
  const { information } = useSelector((state) => state.user);
  return (
    <div className="relative h-[calc(120vh-var(--height-header))] pt-[var(--height-header)]">
      <div className="py-4 px-8 m-8 flex">
        <AccountInfor userInfor={information} />
        <div className="ml-4 flex-1 flex">
          <ChangeInformation userInfor={information} />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

export default Account;
