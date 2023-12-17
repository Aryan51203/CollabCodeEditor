import Editor from "@monaco-editor/react";
import FileSpace from "../components/FileSpace";
import { useState, useRef } from "react";

function Main() {
  const [defaultMonaco, setDefault] = useState({});
  const editorRef = useRef(null);
  const [currDir, setCurrDir] = useState("");

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     event.preventDefault();
  //     const code = event.which || event.keyCode;
  //     let charCode = String.fromCharCode(code).toLowerCase();
  //     if ((event.ctrlKey || event.metaKey) && charCode === "s") {
  //       handleSaveCurrentFile();
  //     }
  //   };

  //   document.getElementById("editorMonaco").addEventListener("keydown", handleKeyDown);

  //   return () => document.getElementById("editorMonaco").removeEventListener("keydown", handleKeyDown);
  // }, []);

  async function handleSaveCurrentFile() {
    const fileHandle = await currDir.getFileHandle(defaultMonaco.name, { create: false });
    const writable = await fileHandle.createWritable();

    const contents = getEditorValue();
    console.log(contents);
    await writable.write(contents);
    await writable.close();
    alert("SAVEDD");
  }

  function getFileType(name) {
    if (name == null) {
      return "javascript";
    }
    const fileArray = name.split(".");
    const extType = fileArray[fileArray.length - 1];

    if (extType === "js") {
      return "javascript";
    } else if (extType === "txt") {
      return "text";
    } else {
      return extType;
    }
  }

  function handleEditorMount(editor) {
    editorRef.current = editor;
  }

  function getEditorValue() {
    return editorRef.current.getValue();
  }

  return (
    <div id="App">
      <div id="sidebarLeft">
        <div id="FileSpace">
          <FileSpace setDefault={setDefault} currDir={currDir} setCurrDir={setCurrDir} />
        </div>

        <div id="ActiveMembers">
          <button
            onClick={() => {
              handleSaveCurrentFile();
            }}
          >
            SAVE
          </button>
          ACTIVE MEMBERS Coming Soon
        </div>
      </div>

      <div id="rightSide">
        <div id="editorMonaco">
          <Editor
            height={"100%"}
            width={"100%"}
            theme="vs-dark"
            onMount={handleEditorMount}
            defaultLanguage={getFileType(defaultMonaco.name)}
            path={defaultMonaco.name}
            defaultValue={defaultMonaco.text}
          />
        </div>

        <div id="terminalBottom">TERMINAL SPACE Coming Soon</div>
      </div>
    </div>
  );
}

export default Main;
