import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { IconButton } from "@mui/material";

function FileButtons({ handleCreateNewFile, handleCreateNewFolder }) {
  return (
    <>
      <IconButton onClick={handleCreateNewFile}>
        <NoteAddIcon />
      </IconButton>
      <IconButton onClick={handleCreateNewFolder}>
        <CreateNewFolderIcon />
      </IconButton>
    </>
  );
}

export default FileButtons;
