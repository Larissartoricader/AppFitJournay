"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

export default function Confetti() {
  const [isReady, setIsReady] = useState(false);
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    if (instance) {
      console.log("Confetti instance set successfully:", instance);
      refAnimationInstance.current = instance;
      setIsReady(true); // Definir estado quando a instância estiver pronta
    } else {
      console.log("Confetti instance is null or undefined");
    }
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    if (refAnimationInstance.current) {
      console.log("Confetti shot fired with options:", opts);
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(300 * particleRatio),
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      });
    } else {
      console.log("Confetti instance is not available");
    }
  }, []);

  const fireConfetti = () => {
    if (!isReady) {
      console.log("Confetti instance is not ready yet");
      return;
    }
    console.log("Manual confetti shot fired");
    makeShot(0.5, { spread: 50, startVelocity: 60 });
    makeShot(0.3, { spread: 90 });
    makeShot(0.2, { spread: 120, decay: 0.92, scalar: 1.2 });
    makeShot(0.2, { spread: 150, startVelocity: 30, decay: 0.94, scalar: 1.5 });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isReady) {
        console.log("Automatic confetti effect starting");
        fireConfetti();
      }
    }, 1000); // 1 segundo de atraso

    return () => clearTimeout(delay); // Limpa o timeout ao desmontar
  }, [isReady]);

  return (
    <div>
      <h1>Testing Confetti</h1>
      <button onClick={fireConfetti}>Fire Confetti</button>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1000,
          border: "2px solid red",
        }}
      />
    </div>
  );
}
