import React from "react";
import cls from "./AddFile.module.scss";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Image from "next/image";

const AddFile = (props) => {
  return (
    <div className={cls["file"]}>
      <div className={cls["file__box"]}>
        <div className={cls["file__flex"]}>
          <h2>Start a new Document</h2>
          <div className={cls["file__icon"]}>
            <MoreVertOutlinedIcon className={cls["file__icon-threedot"]} />
          </div>
        </div>
        <div className={cls["file__image"]}>
          <Image
            src="/images/plus.png"
            alt="plus"
            height={150}
            width={250}
            objectFit="cover"
            onClick={props.onShow}
          />
        </div>
        <p>Blank</p>
      </div>
    </div>
  );
};

export default AddFile;
// 586923532954-f8s38tid7kedh9s3cj0bcg8lau0cbcgk.apps.googleusercontent.com
