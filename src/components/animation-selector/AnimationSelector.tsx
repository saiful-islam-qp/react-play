import React from "react";
import { SelectBox, type IOption } from "../select/Select";
import { useAnimationState } from "../../context/AnimationContext";

const headerAnimationOptions = [
  { id: "v1", name: "V1" },
  { id: "v2", name: "V2" },
  { id: "v3", name: "V3" },
];

const contentAnimationOptions = [
  { id: "fade-zoom", name: "V1. Fade-Zoom" },
  { id: "v1", name: "V2. Scale-In-Out" },
  { id: "v2", name: "V3. Slide-Up" },
  { id: "v3", name: "V4. Slide-Left" },
];

export const AnimationSelector: React.FC = () => {
  const { state, dispatch } = useAnimationState();

  const setSelectedHeaderAnimation = (option: IOption) => {
    dispatch({ type: "SET_HEADER_ANIMATION", payload: option });
  };
  const setSelectedContentAnimation = (option: IOption) => {
    dispatch({ type: "SET_CONTENT_ANIMATION", payload: option });
  };

  return (
    <div className="flex items-center wrap gap-4 mb-4">
      <div className="flex items-center gap-4">
        <p className="m-0">Header Animation</p>
        <SelectBox
          options={headerAnimationOptions}
          selected={state.headerAnimation}
          setSelected={setSelectedHeaderAnimation}
          width="5rem"
        />
      </div>
      <div className="flex items-center gap-4">
        <p className="m-0">Content Animation</p>
        <SelectBox
          options={contentAnimationOptions}
          selected={state.contentAnimation}
          setSelected={setSelectedContentAnimation}
          width="5rem"
        />
      </div>
    </div>
  );
};
