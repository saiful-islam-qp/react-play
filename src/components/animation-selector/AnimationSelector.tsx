import React from 'react'
import {SelectBox, type IOption} from '../select/Select'
import {useAnimationState} from '../../context/AnimationContext'

const headerAnimationOptions = [
  {id: 'v1', name: 'Scale'},
  {id: 'v2', name: 'Slide-Up-Down'},
  {id: 'v3', name: 'Slide-Left-Right'},
]

const contentAnimationOptions = [
  {id: 'fade-zoom', name: 'Fade-Zoom'},
  {id: 'v1', name: 'Scale'},
  {id: 'v2', name: 'Slide-Up-Down'},
  {id: 'v3', name: 'Slide-Left-Right'},
  {id: 'scale-fade', name: 'Scale-Fade'},
]

export const AnimationSelector: React.FC = () => {
  const {state, dispatch} = useAnimationState()

  const setSelectedHeaderAnimation = (option: IOption) => {
    dispatch({type: 'SET_HEADER_ANIMATION', payload: option})
  }
  const setSelectedContentAnimation = (option: IOption) => {
    dispatch({type: 'SET_CONTENT_ANIMATION', payload: option})
  }

  return (
    <div className="flex items-center wrap gap-4 mt-4">
      <div className="flex items-center gap-4">
        <p className="m-0 font-medium">Header Animation</p>
        <SelectBox
          options={headerAnimationOptions}
          selected={state.headerAnimation}
          setSelected={setSelectedHeaderAnimation}
          width="5rem"
        />
      </div>
      <div className="flex items-center gap-4">
        <p className="m-0 font-medium">Content Animation</p>
        <SelectBox
          options={contentAnimationOptions}
          selected={state.contentAnimation}
          setSelected={setSelectedContentAnimation}
          width="5rem"
        />
      </div>
    </div>
  )
}
