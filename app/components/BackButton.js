"use client";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledBackLink = styled.button`
  background-color: #8f44fd;
  color: white;
  border: none;
  margin: 10px;
  padding: 10px 20px;
  position: fixed;
  right: 10px;
  top: 10px;

  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    background-color: #5a2aa6;
  }
`;

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <StyledBackLink onClick={handleBack}>Back</StyledBackLink>
    </>
  );
}
