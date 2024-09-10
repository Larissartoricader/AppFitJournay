import styled from "styled-components";
import useSWR from "swr";
import { uid } from "uid";

import ModalEditForm from "./ModalEditForm";

const StyledForm = styled.form`
  border: solid 2px white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 50%;

  @media (max-width: 768px) {
    width: 90%;
    margin: 5px 20px;
  }
`;
const StyledInput = styled.input`
  width: 40%;
`;

const FeelingsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Feelling = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitSpan2 = styled.span`
  color: white;
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-50%);
  height: 14px;
  line-height: 13px;
`;

const SubmitButton = styled.button`
  scale: 0.7;
  // position: absolute;
  overflow: hidden;
  border: 1px solid #18181a;
  color: #18181a;
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  line-height: 15px;
  padding: 19px 18px 19px;
  width: 140px;
  text-decoration: none;
  cursor: pointer;
  background: #fff;
  border-radius: 30px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &::after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #8f44fd;
    transform-origin: bottom center;
    transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
    transform: skewY(9.3deg) scaleY(0);
    z-index: 50;
  }
  &:hover&::after {
    transform-origin: bottom center;
    transform: skewY(9.3deg) scaleY(2);
  }

  &:hover ${SubmitSpan2} {
    transform: translateX(-50%) translateY(-50%);
    opacity: 1;
    transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
  }
`;

const SubmitSpan1 = styled.span`
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
`;
const EntryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 35px;
  border-radius: 10px;
  padding-inline: 30px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 512px) {
    padding-inline: 20px;
  }
`;

const EntryList = styled.div`
  background: linear-gradient(115deg, #e0e0e0, #ffffff);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease-in-out;

  border: solid 2px white;
  border-radius: 10px;
  padding: 30px 10px;
  position: relative;
  &:hover {
    box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.5);
`;

const EntryBox = styled.div`
  display: flex;
  color: black;
  font-weight: bold;
`;

const EntryDeleteButton = styled.button`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -13px;
  top: -13px;
  transition: transform 900ms cubic-bezier(0.48, 0, 0.12, 1),
    box-shadow 900ms cubic-bezier(0.48, 0, 0.12, 1);
  &:hover {
    transform: scale(1.3);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 5);
  }
`;

export default function WeightForm({ user, userId }) {
  const { mutate } = useSWR(`/api/users/${userId}`);

  const entriesHistory = user.entries;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newWeightEntry = Object.fromEntries(formData);
    console.log(newWeightEntry);

    const entryToAdd = {
      id: uid(),
      date: new Date(newWeightEntry.date).toISOString(),
      weight: parseFloat(newWeightEntry.weight),
      feeling: newWeightEntry.feeling,
    };

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryToAdd),
      });

      if (response.ok) {
        mutate();
        console.log("Entry successfully added!");
      } else {
        console.error("Failed to add entry. Response:", response);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  }

  async function handleDelete(entryId) {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: entryId }),
    });
    if (response.ok) {
      console.log("Entry deleted successfully!");
      window.location.reload();
    } else {
      const error = await response.json();
      console.error("Failed to delete entry:", error);
    }
  }

  return (
    <>
      <h2>Form</h2>

      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <StyledInput type="date" id="date" name="date" />
        <label htmlFor="weight">Weight</label>
        <StyledInput type="number" id="weight" name="weight" step="any" />
        <p>Felling</p>
        <FeelingsBox>
          <Feelling>
            <input type="radio" id="happy" name="feeling" value="happy" />
            <label htmlFor="happy">😃 Happy</label>
          </Feelling>
          <Feelling>
            <input type="radio" id="unhappy" name="feeling" value="unhappy" />
            <label htmlFor="unhappy">🙁 Unhappy</label>
          </Feelling>
          <Feelling>
            <input type="radio" id="joyful" name="feeling" value="joyfuly" />
            <label htmlFor="joyful">🥳 Joyful</label>
          </Feelling>
          <Feelling>
            <input type="radio" id="content" name="feeling" value="content" />
            <label htmlFor="content">🙂 Content</label>
          </Feelling>
          <Feelling>
            <input
              type="radio"
              id="indifferent"
              name="feeling"
              value="indifferent"
            />
            <label htmlFor="indifferent">😶 Indifferent</label>
          </Feelling>
          <Feelling>
            <input type="radio" id="anxious" name="feeling" value="anxious" />
            <label htmlFor="anxious">😓 Anxious</label>
          </Feelling>
          <Feelling>
            <input type="radio" id="sad" name="feeling" value="sad" />
            <label htmlFor="sad">😢 Sad</label>
          </Feelling>
          <Feelling>
            <input
              type="radio"
              id="frustrated"
              name="feeling"
              value="frustrated"
            />
            <label htmlFor="frustrated">🙄 Frustrated</label>
          </Feelling>
        </FeelingsBox>

        <SubmitButton>
          <SubmitSpan1 type="submit">Submit</SubmitSpan1>
          <SubmitSpan2>Done</SubmitSpan2>
        </SubmitButton>
      </StyledForm>
      <div>
        {entriesHistory.length === 0 ? (
          <h3>
            You have not entered any information yet. Enter your current weight,
            the date and how you are feeling.
          </h3>
        ) : (
          <>
            <h3>Entries History</h3>
            <p>All Weight Data inserted by you</p>
          </>
        )}
        <EntryContainer>
          {entriesHistory.map((entry) => (
            <EntryList key={entry.id}>
              <EntryDeleteButton onClick={() => handleDelete(entry.id)}>
                ❌
              </EntryDeleteButton>

              <EntryBox>
                Weight: {entry.weight}
                <ModalEditForm
                  nameOfInput={"weight"}
                  valueToBeChanged={entry.weight}
                  inputType={"Number"}
                  userId={userId}
                  entryId={entry.id}
                />
              </EntryBox>

              <EntryBox>
                date: {entry.date.split("T")[0]}
                <ModalEditForm
                  nameOfInput={"date"}
                  valueToBeChanged={entry.date.split("T")[0]}
                  inputType={"date"}
                  userId={userId}
                  entryId={entry.id}
                />
              </EntryBox>
              <EntryBox>
                You felt: {entry.feeling}
                <ModalEditForm
                  nameOfInput={"feeling"}
                  valueToBeChanged={entry.feeling}
                  inputType={"radio"}
                  userId={userId}
                  entryId={entry.id}
                />
              </EntryBox>
            </EntryList>
          ))}
        </EntryContainer>
      </div>
    </>
  );
}
