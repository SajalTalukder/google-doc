import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import FolderIcon from "@material-ui/icons/Folder";
import React, { useState, useEffect } from "react";
import cls from "./MyFile.module.scss";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

const MyFile = () => {
  const [session] = useSession();
  const router = useRouter();
  const [snapshot, loading] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  let fileContent;

  if (loading && !snapshot) {
    fileContent = <h3>Loading</h3>;
  }
  if (!loading && !snapshot) {
    fileContent = <h3>You Dont have any Document Created</h3>;
  }

  if (snapshot && !loading) {
    fileContent = snapshot?.docs.map((doc) => {
      return (
        <div
          key={doc.id}
          onClick={() => {
            router.push(`/doc/${doc.id}`);
          }}
          className={cls["myfile__file"]}
        >
          <span className={cls["myfile__text"]}>
            <AssignmentIcon className={cls["myfile__text-icon"]} />
          </span>
          <span className={cls["myfile__title"]}>{doc.data().fileName}</span>
          <span className={cls["myfile__date"]}>
            {doc.data().timestamp.toDate().toLocaleDateString()}
          </span>
          <span className={cls["myfile__more"]}>
            <MoreVertOutlinedIcon className={cls["myfile__more-icon"]} />
          </span>
        </div>
      );
    });
  }

  return (
    <div className={cls["myfile"]}>
      <div className={cls["myfile__box"]}>
        <div className={cls["myfile__heading"]}>
          <span className={cls["myfile__document"]}>My Document</span>
          <span className={cls["myfile__date"]}>Date Created</span>
          <span className={cls["myfile__folder"]}>
            <FolderIcon className={cls["myfile__folder-icon"]} />
          </span>
        </div>
        <div className={cls["myfile__file-box"]}>{fileContent}</div>
      </div>
    </div>
  );
};

export default MyFile;
