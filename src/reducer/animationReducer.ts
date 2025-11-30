import {type IAnimation, type IAnimationAction} from '../types/IAnimation'

export const initialState: IAnimation = {
  headerAnimation: {id: 'v2', name: 'Slide-Up-Down'},
  contentAnimation: {id: 'v2', name: 'Slide-Up-Down'},
}

export const animationReducer = (
  state: IAnimation,
  action: IAnimationAction,
): IAnimation => {
  switch (action.type) {
    case 'SET_HEADER_ANIMATION':
      return {
        ...state,
        headerAnimation: action.payload,
      }
    case 'SET_CONTENT_ANIMATION':
      return {
        ...state,
        contentAnimation: action.payload,
      }
    default:
      return state
  }
}
