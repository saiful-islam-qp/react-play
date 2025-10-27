import { type IAnimation, type IAnimationAction } from "../types/IAnimation";

export const initialState: IAnimation = {
  headerAnimation: { id: "v2", name: "V2" },
  contentAnimation: { id: "v2", name: "V3. Slide-Up" },
};

export const animationReducer = (
  state: IAnimation,
  action: IAnimationAction
): IAnimation => {
  switch (action.type) {
    case "SET_HEADER_ANIMATION":
      return {
        ...state,
        headerAnimation: action.payload,
      };
    case "SET_CONTENT_ANIMATION":
      return {
        ...state,
        contentAnimation: action.payload,
      };
    default:
      return state;
  }
};
