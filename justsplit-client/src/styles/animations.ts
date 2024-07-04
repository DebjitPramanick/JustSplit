import { css, keyframes } from 'styled-components';

const zoomKf = (from = 0.8, to = 1) => keyframes`
from  {
  transform: scale(${from});
}
to {
  transform: scale(${to});
}
`;

const fadeKf = (from, to) => keyframes`
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

const slideInBottomKf = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0px);
  }
`;

const typingWaveKf = keyframes`
  0% {
    transform: translateY(0px);

  }
  30% {
    transform: translateY(-5px);

  }
  50% {
    transform: translateY(0px);
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

const rippleKf = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
`;

const rotate360Kf = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const fadeIn = (ms = 200, timerFn = 'ease-in-out') => css`
  animation: ${fadeKf(0, 1)} ${ms}ms ${timerFn};
`;

export const fadeOut = (ms = 200, timerFn = 'ease-in-out') => css`
  animation: ${fadeKf(1, 0)} ${ms}ms ${timerFn};
`;

export const slideInTop = (ms = 200, timerFn = 'ease-in-out') => css`
  animation: ${slideInTopKf} ${ms}ms ${timerFn};
`;

export const slideInBottom = (ms = 200, timerFn = 'ease-in-out') => css`
  animation: ${slideInBottomKf} ${ms}ms ${timerFn};
`;

export const typingWave = (ms = 1800, timerFn = 'ease-in-out') => css`
  animation: ${typingWaveKf} ${ms}ms infinite ${timerFn};
  &:nth-child(1) {
    animation-delay: 200ms;
  }
  &:nth-child(2) {
    animation-delay: 300ms;
  }
  &:nth-child(3) {
    animation-delay: 400ms;
  }
`;

export const zoomIn = (ms = 200, timerFn = 'ease-in-out') => css`
  animation: ${zoomKf(0.8, 1)} ${ms}ms ${timerFn};
`;

export const spin = (ms = 200, timerFn = 'ease-in-out', iterations = 'infinite') => css`
  animation: ${spinKf} ${ms}ms ${timerFn} ${iterations};
`;

export const ripple = (ms = 1500, timerFn = 'ease-in-out') => css`
  animation: ${rippleKf} ${ms}ms infinite ${timerFn};
`;

export const rotate360 = (ms = 1500, timerFn = 'ease-in-out') => css`
  animation: ${rotate360Kf} ${ms}ms infinite ${timerFn};
`;
