import styled from "styled-components";
import Login from "./Login";
import Link from "next/link";

const StyledLogOutPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledProfileLink = styled(Link)`
  margin-top: 20px;
  background: white;
  padding: 10px;
  border-radius: 20px;
  text-decoration: none;
`;

const LoginBoxLogOut = styled.div`
  position: absolute;
  bottom: 10px;
`;

export default function LogOutPage({ currentUserId, currentUser }) {
  return (
    <>
      <StyledLogOutPage>
        <h2>Hello {currentUser.owner}</h2>
        <StyledProfileLink href={`./profile?userId=${currentUserId}`}>
          Check Your Profile
        </StyledProfileLink>

        <h2>Do not forget to update your Jornay</h2>

        <LoginBoxLogOut>
          <Login />
        </LoginBoxLogOut>
      </StyledLogOutPage>
    </>
  );
}
