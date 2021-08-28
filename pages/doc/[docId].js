import { getSession } from "next-auth/client";
import Head from "next/head";
import React from "react";
import Doc from "../../Components/Docs/Doc";

const DocPage = () => {
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
