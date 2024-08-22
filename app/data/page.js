"use client";

import styled from "styled-components";
import BackButton from "../components/BackButton";

const DataPage = styled.div`
  position: relativ;
`;

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

export default function weightSubmition() {
  return (
    <DataPage>
      <BackButton />
      <h1>Insert Weight</h1>
      <StyledForm>
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
    </DataPage>
  );
}
