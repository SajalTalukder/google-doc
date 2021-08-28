import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import Doc from "../../Components/Docs/Doc";
import Login from "../../Components/Login";

const DocPage = () => {
  const [session] = useSession();
  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Edit Your Document</title>
      </Head>
      <Doc />
    </>
  );
};

export default DocPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
