import { useSession } from "next-auth/react";
import Login from "./Login";
import styled from "styled-components";
import useSWR from "swr";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  justify-content: start;
  border: solid 1px white;
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
    <>
      <h2>Welcome to Fit Journay</h2>
      <p>
        Now that you are logged in. You need to set up your profile. Your
        Profile will show your path from today until the day that your reach
        your goal
      </p>
      <h3>Your Profile</h3>
      <p>Name and E-mail can not be changed</p>
      <Form onSubmit={handleProfileSubmit}>
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
        <button type="submit">Create Profile</button>
      </Form>
      <Login />
    </>
  );
}
