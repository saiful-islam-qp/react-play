import { createContext, useContext, type Dispatch } from "react";
import type { IAnimation, IAnimationAction } from "../types/IAnimation";

// Create the context types
type AnimationContextType = {
  state: IAnimation;
  dispatch: Dispatch<IAnimationAction>;
};

// Create the context
export const AnimationStateContext = createContext<AnimationContextType | null>(
  null
);

// Custom hook to use the global state
export const useAnimationState = (): AnimationContextType => {
  const context = useContext(AnimationStateContext);
  if (!context) {
    throw new Error(
      "useAnimationState must be used within a AnimationContextProvider"
    );
  }
  return context;
};
