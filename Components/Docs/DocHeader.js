/* eslint-disable @next/next/no-img-element */
import React from "react";
import cls from "./Doc.module.scss";
import DescriptionOutlinedIcon from "@material-ui/icons/Description";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { signOut, useSession } from "next-auth/client";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import Login from "../Login";
import TextEditor from "./TextEditor";

const DocHeader = () => {
  const [session] = useSession();
  const router = useRouter();
  const { docId } = router.query;

  const [snapshot, loading] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(docId)
  );

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <header className={cls["header"]}>
        <nav className={cls["nav"]}>
          <div
            onClick={() => {
              router.push("/");
            }}
            className={cls["nav__logo"]}
          >
            <DescriptionOutlinedIcon className={cls["nav__logo-icon"]} />
          </div>
          <div className={cls["nav__option"]}>
            <div className={cls["nav__title"]}>
              {snapshot?.data()?.fileName}
            </div>
            <div className={cls["nav__list"]}>
              <div className={cls["nav__item"]}>File</div>
              <div className={cls["nav__item"]}>Edit</div>
              <div className={cls["nav__item"]}>View</div>
              <div className={cls["nav__item"]}>Intsert</div>
              <div className={(cls["nav__item"], cls["hide"])}>Formate</div>
              <div className={(cls["nav__item"], cls["hide"])}>Tools</div>
            </div>
          </div>
          <div className={cls["nav__share-box"]}>
            <button className={cls["nav__share-button"]}>
              <ShareOutlinedIcon className={cls["nav__share-icon"]} />
              <span>Share</span>
            </button>
          </div>
          <div onClick={signOut} className={cls["nav__user-image"]}>
            <img loading="lazy" src={session?.user?.image} alt="user" />
          </div>
        </nav>
      </header>
      <TextEditor />
    </>
  );
};

export default DocHeader;
