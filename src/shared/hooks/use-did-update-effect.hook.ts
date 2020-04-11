import { useRef, useEffect } from 'react';

const useDidUpdateEffect = (fn: any, inputs: any) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      fn();
    } else {
      didMount.current = true;
    }
  }, inputs);
};

export default useDidUpdateEffect;
