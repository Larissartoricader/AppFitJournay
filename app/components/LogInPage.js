import styled from "styled-components";
import Login from "./Login";
import { a, useSpring, useSprings } from "@react-spring/web";
import { useState } from "react";

const StyledHomePageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 18px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 30vh;
  justify-content: center;
  position: relative;
`;

const AnimatedDiv = styled(a.div)`
  position: absolute;
  max-width: 500px;
  max-height: 500px;
  width: 350px;
  height: 200px;
  cursor: pointer;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  backface-visibility: hidden;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  color: white;

  &.back {
    background-color: var(--secondary-background-color);
    color: white;
  }
`;

const FilterDiv = styled.div`
  background: rgba(196, 183, 183, 0.8);
  opacity: 0.9;
  border-radius: 10px;
`;

const StyledH2 = styled.h2`
  font-size: 2rem;
  margin-bottom: -2px;
`;

export default function LogInPage() {
  const numberOfFeatures = 4;
  const [flipped, set] = useState(Array(numberOfFeatures).fill(true));

  // const springs = flipped.map((flip) =>
  //   useSpring({
  //     opacity: flip ? 1 : 0,
  //     transform: `perspective(600px) rotateX(${flip ? 180 : 0}deg)`,
  //     config: { mass: 5, tension: 500, friction: 80 },
  //   })
  // );

  const springs = useSprings(
    numberOfFeatures,
    flipped.map((flip) => ({
      opacity: flip ? 1 : 0,
      transform: `perspective(600px) rotateX(${flip ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 },
    }))
  );

  const toggleFlip = (index) => {
    set((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const backgroundImages = [
    "url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    "url('https://images.unsplash.com/photo-1522844990619-4951c40f7eda?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    "url('https://plus.unsplash.com/premium_photo-1682310130165-3c648c1e4649?q=80&w=3012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD')",
    "url('https://plus.unsplash.com/premium_photo-1661767959390-c0ad35845cce?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  ];

  return (
    <StyledHomePageBody>
      <p>
        Welcome to Your Fit Journey! To access all features and start tracking
        your progress, log in completely free.
      </p>
      <Login />
      <StyledH2>
        Still not sure if Fit Journey can help you reach your goals?
      </StyledH2>
      <p>Check out the features and see how Fit Journey can assist you:</p>
      {flipped.map((flip, index) => (
        <Container key={index} onClick={() => toggleFlip(index)}>
          <AnimatedDiv
            className="back"
            style={{
              opacity: springs[index].opacity.to((o) => 1 - o),
              transform: springs[index].transform,
            }}
          >
            {index === 0 && (
              <h2>
                {" "}
                Get personalized plans and track your progress every step of the
                way.
              </h2>
            )}
            {index === 1 && (
              <h2>
                No matter where or when, quickly update your weight on a daily
                basis.{" "}
              </h2>
            )}
            {index === 2 && (
              <h2>
                Find out how long it will take you to reach your goal based on
                your journey
              </h2>
            )}
            {index === 3 && (
              <h2>
                Share your high and low points and add your emotions and
                feelings to your journey.{" "}
              </h2>
            )}
          </AnimatedDiv>
          <AnimatedDiv
            className="front"
            style={{
              opacity: springs[index].opacity,
              transform: springs[index].transform,
              rotateX: "180deg",
              backgroundImage: backgroundImages[index],
            }}
          >
            {index === 0 && (
              <>
                <FilterDiv>
                  <h2>Follow Your Path</h2>
                </FilterDiv>
              </>
            )}
            {index === 1 && (
              <FilterDiv>
                <h2>Daily Update</h2>
              </FilterDiv>
            )}
            {index === 2 && (
              <>
                <FilterDiv>
                  <h2>Metabolism Analysis</h2>
                </FilterDiv>
              </>
            )}
            {index === 3 && (
              <FilterDiv>
                <h2>Your impressions matter</h2>
              </FilterDiv>
            )}
          </AnimatedDiv>
        </Container>
      ))}
    </StyledHomePageBody>
  );
}
