import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function ModalWeightEdit({
  nameOfInput,
  valueToBeChanged,
  inputType,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleClickOpen}>✏️</Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your inserted {nameOfInput} is {valueToBeChanged}
          </DialogContentText>
          <form>
            {nameOfInput === "weight" || nameOfInput === "date" ? (
              <>
                <label>Change</label>
                <input type={inputType} defaultValue={valueToBeChanged} />
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Save & Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
