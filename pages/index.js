import React from "react";
import Home from "../Components/Home/Home";
import Login from "../Components/Login";
import { getSession, useSession } from "next-auth/client";
const HomePage = () => {
  const [session] = useSession();
  console.log(session);
  if (!session) {
    return <Login />;
  }

  return <Home />;
};

export default HomePage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {
      session,
    },
  };
}
