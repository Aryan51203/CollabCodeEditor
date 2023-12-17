import FileButtons from "./FileButtons";
import FileTree from "./FileTree";
import { useState } from "react";

function FileSpace({ setDefault }) {
  const [tree, setTree] = useState({});
  const [currDir, setCurrDir] = useState("");

  async function handleCreateNewFile() {
    const newFileHandle = await currDir.getFileHandle("MyNotes.txt", { create: true });
    const file = await newFileHandle.getFile();

    setTree((tree) => {
      const newTree = { ...tree };
      newTree[file.name] = "";
      return newTree;
    });
  }

  async function handleCreateNewFolder() {}

  return (
    <>
      <FileHeader />
      <FileButtons handleCreateNewFile={handleCreateNewFile} handleCreateNewFolder={handleCreateNewFolder} />
      <FileTree setDefault={setDefault} setCurrDir={setCurrDir} tree={tree} setTree={setTree} />
    </>
  );
}

function FileHeader() {
  return <>Directory Name</>;
}

export default FileSpace;
