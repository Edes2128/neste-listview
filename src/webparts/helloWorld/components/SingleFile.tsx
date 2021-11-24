import * as React from "react";
import styles from "./HelloWorld.module.scss";
import FileViewer from "react-file-viewer";
import { Icon } from "@fluentui/react/lib/Icon";

export default function SingleFile({ url, closeModal }) {
  return (
    <div className={styles["single-file"]}>
      <Icon
        onClick={closeModal}
        aria-label="CalculatorMultiply"
        iconName="CalculatorMultiply"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize:40,
          cursor:"pointer",
          color: "black",
        }}
      />
      <div style={{ overflow: "auto", width: "673px", margin: "0 auto" }}>
        <FileViewer
          style={{ width: "100%" }}
          fileType={"pdf"}
          filePath={`https://progesoftware.sharepoint.com/${url}`}
        />
      </div>
    </div>
  );
}
