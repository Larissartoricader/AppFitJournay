"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styled, { keyframes } from "styled-components";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141315;
  border-radius: 20px;
  height: 20vh;
  width: 40vw;
  @media screen and (max-width: 780px) {
    width: 90vw;
  }
`;
const borderAnimation = keyframes`
  to {
    transform: translateX(-25%);
  }
`;

const ButtonSignIn = styled.a`
  scale: 1;

  cursor: pointer;
  color: white;
  margin: 0 auto;
  width: 140px;
  white-space: nowrap;
  // position: absolute;
  text-decoration: none;
  font-weight: 500;
  border-radius: 30px;
  overflow: hidden;
  padding: 3px;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 400%;
    height: 100%;
    opacity: 0;
    background: linear-gradient(
      115deg,
      #4fcf70,
      #fad648,
      #a767e5,
      #12bcfe,
      #44ce7b
    );
    background-size: 25% 100%;
    animation: ${borderAnimation} 0.75s linear infinite;
    animation-play-state: paused;
    transform: translateX(-5%);
    transition: transform 0.25s ease-out, opacity 0.175s ease-out;
  }

  &:hover::before {
    opacity: 1;
    animation-play-state: running;
    transition-duration: 0.75s;
    transform: translateX(0%);
  }
`;

const SignInSpan = styled.span`
  position: relative;
  display: block;
  padding: 1rem 1.5rem;
  font-size: 18px;
  background: #000;
  border-radius: 30px;
  height: 100%;
  text-align: center;
`;
const LoginText = styled.p`
  text-align: center;
  margin-inline: 10px;
`;

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <LoginBox>
        <LoginText>
          Hey {session.user.name.split(" ", 1)[0]}, you are signed in
          with:&nbsp;
          {session.user.email}. If you wish to log out:
        </LoginText>

        <ButtonSignIn onClick={() => signOut()}>
          <SignInSpan>Sign out</SignInSpan>
        </ButtonSignIn>
      </LoginBox>
    );
  }

  return (
    <LoginBox>
      <LoginText>Not signed in</LoginText>
      <ButtonSignIn onClick={() => signIn()}>
        <SignInSpan>Sing in</SignInSpan>
      </ButtonSignIn>
    </LoginBox>
  );
}
