import { useSession } from "next-auth/react";
import Login from "./Login";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  justify-content: start;
  border: solid 1px white;
`;

export default function CreateProfile() {
  const { data: session } = useSession();
  return (
    <>
      <h2>Welcome to Fit Journay</h2>
      <p>
        Now that you are logged in. You need to set up your profile. Your
        Profile will show your path from today until the day that your reach
        your goal
      </p>
      <h3>Your Profile</h3>
      <p>Name and E-mail can not be changed</p>
      <Form>
        <div>
          <label htmlFor="owner">Your Name:</label>
          <input
            type="text"
            name="owner"
            id="owner"
            defaultValue={session.user.name}
            readOnly
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={session.user.email}
            readOnly
          />
        </div>
        <div>
          <label>Your Goal</label>
          <input type="number" id="projection" name="projection" step="any" />
        </div>
      </Form>
      <Login />
    </>
  );
}
