import { getSession } from "next-auth/client";
import React from "react";
import Doc from "../../Components/Docs/Doc";

const DocPage = () => {
  return <Doc />;
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
