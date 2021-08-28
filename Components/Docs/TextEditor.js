import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import cls from "./Doc.module.scss";
import { EditorState } from "draft-js";
import { db } from "../../firebase";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useSession } from "next-auth/client";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const TextEditor = () => {
  const [session] = useSession();
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { docId } = router.query;
  const [snapshot] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(docId)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(docId)
      .set(
        { editorState: convertToRaw(editorState.getCurrentContent()) },
        { merge: true }
      );
  };

  return (
    <div className={cls["editor-div"]}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName={cls["toolbar"]}
        editorClassName={cls["editor"]}
      />
      <div className={cls["save-btn-box"]}>
        <button
          onClick={() => {
            router.push("/");
          }}
          className={cls["save-btn"]}
        >
          Save And Back To Home
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
