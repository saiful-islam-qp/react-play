import {
  WuDrilldown,
  type IWuDrilldownAnimationVariant,
  type IWuDrilldownContext,
  type IWuDrilldownItem,
} from '@npm-questionpro/wick-ui-lib'
import {RightSideBar} from '../../components/sidebar/RightSidebar'
import EChartBarPercentage from '../../components/charts/EChartBarPercentage'
import {type JSX, type ReactElement} from 'react'
import styles from './TextAI.module.css'
import {convertSentiment, TopicTagUtil} from '../../utils/textAi.utils'
import type {
  IAdvanceTextResponseItem,
  SubTopicWithSentiment,
  TopicData,
} from './TextAI.interface'

// ── DrilldownDemo (generic) ───────────────────────────────────────────────────

interface DemoProps {
  variant?: IWuDrilldownAnimationVariant
  mode?: 'popLayout' | 'wait'
  dir?: 'ltr' | 'rtl'
  items: Record<`LEVEL_${number}`, IWuDrilldownItem>
}

const DrilldownDemo = ({
  variant = 'default',
  mode = 'popLayout',
  dir = 'ltr',
  items,
}: DemoProps) => (
  <div className="h-[400px] border rounded-lg bg-white overflow-hidden border-gray-200">
    <WuDrilldown
      initial="LEVEL_1"
      baseTitle={{id: 'LEVEL_1', title: 'Sentiment analysis by themes'}}
      headerClasses="bg-gray-50 border-b-2 px-4 flex items-center"
      offsetHeight={42}
      variant={variant}
      mode={mode}
      dir={dir}
      items={items}
    />
  </div>
)

// ── Page sections ─────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'sentiment-analysis',
    tag: 'Sentiment analysis',
    title: 'Sentiment analysis',
    description:
      'Navigate to the next level through the drilldown and analyze sentiment in text (All the responses are dummy data)',
    component: (
      <DrilldownDemo
        items={{
          LEVEL_1: {
            component: (ctx: IWuDrilldownContext) => (
              <SentimentAnalysis {...ctx} />
            ),
          },
          LEVEL_2: {
            component: () => <ResponseAnalysis />,
          },
        }}
      />
    ),
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

const TextAiExample = () => {
  return (
    <div
      className="min-h-screen"
      style={{backgroundColor: 'var(--main-bg-color)'}}
    >
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 px-4 sm:px-6 lg:px-8 py-16">
        {/* Main content */}
        <div className="lg:col-span-6">
          {/* Page header */}
          <div className="mb-12">
            <h1
              className="text-4xl font-bold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Text AI Example
            </h1>
            <p
              className="text-lg leading-relaxed max-w-xl"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Text AI in QuestionPro refers to automated text analysis software
              and PathosAI that analyzes qualitative, open-ended survey
              responses to identify themes, sentiment, and patterns.
            </p>
          </div>

          {/* Sections */}
          <div>
            {sections.map((section, i) => (
              <article
                key={section.id}
                id={section.id}
                className="py-12"
                style={{borderTop: '1px solid var(--border-color)'}}
              >
                {/* Row: number + tag */}
                <div className="flex items-baseline justify-between mb-5">
                  <span
                    className="text-5xl font-bold leading-none tabular-nums"
                    style={{color: 'var(--border-color)'}}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(100,108,255,0.08)',
                      color: 'var(--highlight-color)',
                    }}
                  >
                    {section.tag}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{color: 'var(--primary-text-color)'}}
                >
                  {section.title}
                </h2>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-8 max-w-xl"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  {section.description}
                </p>
                <div className="max-w-xl">{section.component}</div>
              </article>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <RightSideBar
            hashLinks={sections.map(s => ({
              href: `#${s.id}`,
              name: s.title,
            }))}
          />
        </div>
      </div>
    </div>
  )
}

function SentimentAnalysis({goNext}: IWuDrilldownContext): JSX.Element {
  return (
    <div className="h-full bg-white flex flex-col">
      <h2 className="text-sm font-medium bg-gray-50 border-b px-4 py-3 flex items-center">
        Sentiment analysis by themes
      </h2>
      <div className="flex-1 p-4">
        <EChartBarPercentage
          handler={data => goNext('LEVEL_2', {id: 'LEVEL_2', title: data})}
        />
      </div>
    </div>
  )
}

function ResponseAnalysis(): JSX.Element {
  const {response} = responseData

  const formatTextBlock = (
    response: IAdvanceTextResponseItem,
  ): {
    text: string
    topicData: TopicData[]
  } => {
    if (!response?.parentTopics) {
      return {
        text: response?.textValue || '',
        topicData: [],
      }
    }

    // Format parentTopics with their topics (formerly subtopics)
    const topicData = response.parentTopics.map(parentTopic => ({
      topic: parentTopic.parentTopic,
      topics: [parentTopic.parentTopic],
      subTopics: parentTopic.topics.map(topic => ({
        subTopic: topic.subTopic,
        sentiment: convertSentiment(topic.sentiment),
      })),
      sentimentScore: convertSentiment(
        parentTopic.topics[0]?.sentiment || 'NEUTRAL',
      ),
    }))

    return {
      text: response.textValue,
      topicData,
    }
  }

  const renderTextBlocks = (
    <>
      {response.data.data?.map((response: IAdvanceTextResponseItem) => {
        const formattedData = formatTextBlock(response)
        return (
          <AdvanceTextBlock
            key={response.textResultId}
            text={formattedData.text}
            topicData={formattedData.topicData}
          />
        )
      })}
    </>
  )

  return (
    <div className="h-full bg-white">
      <div className={styles.wrapper}>
        {/* <div className={styles.headerWrapper}>
          <div className="font-medium text-sm">Responses</div>
        </div> */}
        <div className={styles.textBlocksWrapper}>{renderTextBlocks}</div>
      </div>
    </div>
  )
}

interface IAdvanceTextBlockProps {
  text: string
  topicData: TopicData[]
  isAdvanceWidget?: boolean
}

function AdvanceTextBlock({
  text,
  topicData,
}: IAdvanceTextBlockProps): JSX.Element {
  return (
    <div className={styles.textBlockWrapper}>
      <div dangerouslySetInnerHTML={{__html: text}} />
      <div className={styles.topicWrapper}>
        {topicData.map((data, index) => (
          <AdvanceTopicTag data={data} key={index} />
        ))}
      </div>
    </div>
  )
}

interface IAdvanceTopicTagProps {
  data: TopicData
  isAdvanceWidget?: boolean
}

function AdvanceTopicTag({data}: IAdvanceTopicTagProps): JSX.Element {
  const renderAdvanceTopics = (
    <div className={styles.topicWrapper}>
      <div className={styles.topicTextWrapper}>
        {data.topics.map((topic, index) => (
          <div key={index} className={styles.topicText}>
            <span className={styles.topicLabel}>{'topic'} : </span>
            {topic}
          </div>
        ))}
      </div>
    </div>
  )

  const renderAdvanceSubtopics = data?.subTopics && (
    <AdvanceSubtopicTag subtopics={data.subTopics} />
  )

  return (
    <div>
      {renderAdvanceTopics}
      {renderAdvanceSubtopics}
    </div>
  )
}

interface IAdvanceSubtopicTagProps {
  subtopics: SubTopicWithSentiment[]
}

function AdvanceSubtopicTag({subtopics}: IAdvanceSubtopicTagProps) {
  if (!subtopics || subtopics.length === 0) return null

  const renderSubtopic = (
    subtopic: SubTopicWithSentiment,
    index: number,
  ): ReactElement => {
    return (
      <div
        key={index}
        className={styles.subtopicWrapperWithSentiment}
        style={{
          backgroundColor: TopicTagUtil.getSentimentBackgroundColor(
            subtopic.sentiment,
          ),
        }}
      >
        <div className={styles.iconWrapper}>
          <img
            src={TopicTagUtil.getSvgBySentimentScore(subtopic.sentiment)}
            alt=""
          />
        </div>
        <div className={styles.subtopicText}>
          {subtopic.subTopic || 'untitled'}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.subtopicContainer}>
      <div className={styles.subtopicsRow}>
        <span className={styles.subtopicLabel}>{'subTopic'} :</span>
        <div className={styles.subtopicsWrapper}>
          {subtopics.map((subtopic, index) => renderSubtopic(subtopic, index))}
        </div>
      </div>
    </div>
  )
}

export default TextAiExample

const responseData = {
  response: {
    data: {
      data: [
        {
          textResultId: 8725,
          responseSetId: 1645,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Maintainability and Testability',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'maintainability',
            'code',
            'concern',
            'testability',
            'traceable',
            'runtime',
            'reference',
            'issue',
            'stability',
            'poor',
          ],
          insights: [
            'Using a specialized library improves code readability, reduces boilerplate, and makes future updates easier—especially in long-term projects. This reflects an awareness of software engineering best practices beyond basic syntax.',
          ],
          textValue: 'Consider using a library like date-fns or moment.js.',
        },
        {
          textResultId: 8617,
          responseSetId: 1618,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'JavaScript Legacy Code Modernization',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'modernization',
            'modern',
            'refactoring',
            'dom',
            'event',
            'legacy',
            'javascript',
            'needed',
            'manipulation',
            'changes',
          ],
          insights: [
            'The respondent is requesting a modernization of the JavaScript codebase to adopt ES6+ syntax. This indicates a need for improved code readability, maintainability, and developer experience. Recommend migrating all arrow functions, template literals, destructuring, and classes to ES6+ standards.',
          ],
          textValue: 'Can you update this to ES6?',
        },
        {
          textResultId: 8605,
          responseSetId: 1615,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'JavaScript Legacy Code Modernization',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'modernization',
            'modern',
            'refactoring',
            'dom',
            'event',
            'legacy',
            'javascript',
            'needed',
            'manipulation',
            'changes',
          ],
          insights: [
            'To maintain compatibility and performance, adopt modern DOM manipulation techniques such as `innerHTML` or `document.createElement` to dynamically insert content instead of relying on outdated methods.',
          ],
          textValue: '`document.write` is bad practice.',
        },
        {
          textResultId: 8593,
          responseSetId: 1612,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Maintainability and Testability',
                  sentiment: 'POSITIVE',
                },
                {
                  subTopic: 'Security Vulnerability and Risk Management',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'maintainability',
            'code',
            'concern',
            'testability',
            'traceable',
            'runtime',
            'reference',
            'issue',
            'stability',
            'poor',
            'vulnerability',
            'security',
            'risk',
            'xss',
            'injection',
            'sql',
            'coercion',
            'type',
            'denial',
            'credential',
          ],
          insights: [
            'Improving code maintainability through dependency injection ensures that changes to one part of the system do not cascade widely. It supports long-term scalability and reduces technical debt, especially in larger applications.',
            'Introduce dependency injection to enhance modularity, testability, and maintainability of JavaScript code. This allows components to receive dependencies (like services or utilities) via constructor or function parameters, reducing hard-coded references and enabling easier unit testing and configuration.',
          ],
          textValue: 'Try to use dependency injection.',
        },
        {
          textResultId: 8553,
          responseSetId: 1602,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Efficiency and Conciseness Optimization',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'duplication',
            'conciseness',
            'opportunity',
            'improvement',
            'javascript',
            'code',
            'parsing',
            'json',
            'boilerplate',
            'improvements',
          ],
          insights: [
            'Provide concrete refactor options: replace complex inline regex with named groups or helper functions, add unit tests for edge cases, and check for catastrophic backtracking. Deliver a small code patch showing the refactor and test cases to demonstrate correctness and performance.',
          ],
          textValue:
            'Can you add a comment explaining this regular expression?',
        },
        {
          textResultId: 8357,
          responseSetId: 1553,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Efficiency and Conciseness Optimization',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'duplication',
            'conciseness',
            'opportunity',
            'improvement',
            'javascript',
            'code',
            'parsing',
            'json',
            'boilerplate',
            'improvements',
          ],
          insights: [
            'Replace the explicit loop with Array.filter to simplify logic and improve readability; add unit tests covering edge cases and run a micro-benchmark on representative datasets to confirm performance and memory impact before deployment.',
          ],
          textValue: 'Use `Array.filter` instead of this loop.',
        },
        {
          textResultId: 8325,
          responseSetId: 1545,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Efficiency and Technical Debt Management',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'concern',
            'technical',
            'concerns',
            'debt',
            'latency',
            'overhead',
            'maintenance',
            'reduction',
            'efficiency',
            'savings',
          ],
          insights: [
            'If the value changes in the future (e.g., due to time zone adjustments or system updates), having a named constant allows centralized updates without hunting through the codebase.',
          ],
          textValue: 'What does `86400` mean? Make it a constant.',
        },
        {
          textResultId: 8321,
          responseSetId: 1544,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Efficiency Analysis',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'efficiency',
            'code',
            'development',
            'memory',
            'statement',
            'switch',
            'inefficiency',
            'question',
            'structure',
            'python',
          ],
          insights: [
            'When constants are documented and named descriptively, team members can collaborate more effectively without needing to guess or reverse-engineer values.',
          ],
          textValue:
            'This is a magic number. Store it in a constant with a descriptive name.',
        },
        {
          textResultId: 8317,
          responseSetId: 1543,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'JavaScript Legacy Code Modernization',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'modernization',
            'modern',
            'refactoring',
            'dom',
            'event',
            'legacy',
            'javascript',
            'needed',
            'manipulation',
            'changes',
          ],
          insights: [
            'Recommendation to replace `innerHTML` with `textContent` in DOM manipulation to prevent XSS vulnerabilities and improve security. This aligns with best practices in client-side JavaScript development.',
          ],
          textValue: 'Use `textContent` instead of `innerHTML`.',
        },
        {
          textResultId: 8209,
          responseSetId: 1516,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Efficiency Analysis',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'efficiency',
            'code',
            'development',
            'memory',
            'statement',
            'switch',
            'inefficiency',
            'question',
            'structure',
            'python',
          ],
          insights: [
            'The respondent suggests using a switch statement as an improvement over conditional logic, which can enhance code readability and maintainability in JavaScript. This indicates a need for better control flow patterns in the codebase.',
          ],
          textValue: 'Consider using a `switch` statement.',
        },
        {
          textResultId: 8161,
          responseSetId: 1504,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Maintainability and Testability',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'maintainability',
            'code',
            'concern',
            'testability',
            'traceable',
            'runtime',
            'reference',
            'issue',
            'stability',
            'poor',
          ],
          insights: [
            'Improving naming conventions directly supports long-term code maintainability, making it easier for developers to understand and modify logic—especially in team environments or over time.',
          ],
          textValue: 'Please use clearer variable names.',
        },
        {
          textResultId: 8137,
          responseSetId: 1498,
          parentTopics: [
            {
              parentTopicId: 3079,
              parentTopic: 'Code Efficiency and Maintainability Analysis',
              topics: [
                {
                  subTopic: 'Code Review Process and Quality Assurance',
                  sentiment: 'POSITIVE',
                },
              ],
            },
          ],
          tags: [
            'review',
            'quality',
            'robustness',
            'cleanliness',
            'code',
            'snippet',
            'production',
            'incompleteness',
            'verbosity',
            'testing',
          ],
          insights: [
            'Improving variable declaration practices enhances overall code maintainability and reduces bugs related to scoping and reassignment.',
          ],
          textValue: 'This `var` should be `let`.',
        },
      ],
      pagerOptions: {
        pagerDto: {
          perPage: 100,
          pageNumber: 1,
        },
        totalCount: 12,
      },
    },
  },
}
