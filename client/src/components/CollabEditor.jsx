import Editor from "@monaco-editor/react";

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

function CollabEditor({ currValue, editorRef }) {
  function handleEditorMount(editor) {
    editorRef.current = editor;
  }

  return (
    <>
      <Editor
        height={"100%"}
        width={"100%"}
        theme="vs-dark"
        onMount={handleEditorMount}
        defaultLanguage={getFileType(currValue.name)}
        path={currValue.name}
        defaultValue={currValue.text}
      />
    </>
  );
}

export default CollabEditor;
