import styled from "styled-components";

import Login from "./Login";

const StyledHomePageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function LogInPage() {
  return (
    <>
      <StyledHomePageBody>
        <p>
          Welcome to Your Fit Journey! To access all features and start tracking
          your progress, log in completely free.
        </p>
        <Login />
        <h2>Still not sure if Fit Journey can help you reach your goals? </h2>
        <p>Check out the features and see how Fit Journey can assist you</p>
      </StyledHomePageBody>
    </>
  );
}
