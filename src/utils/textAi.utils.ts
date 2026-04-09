import {SentimentBackgroundColor, Sentiments} from '../enums'
import negative from '../assets/text-sentiment/negative.svg'
import neutral from '../assets/text-sentiment/neutral.svg'
import positive from '../assets/text-sentiment/positive.svg'
import very_negative from '../assets/text-sentiment/very_negative.svg'
import very_positive from '../assets/text-sentiment/very_positive.svg'

export class SentimentColorsUtil {
  static getBackgroundColor = (sentimentScore: Sentiments): string => {
    const sentimentColors = new Map([
      [Sentiments.VERY_NEGATIVE, SentimentBackgroundColor.VERY_NEGATIVE],
      [Sentiments.NEGATIVE, SentimentBackgroundColor.NEGATIVE],
      [Sentiments.VERY_POSITIVE, SentimentBackgroundColor.VERY_POSITIVE],
      [Sentiments.POSITIVE, SentimentBackgroundColor.POSITIVE],
    ])

    return (
      sentimentColors.get(sentimentScore) || SentimentBackgroundColor.NEUTRAL
    )
  }
}

export class TopicTagUtil extends SentimentColorsUtil {
  static getSvgBySentimentScore = (sentimentScore: Sentiments): string => {
    const sentimentSvg = new Map([
      [Sentiments.POSITIVE, positive],
      [Sentiments.VERY_POSITIVE, very_positive],
      [Sentiments.NEGATIVE, negative],
      [Sentiments.VERY_NEGATIVE, very_negative],
      [Sentiments.NEUTRAL, neutral],
      [Sentiments.MIXED, neutral],
      [Sentiments.NO_SENTIMENTS, neutral],
    ])

    return sentimentSvg.get(sentimentScore) || ''
  }

  static getSentimentBackgroundColor = this.getBackgroundColor
}

export const convertSentiment = (sentiment: string): Sentiments => {
  switch (sentiment.toUpperCase()) {
    case 'VERY_POSITIVE':
    case 'STRONG_POSITIVE':
      return Sentiments.VERY_POSITIVE
    case 'POSITIVE':
      return Sentiments.POSITIVE
    case 'NEGATIVE':
      return Sentiments.NEGATIVE
    case 'VERY_NEGATIVE':
    case 'STRONG_NEGATIVE':
      return Sentiments.VERY_NEGATIVE
    case 'NEUTRAL':
      return Sentiments.NEUTRAL
    case 'MIXED':
      return Sentiments.MIXED
    case 'NO_SENTIMENT':
      return Sentiments.NO_SENTIMENTS
    default:
      return Sentiments.NEUTRAL
  }
}
