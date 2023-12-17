import FileButtons from "./FileButtons";
import FileTree from "./FileTree";
import { useState } from "react";

function FileSpace({ setDefault, currDir, setCurrDir }) {
  const [tree, setTree] = useState({});

  function handleCreateNewFile() {
    setTree((tree) => {
      const newTree = { ...tree };
      const inpEle = (
        <input
          type="text"
          id="inpFileName"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createNewFile(e.target.value);
              setTree((tree) => {
                const newTree = { ...tree };
                delete newTree["input"];
                return newTree;
              });
            } else if (e.key === "Escape") {
              setTree((tree) => {
                const newTree = { ...tree };
                delete newTree["input"];
                return newTree;
              });
            }
          }}
        />
      );
      newTree["input"] = inpEle;
      return newTree;
    });

    async function createNewFile(name) {
      const newFileHandle = await currDir.getFileHandle(name, { create: true });
      const file = await newFileHandle.getFile();

      setTree((tree) => {
        const newTree = { ...tree };
        newTree[file.name] = "";
        return newTree;
      });
    }
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
