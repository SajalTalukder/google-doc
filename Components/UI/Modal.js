import React, { useState } from "react";
import cls from "./Modal.module.scss";
import { db } from "../../firebase";
import { useSession } from "next-auth/client";
import firebase from "firebase";
import { useRouter } from "next/dist/client/router";
import LoadingSpinner from "./LoadingSpinner";

const Modal = ({ onClose }) => {
  const router = useRouter();
  const [session] = useSession();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const createDocument = async () => {
    if (!value) return;

    setLoading(true);
    const firestore = await db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .add({
        fileName: value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setValue("");
    onClose();
    setLoading(false);
    router.push(`/doc/${firestore.id}`);
  };

  return (
    <>
      <div onClick={onClose} className={cls["backdrop"]}></div>
      <div className={cls["modal"]}>
        <div className={cls["modal__input-box"]}>
          <input
            value={value}
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && createDocument()}
            placeholder="Enter your document name"
          />
        </div>

        <div className={cls["modal__buttons"]}>
          <button onClick={onClose} className={cls["modal__button-2"]}>
            Cancel
          </button>
          {!loading && (
            <button onClick={createDocument} className={cls["modal__button-1"]}>
              Create
            </button>
          )}
          {loading && (
            <button className={cls["modal__button-1"]}>Loading...</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
