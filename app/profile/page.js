"use client";

import Link from "next/link";

import { useState } from "react";
import styled from "styled-components";
import BackButton from "../components/BackButton";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

const ProfilePageStyled = styled.div`
  position: relative;
  padding: 20px 10px;
`;

const ProfileNameHeading = styled.h1`
  position: relative;
  margin-top: 50px;
  margin-left: 20px;
  font-size: 2rem;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 80rem;
`;

const Cols = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Col = styled.div`
  width: calc(25% - 2rem);
  margin: 1rem;
  cursor: pointer;
  position: relative;

  @media screen and (max-width: 64rem) {
    width: calc(33.333333% - 2rem);
  }

  @media screen and (max-width: 48rem) {
    width: calc(50% - 2rem);
  }

  @media screen and (max-width: 32rem) {
    width: 100%;
    margin: 0 0 2rem 0;
  }
`;

const Container = styled.div`
  transform-style: preserve-3d;
  perspective: 1000px;
  position: relative;
`;

const Front = styled.div`
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-position: center;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  backface-visibility: hidden;
  text-align: center;
  min-height: 280px;
  height: auto;
  color: #fff;
  font-size: 1.5rem;
  box-shadow: 0 0 10px solid blue;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    opacity: 0.6;
    background-color: #000;
    backface-visibility: hidden;
    border-radius: 10px;
  }
`;

const Back = styled.div`
  background: linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: rotateY(180deg);
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
`;

const Inner = styled.div`
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  outline: 1px solid transparent;
  perspective: inherit;
  z-index: 2;
`;

const FrontText = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;

  &:after {
    content: "";
    width: 4rem;
    height: 2px;
    position: absolute;
    background: #c6d4df;
    display: block;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -0.75rem;
  }
`;

const FrontSpan = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
  }
  &:visited {
    color: inherit;
  }
`;

export default function Profile() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(userId ? `/api/users/${userId}` : null);

  if (isLoading) {
    return <h2>Loading user data...</h2>;
  }

  if (error) {
    return <h1>Oops! Something went wrong while trying to fetch user data.</h1>;
  }

  if (!user) {
    return <h2>No user data available.</h2>;
  }

  return (
    <ProfilePageStyled>
      <BackButton />

      <ProfileNameHeading>Hello, {user.owner}</ProfileNameHeading>

      <Wrapper>
        <Cols>
          {[
            {
              id: 1,
              title: "Data",
              subtitle: "Insert your weight",
              description:
                "Enter your weight every day to get an overview of your progress and to analyze your metabolism. ",
              url: "/profile/data",
              imageUrl:
                "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              id: 2,
              title: "Journay",
              subtitle: "Check out your progress",
              description:
                "Check the high and low points of your journey to have a realistic expectation of your goals. ",
              url: "/profile/journay",
              imageUrl:
                "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              id: 3,
              title: "Projections",
              subtitle: "Estimated success",
              description:
                "See the projections for achieving your goals based on your development to date. ",
              url: "/profile/projections",
              imageUrl:
                "https://plus.unsplash.com/premium_photo-1682310130165-3c648c1e4649?q=80&w=3012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              id: 4,
              title: "Impressions",
              subtitle: "Highs and lows",
              description:
                "Enter your impressions and information that will be added to your journey that goes far beyond the bodily. ",
              url: "/profile/data",
              imageUrl:
                "https://plus.unsplash.com/premium_photo-1661767959390-c0ad35845cce?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((item, index) => (
            <Col
              key={item.id}
              onTouchStart={() => handleMouseEnter(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <StyledLink href={item.url}>
                <Container>
                  <Front
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                      transform:
                        hoveredIndex === index
                          ? "rotateY(-180deg)"
                          : "rotateY(0deg)",
                    }}
                  >
                    <Inner>
                      <FrontText>{item.title}</FrontText>
                      <FrontSpan>{item.subtitle}</FrontSpan>
                    </Inner>
                  </Front>
                  <Back
                    style={{
                      transform:
                        hoveredIndex === index
                          ? "rotateY(0deg)"
                          : "rotateY(180deg)",
                    }}
                  >
                    <Inner>
                      <p>{item.description}</p>
                    </Inner>
                  </Back>
                </Container>
              </StyledLink>
            </Col>
          ))}
        </Cols>
      </Wrapper>
    </ProfilePageStyled>
  );
}
