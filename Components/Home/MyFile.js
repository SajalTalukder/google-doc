import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderIcon from "@material-ui/icons/Folder";
import React, { useState, useEffect } from "react";
import cls from "./MyFile.module.scss";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import LoadingSpinner from "../UI/LoadingSpinner";
import { DeleteForever } from "@material-ui/icons";

const MyFile = () => {
  const [session] = useSession();

  const router = useRouter();

  const [docArr, setDoc] = useState([]);
  const email = session?.user?.email;

  useEffect(() => {
    db.collection("userDocs")
      .doc(email)
      .collection("docs")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const docs = snapshot?.docs?.map((doc) => {
          return {
            id: doc?.id,
            fileName: doc?.data()?.fileName,
            timestamp: doc.data()?.timestamp,
          };
        });
        setDoc(docs);
      });
  }, [email, setDoc]);

  const [snapshot, loading] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  let fileContent;

  if (loading && !snapshot) {
    fileContent = (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  const deleteHandler = async (id) => {
    const res = await db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
      .delete();
  };

  if (docArr.length !== 0) {
    fileContent = docArr.map((doc, i) => {
      return (
        <div key={doc.id} className={cls["myfile__flex"]}>
          <div
            onClick={() => {
              router.push(`/doc/${doc?.id}`);
            }}
            className={cls["myfile__file"]}
          >
            <span className={cls["myfile__text"]}>
              <AssignmentIcon className={cls["myfile__text-icon"]} />
            </span>
            <span className={cls["myfile__title"]}>{doc?.fileName}</span>
            <span className={cls["myfile__date"]}>
              {doc?.timestamp?.toDate().toLocaleDateString()}
            </span>
          </div>
          <span className={cls["myfile__more"]}>
            <DeleteForever
              onClick={() => {
                deleteHandler(doc?.id);
              }}
              className={cls["myfile__more-icon"]}
            />
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
