import { useEffect, useState } from 'react';
import variables from './useAnimatedMount.module.scss';

export const animatedStates = {
  onMount: `onMount`,
  onEnter: `onEnter`,
  onExit: `onExit`,
  onUnmount: `onUnmount`,
};

const serializedState = {
  'true,false': animatedStates.onMount,
  'true,true': animatedStates.onEnter,
  'false,true': animatedStates.onExit,
  'false,false': animatedStates.onUnmount,
};

export default function useAnimatedState(state, speed = `normal`) {
  const _speed = variables[`speed-${speed}`];
  if (process.env.NODE_ENV !== 'production') {
    if (!_speed) {
      throw new Error(`${speed} is not a valid animation speed`);
    }
  }

  // I wish i can use better names, but they work together independently to make up 4 states
  const [state1, setS1] = useState(state);
  const [state2, setS2] = useState(state);

  useEffect(() => {
    let timeout, frame;
    if (state) {
      setS1(true); // [true, false] => onMount
      timeout = window.setTimeout(() => {
        frame = window.requestAnimationFrame(() => {
          setS2(true); // [true, true] => onEnter
        });
      }, 10);
      return () => {
        window.clearTimeout(timeout);
        window.cancelAnimationFrame(frame);
      };
    } else {
      frame = window.requestAnimationFrame(() => {
        setS1(false); // [false, true] => onExit
        timeout = window.setTimeout(() => {
          setS2(false); // [false, false] => onUnmount
        }, _speed);
      });
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timeout);
      };
    }
  }, [state, _speed]);

  const currentState = serializedState[[state1, state2].join()];
  return {
    isMounted:
      currentState === animatedStates.onMount ||
      currentState === animatedStates.onEnter ||
      currentState === animatedStates.onExit,
    isShown: currentState === animatedStates.onEnter,
    currentState,
  };
}
