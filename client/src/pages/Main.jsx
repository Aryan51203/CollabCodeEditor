import Editor from "@monaco-editor/react";
import FileSpace from "./../components/File";
import { useState, useRef } from "react";

function Main() {
  const [defaultMonaco, setDefault] = useState({});
  const editorRef = useRef(null);

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
    console.log(editorRef.current.getValue());
  }

  return (
    <div id="App">
      <div id="sidebarLeft">
        <div id="FileSpace">
          <FileSpace setDefault={setDefault} />
        </div>

        <div id="ActiveMembers">
          <button
            onClick={() => {
              getEditorValue();
            }}
          >
            CLICK
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
