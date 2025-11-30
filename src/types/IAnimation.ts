import type {IOption} from '../components/select/Select'

export interface IAnimation {
  headerAnimation: IOption
  contentAnimation: IOption
}

export type IAnimationAction = {
  type: 'SET_HEADER_ANIMATION' | 'SET_CONTENT_ANIMATION'
  payload: IOption
}
