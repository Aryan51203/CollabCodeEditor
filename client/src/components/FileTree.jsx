function FileTree({ setDefault, setCurrDir, tree, setTree }) {
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
        const newTree = { ...tree };
        newTree[file.name] = fileContent.trim();
        return newTree;
      });
    }
  }

  return (
    <div>
      <button onClick={openFolder}>OPEN</button>
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
        if (name === "input") {
          return tree[name];
        }

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
