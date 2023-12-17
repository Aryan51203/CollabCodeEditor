import { useState } from "react";

function FileTree({ setDefault, setCurrDir }) {
  const [tree, setTree] = useState({});
  const [fileList, setFileList] = useState([]);

  //ONLY OPENS FILES AND NOT FOLDERS
  async function openFolder() {
    const dirHandle = await window.showDirectoryPicker();
    setCurrDir(dirHandle);

    for await (const entry of dirHandle.values()) {
      if (entry.kind !== "file") {
        continue;
      }

      const file = await entry.getFile();
      const fileContent = await file.text();

      setTree((tree) => {
        tree[file.name] = fileContent.trim();
        return tree;
      });
    }
    setFileList(Object.keys(tree));
    setTree(tree);
  }

  function giveResult() {
    console.log(tree);
    console.log(Object.keys(tree));
  }

  return (
    <div>
      <button onClick={openFolder}>OPEN</button>
      <button onClick={giveResult}>RESULT</button>
      <div>
        <FileList tree={tree} setDefault={setDefault} />
      </div>
    </div>
  );
}

function FileList({ tree, setDefault }) {
  return (
    <>
      {Object.keys(tree).map((name) => {
        return (
          <button key={name} onClick={() => setDefault({ name: name, text: tree[name] })}>
            {name}
          </button>
        );
      })}
    </>
  );
}
export default FileTree;
