/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import cls from "./Header.module.scss";
import DescriptionOutlinedIcon from "@material-ui/icons/Description";

import SearchIcon from "@material-ui/icons/Search";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";

import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";

import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import LogoutModal from "./LogoutModal";
const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(true);
  };
  const hideHandler = () => {
    setShow(false);
  };
  return (
    <>
      {show && <LogoutModal onHide={hideHandler} />}
      <header className={cls["header"]}>
        <nav className={cls["nav"]}>
          <div className={cls["nav__first"]}>
            <div className={cls["nav__menu"]}>
              <ListOutlinedIcon className={cls["nav__menu-icon"]} />
            </div>
            <div
              onClick={() => {
                router.push("/");
              }}
              className={cls["nav__doc"]}
            >
              <DescriptionOutlinedIcon className={cls["nav__doc-icon"]} />
            </div>
            <h3>Docs</h3>
          </div>
          <div className={cls["nav__input-box"]}>
            <span className={cls["nav__search"]}>
              <SearchIcon className={cls["nav__search-icon"]} />
            </span>
            <input type="text" placeholder="Search" />
          </div>
          <div className={cls["nav__first"]}>
            <div className={cls["nav__apps"]}>
              <AppsOutlinedIcon className={cls["nav__apps-icon"]} />
            </div>
            <div onClick={showHandler} className={cls["nav__user-image"]}>
              <img loading="lazy" src={session?.user?.image} alt="user" />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
