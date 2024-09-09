import { useSession } from "next-auth/react";
import Login from "./Login";
import styled from "styled-components";
import useSWR from "swr";

const StyledCcreateProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  justify-content: start;
  width: 60vw;
  border: solid 3px white;
  border-radius: 20px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
  gap: 5px;
  align-items: start;
  margin: 10px;
`;
const CreateProfileHeading = styled.h2`
  font-size: 1.5rem;
`;

const CreateProfileSubheading = styled.p`
  padding-inline: 30px;
  text-align: center;
`;

const StyledInfo = styled.p`
  font-size: small;
`;

const CreateProfileButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  scale: 1;
  &:hover {
    background-color: grey;
    transform: scale(1.1);
  }
`;

const StyledInput = styled.input`
  max-width: 150%;
  height: 30px;
  border-radius: 10px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const LoginBoxLogOut = styled.div`
  margin-block: 60px;
`;

export default function CreateProfile() {
  const { mutate } = useSWR(`/api/users/`);

  async function handleProfileSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProfile = Object.fromEntries(formData);
    console.log(newProfile);

    const profileToAdd = {
      owner: newProfile.owner,
      email: [newProfile.email],
      entries: [],
      projection: parseFloat(newProfile.projection),
      impressions: [],
    };

    console.log(profileToAdd);

    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileToAdd),
      });

      if (response.ok) {
        mutate();
        console.log("New Profile Successfully added!");
      } else {
        console.error("Failed to add new profile. Response:", response);
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting the profile-form:",
        error
      );
    }
  }
  const { data: session } = useSession();
  return (
    <StyledCcreateProfilePage>
      <CreateProfileHeading>Welcome to Fit Journay</CreateProfileHeading>
      <CreateProfileSubheading>
        Now that you are logged in. You need to set up your profile. Your
        Profile will show your path from today until the day that your reach
        your goal
      </CreateProfileSubheading>
      <h3>Your Profile</h3>
      <StyledInfo>*Name and E-mail can not be changed</StyledInfo>
      <Form onSubmit={handleProfileSubmit}>
        <InputBox>
          <label htmlFor="owner">Your Name*:</label>
          <StyledInput
            type="text"
            name="owner"
            id="owner"
            defaultValue={session.user.name}
            readOnly
          />
        </InputBox>
        <InputBox>
          <label>E-mail*:</label>
          <StyledInput
            type="text"
            name="email"
            id="email"
            defaultValue={session.user.email}
            readOnly
          />
        </InputBox>
        <InputBox>
          <label>Your Goal</label>
          <StyledInput
            type="number"
            id="projection"
            name="projection"
            step="any"
            placeholder="Enter your goal weight"
          />
        </InputBox>
        <div>
          <CreateProfileButton type="submit">
            Create Profile
          </CreateProfileButton>
        </div>
      </Form>
      <LoginBoxLogOut>
        <Login />
      </LoginBoxLogOut>
    </StyledCcreateProfilePage>
  );
}
