import FileButtons from "./FileButtons";
import FileTree from "./FileTree";
import { useState } from "react";

function FileSpace({ setDefault }) {
  const [currDir, setCurrDir] = useState("");

  async function handleCreateNewFile() {
    const newFileHandle = await currDir.getFileHandle("My Notes.txt", { create: true });
  }

  async function handleCreateNewFolder() {}

  return (
    <>
      <FileHeader />
      <FileButtons handleCreateNewFile={handleCreateNewFile} handleCreateNewFolder={handleCreateNewFolder} />
      <FileTree setDefault={setDefault} setCurrDir={setCurrDir} />
    </>
  );
}

function FileHeader() {
  return <>Directory Name</>;
}

export default FileSpace;
