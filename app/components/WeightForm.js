import styled from "styled-components";
import useSWR from "swr";

const StyledForm = styled.form`
  border: solid 2px white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 50%;
  margin: 10px;

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

export default function WeightForm({ user, userId }) {
  const { mutate } = useSWR(`/api/users/${userId}`);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newWeightEntry = Object.fromEntries(formData);
    console.log(newWeightEntry);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWeightEntry),
      });
      if (response.ok) {
        mutate(); // Re-fetch the user data to reflect the new entry
        console.log("Entry successfully added!");
      } else {
        console.error("Failed to add entry. Response:", response);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  }

  return (
    <>
      <h2>Form</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <StyledInput type="date" id="date" name="date" />
        <label htmlFor="weight">Weight</label>
        <StyledInput type="number" id="weight" name="weight" />
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
    </>
  );
}
