import { createGlobalStyle } from "styled-components";
import { Frank_Ruhl_Libre } from "@next/font/google";
import { Chivo } from "@next/font/google";

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: ["300"],
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["800"],
});

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${frankRuhlLibre.style.fontFamily}, system-ui, sans-serif;
    background-color: #000;
    color: var(--primary-font-color);
  }

  :root {
    --heading-font: ${chivo.style.fontFamily}, system-ui, sans-serif;
    --primary-background-color: #000000;
    --secondary-background-color: #1A1A1A;
    --primary-heading-color: #FFFFFF;
    --secondary-heading-color: #F5F5F5;
    --primary-font-color: #E0E0E0;
    --secondary-font-color: #B3B3B3;
    --primary-button-color: #FF4500;
    --secondary-button-color: #D2691E;
  }
`;
