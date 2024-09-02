// pages/index.js
import styled from "styled-components";
import Login from "./Login";
import { a, useSpring } from "@react-spring/web";
import { useState } from "react";

const StyledHomePageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 50vh;
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

  &.back {
    background-color: #f8b400; /* Cor de fundo para o verso */
    color: white; /* Cor do texto para o verso */
  }

  &.front {
    background-image: url("https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop");
    background-size: cover;
    background-position: center;
    color: white; /* Cor do texto para a frente */
  }
`;

export default function LogInPage() {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <StyledHomePageBody>
      <p>
        Welcome to Your Fit Journey! To access all features and start tracking
        your progress, log in completely free.
      </p>
      <Login />
      <h2>Still not sure if Fit Journey can help you reach your goals?</h2>
      <p>Check out the features and see how Fit Journey can assist you</p>
      <Container onClick={() => set((state) => !state)}>
        <AnimatedDiv
          className="back"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <h2>Join Us Today!</h2>
          <p>Sign up now and start your journey to a healthier you.</p>
        </AnimatedDiv>
        <AnimatedDiv
          className="front"
          style={{
            opacity,
            transform,
            rotateX: "180deg",
          }}
        >
          <h2>Discover Your Path</h2>
          <p>
            Explore our features and see how we can help you achieve your
            fitness goals.
          </p>
        </AnimatedDiv>
      </Container>
    </StyledHomePageBody>
  );
}
