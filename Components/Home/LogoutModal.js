/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/client";
import React from "react";
import cls from "./LogoutModal.module.scss";

const LogoutModal = (props) => {
  const [session] = useSession();
  const email = session?.user?.email;
  const userImg = session?.user?.image;
  const name = session?.user?.name;
  return (
    <>
      <div onClick={props.onHide} className={cls["backdrop"]}></div>
      <div className={cls["modal"]}>
        <header className={cls["header"]}>
          <h2>Person1</h2>
        </header>
        <main>
          <div className={cls["user__img-box"]}>
            <img className={cls["user__image"]} src={userImg} alt={name} />
          </div>
          <h3 className={cls["user__name"]}>{name}</h3>
          <h2 className={cls["user__email"]}>{email}</h2>
        </main>
        <footer className={cls["footer"]}>
          <button onClick={signOut}>Sign Out</button>
        </footer>
      </div>
    </>
  );
};

export default LogoutModal;
