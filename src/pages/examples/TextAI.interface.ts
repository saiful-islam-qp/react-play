import type {Sentiments} from '../../enums'

export interface TextSentimentData {
  surveyId: number
  questionId: number
  answerId: number
  sentimentScore: Sentiments
  count: number
  percentage?: number
}
export interface TextSentimentChartDataModel {
  meta: TextSentimentData[]
  scores: TextSentimentData[]
  overallSentimentScore: number
}

interface IAdvanceWidgetParentTopicChild {
  subTopic: string
  sentiment: string
}

interface IAdvanceWidgetParentTopic {
  parentTopicId: number
  parentTopic: string
  topics: IAdvanceWidgetParentTopicChild[]
}

export interface IAdvanceTextResponseItem {
  textResultId: number
  responseSetId: number
  parentTopics: IAdvanceWidgetParentTopic[]
  tags: string[]
  insights: string[]
  textValue: string
}

export interface SubTopicWithSentiment {
  subTopic: string
  sentiment: Sentiments
}

export interface TopicData {
  topics: string[]
  topic: string
  subTopics: SubTopicWithSentiment[]
  sentimentScore: Sentiments
}
