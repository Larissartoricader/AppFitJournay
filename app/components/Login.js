"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styled, { keyframes } from "styled-components";

const LoginBox = styled.div`
  background: #141315;
  border-radius: 20px;
  height: 20vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 32rem) {
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

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <LoginBox>
        <div>
          <p>Hey {session.user.name},</p>
          <p>
            Your are signed in with:&nbsp;
            {session.user.email}
          </p>
        </div>
        <ButtonSignIn onClick={() => signOut()}>
          <SignInSpan>Sign out</SignInSpan>
        </ButtonSignIn>
      </LoginBox>
    );
  }

  return (
    <LoginBox>
      <p>Not signed in</p>
      <ButtonSignIn onClick={() => signIn()}>
        <SignInSpan>Sing in</SignInSpan>
      </ButtonSignIn>
    </LoginBox>
  );
}
