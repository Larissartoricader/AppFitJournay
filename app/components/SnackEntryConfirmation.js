import Snackbar from "@mui/material/Snackbar";
import styled from "styled-components";

const StyledSnackbar = styled(Snackbar)`
  color: black;
  background-color: green;
`;

export default function SnackEntryConfirmation({ open, handleClose }) {
  return (
    <div>
      <StyledSnackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Entry inserted"
      />
    </div>
  );
}
