import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function ModalEditForm({
  nameOfInput,
  valueToBeChanged,
  inputType,
  userId,
  entryId,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  async function handleEditSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedEntryValue = Object.fromEntries(formData);
    console.log(updatedEntryValue);

    // const { nameOfInput } = updatedEntryValue;

    if (!entryId) {
      console.error("Entry ID is missing.");
      return;
    }

    const updatedData = {
      [nameOfInput]: updatedEntryValue[nameOfInput],
    };

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ entryId, updatedData }),
      });

      if (response.ok) {
        console.log(`The ${nameOfInput} was successfully updated`);
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Failed to update entry:", error);
      }
    } catch (error) {
      console.error("An error occurred while updating the entry:", error);
    }
  }
  return (
    <>
      <Button onClick={handleClickOpen}>✏️</Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your inserted {nameOfInput} is {valueToBeChanged}
          </DialogContentText>
          <form onSubmit={handleEditSubmit}>
            {nameOfInput === "weight" || nameOfInput === "date" ? (
              <>
                <label htmlFor={nameOfInput}>Change</label>
                <input
                  type={inputType}
                  defaultValue={valueToBeChanged}
                  name={nameOfInput}
                  id={nameOfInput}
                  step="any"
                />
              </>
            ) : (
              <>
                <p>Felling</p>
                <div>
                  <input type="radio" id="happy" name="feeling" value="happy" />
                  <label htmlFor="happy">😃 Happy</label>

                  <input
                    type="radio"
                    id="unhappy"
                    name="feeling"
                    value="unhappy"
                  />
                  <label htmlFor="unhappy">🙁 Unhappy</label>

                  <input
                    type="radio"
                    id="joyful"
                    name="feeling"
                    value="joyfuly"
                  />
                  <label htmlFor="joyful">🥳 Joyful</label>

                  <input
                    type="radio"
                    id="content"
                    name="feeling"
                    value="content"
                  />
                  <label htmlFor="content">🙂 Content</label>

                  <input
                    type="radio"
                    id="indifferent"
                    name="feeling"
                    value="indifferent"
                  />
                  <label htmlFor="indifferent">😶 Indifferent</label>

                  <input
                    type="radio"
                    id="anxious"
                    name="feeling"
                    value="anxious"
                  />
                  <label htmlFor="anxious">😓 Anxious</label>

                  <input type="radio" id="sad" name="feeling" value="sad" />
                  <label htmlFor="sad">😢 Sad</label>

                  <input
                    type="radio"
                    id="frustrated"
                    name="feeling"
                    value="frustrated"
                  />
                  <label htmlFor="frustrated">🙄 Frustrated</label>
                </div>
              </>
            )}
            <DialogActions>
              <Button onClick={handleClickClose} type="submit">
                Save & Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
