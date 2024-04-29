import FileSpace from "../components/FileSpace";
import { useState, useRef } from "react";
import io from "socket.io-client";
import CollabEditor from "../components/CollabEditor";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);

function Main({ roomId }) {
  const [defaultMonaco, setDefault] = useState({});
  const editorRef = useRef(null);
  const [currDir, setCurrDir] = useState("");

  function getEditorValue() {
    return editorRef.current.getValue();
  }

  async function handleSaveCurrentFile() {
    const fileHandle = await currDir.getFileHandle(defaultMonaco.name, { create: false });
    const writable = await fileHandle.createWritable();

    const contents = getEditorValue();
    await writable.write(contents);
    await writable.close();
    alert("SAVEDD");
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
          <CollabEditor currValue={defaultMonaco} editorRef={editorRef} />
        </div>

        <div id="terminalBottom">TERMINAL SPACE Coming Soon</div>
      </div>
    </div>
  );
}

export default Main;
