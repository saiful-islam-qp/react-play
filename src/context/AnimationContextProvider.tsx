import { AnimationStateContext } from './AnimationContext';
import { useReducer } from 'react';
import { initialState, animationReducer } from '../reducer/animationReducer';

interface IAnimationContextProviderProps {
  children: React.ReactNode;
}

const AnimationContextProvider = ({ children }: IAnimationContextProviderProps) => {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  return (
    <AnimationStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimationStateContext.Provider>
  );
};

export default AnimationContextProvider;
