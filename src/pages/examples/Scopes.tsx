import {useState} from 'react'
import {
  WuDrilldown,
  type IWuDrilldownAnimationVariant,
  type IWuDrilldownContext,
  type IWuDrilldownItem,
  type IWuDrilldownTitle,
} from '@npm-questionpro/wick-ui-lib'
import {RightSideBar} from '../../components/sidebar/RightSidebar'
import {
  SalesByCategory,
  SalesByProduct,
  SalesByRegion,
} from '../../components/drilldown-motion/MoDrilldownExample'
import clsx from 'clsx'
import type {JSX} from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

type UserType = 'Admin' | 'Manager' | 'User'
type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

interface User {
  id: number
  name: string
  hometown: string
  bloodGroup: BloodGroup
  type: UserType
  email: string
  department: string
  joinedYear: number
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const USERS: User[] = [
  {
    id: 1,
    name: 'Aria Thornton',
    hometown: 'Portland, OR',
    bloodGroup: 'A+',
    type: 'Admin',
    email: 'aria.t@company.com',
    department: 'Engineering',
    joinedYear: 2019,
  },
  {
    id: 2,
    name: 'Marcus Webb',
    hometown: 'Chicago, IL',
    bloodGroup: 'O-',
    type: 'Manager',
    email: 'marcus.w@company.com',
    department: 'Product',
    joinedYear: 2020,
  },
  {
    id: 3,
    name: 'Nadia Osei',
    hometown: 'Accra, GH',
    bloodGroup: 'B+',
    type: 'User',
    email: 'nadia.o@company.com',
    department: 'Design',
    joinedYear: 2021,
  },
  {
    id: 4,
    name: 'Liam Nakamura',
    hometown: 'Tokyo, JP',
    bloodGroup: 'AB+',
    type: 'Manager',
    email: 'liam.n@company.com',
    department: 'Engineering',
    joinedYear: 2018,
  },
  {
    id: 5,
    name: 'Sofia Escobar',
    hometown: 'Bogotá, CO',
    bloodGroup: 'O+',
    type: 'User',
    email: 'sofia.e@company.com',
    department: 'Marketing',
    joinedYear: 2022,
  },
  {
    id: 6,
    name: 'Ethan Müller',
    hometown: 'Berlin, DE',
    bloodGroup: 'A-',
    type: 'Admin',
    email: 'ethan.m@company.com',
    department: 'Engineering',
    joinedYear: 2017,
  },
  {
    id: 7,
    name: 'Priya Sharma',
    hometown: 'Bangalore, IN',
    bloodGroup: 'B-',
    type: 'User',
    email: 'priya.s@company.com',
    department: 'Data',
    joinedYear: 2023,
  },
  {
    id: 8,
    name: 'Jordan Blake',
    hometown: 'Austin, TX',
    bloodGroup: 'AB-',
    type: 'Manager',
    email: 'jordan.b@company.com',
    department: 'Sales',
    joinedYear: 2020,
  },
  {
    id: 9,
    name: 'Camille Dupont',
    hometown: 'Lyon, FR',
    bloodGroup: 'O+',
    type: 'User',
    email: 'camille.d@company.com',
    department: 'Design',
    joinedYear: 2022,
  },
  {
    id: 10,
    name: 'Omar Khalid',
    hometown: 'Dubai, AE',
    bloodGroup: 'A+',
    type: 'User',
    email: 'omar.k@company.com',
    department: 'Product',
    joinedYear: 2021,
  },
  {
    id: 11,
    name: 'Yuki Tanaka',
    hometown: 'Osaka, JP',
    bloodGroup: 'B+',
    type: 'Manager',
    email: 'yuki.t@company.com',
    department: 'Engineering',
    joinedYear: 2019,
  },
  {
    id: 12,
    name: 'Isla Mackenzie',
    hometown: 'Edinburgh, UK',
    bloodGroup: 'O-',
    type: 'User',
    email: 'isla.m@company.com',
    department: 'Marketing',
    joinedYear: 2023,
  },
  {
    id: 13,
    name: 'Rafael Santos',
    hometown: 'São Paulo, BR',
    bloodGroup: 'A+',
    type: 'Admin',
    email: 'rafael.s@company.com',
    department: 'Engineering',
    joinedYear: 2016,
  },
  {
    id: 14,
    name: 'Amara Diallo',
    hometown: 'Dakar, SN',
    bloodGroup: 'AB+',
    type: 'User',
    email: 'amara.d@company.com',
    department: 'Sales',
    joinedYear: 2022,
  },
  {
    id: 15,
    name: 'Chen Wei',
    hometown: 'Shanghai, CN',
    bloodGroup: 'B-',
    type: 'Manager',
    email: 'chen.w@company.com',
    department: 'Data',
    joinedYear: 2020,
  },
]

// ── Style helpers ─────────────────────────────────────────────────────────────

const TYPE_BADGE: Record<UserType, {bg: string; color: string}> = {
  Admin: {bg: 'rgba(99,102,241,0.1)', color: '#6366f1'},
  Manager: {bg: 'rgba(59,130,246,0.1)', color: '#3b82f6'},
  User: {bg: 'rgba(107,114,128,0.1)', color: '#6b7280'},
}

const AVATAR_BG: Record<UserType, string> = {
  Admin: '#6366f1',
  Manager: '#3b82f6',
  User: '#64748b',
}

function initials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// ── UserList ──────────────────────────────────────────────────────────────────

interface UserListProps {
  onSelect: (user: User) => void
}

function UserList({onSelect}: UserListProps): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Column headers */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-4 py-2.5 border-b border-gray-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Member
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Blood
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 w-20 text-right">
          Role
        </span>
      </div>

      {/* List */}
      <ul
        role="list"
        className="flex-1 overflow-y-auto divide-y divide-gray-50"
      >
        {USERS.map(user => (
          <li key={user.id} role="listitem">
            <button
              onClick={() => onSelect(user)}
              className="w-full grid grid-cols-[1fr_auto_auto] gap-x-4 px-4 py-3 text-left items-center hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:bg-gray-50"
            >
              {/* Avatar + Name + Hometown */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{backgroundColor: AVATAR_BG[user.type]}}
                  aria-hidden="true"
                >
                  {initials(user.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.hometown}
                  </p>
                </div>
              </div>

              {/* Blood group */}
              <span className="text-xs font-mono font-medium text-gray-500 w-8 text-center">
                {user.bloodGroup}
              </span>

              {/* Type badge */}
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full w-20 text-center"
                style={{
                  backgroundColor: TYPE_BADGE[user.type].bg,
                  color: TYPE_BADGE[user.type].color,
                }}
              >
                {user.type}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── UserProfile ───────────────────────────────────────────────────────────────

interface UserProfileProps {
  user: User
}

function UserProfile({user}: UserProfileProps): JSX.Element {
  const badge = TYPE_BADGE[user.type]

  const fields: {label: string; value: string}[] = [
    {label: 'Hometown', value: user.hometown},
    {label: 'Blood group', value: user.bloodGroup},
    {label: 'Department', value: user.department},
    {label: 'Member since', value: String(user.joinedYear)},
    {label: 'Email', value: user.email},
  ]

  return (
    <div className="w-full h-full overflow-y-auto bg-white">
      {/* Hero */}
      <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-100">
        <span
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mb-4 ring-4 ring-white shadow-sm"
          style={{backgroundColor: AVATAR_BG[user.type]}}
          aria-hidden="true"
        >
          {initials(user.name)}
        </span>
        <h2 className="text-base font-semibold text-gray-900 mb-1">
          {user.name}
        </h2>
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{backgroundColor: badge.bg, color: badge.color}}
        >
          {user.type}
        </span>
      </div>

      {/* Info grid */}
      <div className="p-4 space-y-1">
        {fields.map(field => (
          <div
            key={field.label}
            className="flex items-center justify-between py-2.5 px-1 border-b border-gray-50 last:border-0"
          >
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              {field.label}
            </span>
            <span className="text-sm text-gray-800 font-medium text-right">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── UserListDemo (stateful drilldown wrapper) ─────────────────────────────────

function UserListDemo(): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <div className="h-[440px] border rounded-lg overflow-hidden border-gray-200">
      <WuDrilldown
        initial="LEVEL_1"
        baseTitle={{id: 'LEVEL_1', title: 'Team members'}}
        headerClasses="bg-gray-50 border-b px-4 h-12 flex items-center"
        offsetHeight={48}
        variant="slideLeft"
        items={{
          LEVEL_1: {
            component: ({goNext}: IWuDrilldownContext) => (
              <UserList
                onSelect={user => {
                  setSelectedUser(user)
                  goNext('LEVEL_2', {id: 'LEVEL_2', title: user.name})
                }}
              />
            ),
          },
          LEVEL_2: {
            component: () =>
              selectedUser ? <UserProfile user={selectedUser} /> : null,
          },
        }}
      />
    </div>
  )
}

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
  <div className="h-[360px] border rounded-lg bg-white overflow-hidden border-gray-200">
    <WuDrilldown
      initial="LEVEL_1"
      baseTitle={{id: 'LEVEL_1', title: 'Sales by region'}}
      headerClasses="bg-gray-50 border-b px-4 h-12 flex items-center"
      offsetHeight={48}
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
    id: 'hierarchical',
    tag: 'Data hierarchies',
    title: 'Hierarchical dataset navigation',
    description:
      'Navigate deeply nested data structures — regions → countries → cities, categories → subcategories → products — without leaving the current view. Each level renders in place as the user steps down the hierarchy.',
    component: (
      <DrilldownDemo
        items={{
          LEVEL_1: {
            component: (ctx: IWuDrilldownContext) => <SalesByRegion {...ctx} />,
          },
          LEVEL_2: {
            component: (ctx: IWuDrilldownContext) => (
              <SalesByCategory {...ctx} />
            ),
          },
          LEVEL_3: {
            component: () => <SalesByProduct />,
          },
        }}
      />
    ),
  },
  {
    id: 'progressive-disclosure',
    tag: 'UX pattern',
    title: 'Progressive disclosure',
    description:
      'Start with a high-level summary and let users pull in more detail on demand. Overview → details → raw metrics. Only the data the user asks for is shown, reducing cognitive load at every step.',
    component: (
      <DrilldownDemo
        items={{
          LEVEL_1: {
            component: ({goNext}: IWuDrilldownContext) => (
              <SalesOverviewCard goNext={goNext} />
            ),
          },
          LEVEL_2: {
            component: ({goNext}: IWuDrilldownContext) => (
              <SalesByRegionalStates goNext={goNext} />
            ),
          },
          LEVEL_3: {
            component: () => <SalesByCountry />,
          },
        }}
      />
    ),
  },
  {
    id: 'inline-transition',
    tag: 'Navigation pattern',
    title: 'Inline navigation, no modals',
    description:
      'Instead of opening a modal or navigating to a new route, keep the user in context. Transitions happen inside the component boundary — the surrounding UI stays stable while the content updates.',
    component: <UserListDemo />,
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

const Scopes = () => {
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
              Scopes
            </h1>
            <p
              className="text-lg leading-relaxed max-w-xl"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Real-world patterns where drilldown navigation adds the most
              value. Each scope maps to a distinct user behaviour and
              interaction model.
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

export default Scopes

// ── Sales demo helpers (progressive disclosure) ───────────────────────────────

const OVERVIEW_STATS = [
  {label: 'Total Revenue', value: '$1.25M', delta: '+8.3%', positive: true},
  {label: 'Total Orders', value: '4,372', delta: '+4.1%', positive: true},
  {label: 'Avg Order Value', value: '$286', delta: '+3.2%', positive: true},
  {
    label: 'Returning Customers',
    value: '38%',
    delta: '+1.8%',
    positive: true,
  },
]

function SalesOverviewCard({
  goNext,
}: {
  goNext: (id: `LEVEL_${number}`, data?: IWuDrilldownTitle) => void
}): JSX.Element {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="px-4 h-14 border-b border-gray-100 flex items-center justify-between">
        <h2 className="leading-3">Revenue Overview</h2>
        <button
          onClick={() =>
            goNext('LEVEL_2', {id: 'LEVEL_2', title: 'Detailed metrics'})
          }
          className="text-sm transition-opacity hover:opacity-70"
          style={{color: 'var(--highlight-color)'}}
        >
          View detailed metrics →
        </button>
      </div>
      {/* Stats list */}
      <ul
        role="list"
        className="flex-1 overflow-y-auto divide-y divide-gray-50"
      >
        {OVERVIEW_STATS.map(stat => (
          <li
            key={stat.label}
            className="flex items-center justify-between px-4 py-3.5"
          >
            <span className="text-sm text-gray-500">{stat.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900 tabular-nums">
                {stat.value}
              </span>
              <span
                className={clsx(
                  'text-xs font-medium tabular-nums',
                  stat.positive ? 'text-emerald-600' : 'text-red-500',
                )}
              >
                {stat.positive ? '▲' : '▼'} {stat.delta}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SalesByRegionalStates({
  goNext,
}: {
  goNext: (id: `LEVEL_${number}`, data?: IWuDrilldownTitle) => void
}): JSX.Element {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3
          className="text-sm font-semibold"
          style={{color: 'var(--primary-text-color)'}}
        >
          Sales by region
        </h3>
        <p
          className="text-xs mt-0.5"
          style={{color: 'var(--secondary-text-color)'}}
        >
          Compared to last month
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <RegionItem
          label="North America"
          value="$420k"
          delta="+4.2%"
          positive
        />
        <RegionItem
          label="Europe"
          value="$310k"
          delta="+2.1%"
          positive
          handler={() => goNext('LEVEL_3', {id: 'LEVEL_3', title: 'Europe'})}
        />
        <RegionItem label="Asia" value="$190k" delta="-1.4%" positive={false} />
        <RegionItem label="Other" value="$85k" delta="+0.8%" positive />
      </div>
    </div>
  )
}

function SalesByCountry(): JSX.Element {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3
          className="text-sm font-semibold"
          style={{color: 'var(--primary-text-color)'}}
        >
          Sales by country
        </h3>
        <p
          className="text-xs mt-0.5"
          style={{color: 'var(--secondary-text-color)'}}
        >
          Compared to last month
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <RegionItem label="Germany" value="$110k" delta="+4.2%" positive />
        <RegionItem label="Netherlands" value="$100k" delta="+2.1%" positive />
        <RegionItem
          label="France"
          value="$90k"
          delta="-1.4%"
          positive={false}
        />
        <RegionItem label="Denmark" value="$85k" delta="+0.8%" positive />
      </div>
    </div>
  )
}

function RegionItem({
  label,
  value,
  delta,
  positive,
  handler,
}: {
  label: string
  value: string
  delta: string
  positive: boolean
  handler?: () => void
}): JSX.Element {
  const isClickable = handler !== undefined
  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={handler}
      onKeyDown={
        isClickable ? e => e.key === 'Enter' && handler?.() : undefined
      }
      className={clsx(
        'flex items-center justify-between px-4 py-3.5',
        'border-b border-gray-50 last:border-0',
        isClickable && 'cursor-pointer hover:bg-gray-50 transition-colors',
        isClickable && 'focus-visible:outline-none focus-visible:bg-gray-50',
      )}
    >
      <span
        className="text-sm font-medium"
        style={{
          color: isClickable
            ? 'var(--highlight-color)'
            : 'var(--primary-text-color)',
        }}
      >
        {label}
      </span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-900 tabular-nums">
          {value}
        </span>
        <span
          className={clsx(
            'text-xs font-medium tabular-nums',
            positive ? 'text-emerald-600' : 'text-red-500',
          )}
        >
          {positive ? '▲' : '▼'} {delta}
        </span>
      </div>
    </div>
  )
}
