import React from "react";
import cls from "./Login.module.scss";
import Image from "next/image";
import { signIn } from "next-auth/client";

const Login = () => {
  return (
    <div className={cls["login"]}>
      <div className={cls["login__image"]}>
        <Image
          src="/images/img1.png"
          alt="logo image"
          height={300}
          width={500}
          objectFit="contain"
        />
      </div>
      <div className={cls["login__button"]}>
        <button onClick={signIn} className={cls["button"]}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
