import { css, keyframes } from "styled-components";

const fadeKf = (from: number, to: number) => keyframes`
  from  {
    opacity: ${from}
  }
  to {
    opacity: ${to}
  }
`;

const slideInTopKf = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideUpKf = (initialY: string, finalY: string) => keyframes`
  from {
    transform: translateY(${initialY});
    opacity: 0;
  }
  to {
    transform: translateY(${finalY});
    opacity: 1;
  }
`;

const slideDownKf = (initialY: string, finalY: string) => keyframes`
  from {
    transform: translateY(${initialY});
    opacity: 1;
  }
  to {
    transform: translateY(${finalY});
    opacity: 0;
  }
`;

const spinKf = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const rippleKf = (maxSize: number) => keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(${maxSize});
  }
`;

export const fadeIn = (ms = 200, timerFn = "ease-in-out") => css`
  animation: ${fadeKf(0, 1)} ${ms}ms ${timerFn};
`;

export const fadeOut = (ms = 200, timerFn = "ease-in-out") => css`
  animation: ${fadeKf(1, 0)} ${ms}ms ${timerFn};
`;

export const slideInTop = (ms = 200, timerFn = "ease-in-out") => css`
  animation: ${slideInTopKf} ${ms}ms ${timerFn};
`;

export const slideUp = (
  ms = 200,
  initialY = "10px",
  finalY = "0px",
  timerFn = "ease-in-out"
) => css`
  animation: ${slideUpKf(initialY, finalY)} ${ms}ms ${timerFn};
`;

export const slideDown = (
  ms = 200,
  initialY = "0px",
  finalY = "10px",
  timerFn = "ease-in-out"
) => css`
  animation: ${slideDownKf(initialY, finalY)} ${ms}ms ${timerFn};
`;

export const spin = (
  ms = 200,
  timerFn = "ease-in-out",
  iterations = "infinite"
) => css`
  animation: ${spinKf} ${ms}ms ${timerFn} ${iterations};
`;

export const ripple = (ms = 1500, timerFn = "ease-in-out", maxSize = 2) => css`
  animation: ${rippleKf(maxSize)} ${ms}ms infinite ${timerFn};
`;
