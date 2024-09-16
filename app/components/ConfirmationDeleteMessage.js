import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const DeleteButton = styled(Button)`
  border: solid 10px red:
  background-color: hotpink;
  color: #da0001;
  &:hover {
    background-color: #ffe6e6;
  }
`;

const YesButton = styled(Button)({
  color: "red",
  textAlign: "center",
});

export default function ConfirmationDeleteModal({ handleDelete }) {
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleClickOpen = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleClickClose = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteClickeClose = () => {
    handleDelete();
    setOpenDeleteConfirmation(false);
  };

  return (
    <>
      <DeleteButton variant="outlined" onClick={handleClickOpen}>
        Delete Profile
      </DeleteButton>
      <Dialog open={openDeleteConfirmation} onClose={handleClickClose}>
        <DialogTitle>Do you really want to delete your Profile?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By deleting your profile, you will lose all your entries and your
            data will no longer appear in our database.
          </DialogContentText>
          <DialogActions>
            <YesButton onClick={handleDeleteClickeClose}>
              Yes, I want to delete
            </YesButton>
            <Button onClick={handleClickClose} autoFocus>
              No, I want to keep it
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
