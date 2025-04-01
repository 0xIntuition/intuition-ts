import {
  Avatar,
  Badge,
  Input,
  ScrollArea,
  Text,
  TextVariant,
  Trunctacular,
} from '@0xintuition/1ui'

import LoadingLogo from '@components/loading-logo'
import { Question } from '@lib/graphql/types'
import { Link } from '@remix-run/react'
import { Book, Users } from 'lucide-react'

import { Topic } from './types'

interface TopicsStepProps {
  topics: Topic[]
  isLoadingList: boolean
  onToggleTopic: (id: string) => void
  question: Question
  searchTerm: string
  setSearchTerm: (term: string) => void
  isSearching: boolean
}

export function TopicsStep({
  topics,
  isLoadingList,
  onToggleTopic,
  question,
  searchTerm,
  setSearchTerm,
  isSearching,
}: TopicsStepProps) {
  if (!question) {
    return null
  }

  const { title, description } = question

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleTopicSelect = (id: string) => {
    onToggleTopic(id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-start justify-between gap-4 pb-5">
          <div className="space-y-1">
            <Text variant="headline" className="font-semibold">
              {title}
            </Text>
            <Text
              variant={TextVariant.footnote}
              className="text-primary/70 flex flex-row gap-1 items-center"
            >
              <Book className="h-4 w-4 text-primary/70" />
              {description}
            </Text>
          </div>
        </div>
        <Input
          className="w-full max-lg:w-full bg-transparent border-none text-xl"
          onChange={handleSearchChange}
          placeholder="Search atoms"
          startAdornment="magnifying-glass"
          value={searchTerm}
        />
        {isLoadingList || isSearching ? (
          <div className="flex flex-col gap-4 justify-center items-center h-[350px]">
            <LoadingLogo size={50} />
            <div className="flex flex-col items-center gap-1">
              <Text variant={TextVariant.bodyLarge}>Loading your atoms...</Text>
              <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                This will only take a moment.
              </Text>
            </div>
          </div>
        ) : topics.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-20rem)] md:h-[350px]">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 justify-items-center w-full">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic.id)}
                    aria-pressed={topic.selected}
                    aria-label={`Select ${topic.name} category`}
                    className={`flex items-center gap-4 rounded-lg border transition-colors w-full md:w-[280px] h-[72px] ${
                      topic.selected
                        ? 'border-accent bg-accent/10'
                        : 'border-[#1A1A1A] hover:border-accent'
                    }`}
                  >
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-row items-center w-full gap-4">
                        <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
                          {topic.image && (
                            <Avatar
                              src={topic.image}
                              name={topic.name}
                              icon="fingerprint"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          )}
                        </div>
                        <div className="text-left">
                          <Trunctacular
                            value={
                              topic.atom?.value?.account?.label
                                ? topic.atom?.value?.account?.label
                                : topic.name
                            }
                            maxStringLength={24}
                            className="text-white text-base leading-5"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-right justify-between pr-2">
                        <Badge>
                          <Users className="w-4 h-4" />
                          {topic.totalSignals ??
                            topic.atom?.vault?.positions_aggregate?.aggregate
                              ?.count}
                        </Badge>
                        {/* <Badge className="flex flex-row gap-1 whitespace-nowrap">
                          {(
                            +formatUnits(
                              BigInt(
                                topic.triple?.subject?.vault
                                  ?.current_share_price ?? 0,
                              ),
                              18,
                            ) *
                            +formatUnits(
                              BigInt(
                                topic.triple?.subject?.vault
                                  ?.positions_aggregate?.aggregate?.sum
                                  ?.shares ?? 0,
                              ),
                              18,
                            )
                          ).toFixed(5)}{' '}
                          ETH
                        </Badge> */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center mt-10">
              {/* <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                Don&apos;t see the atom you&apos;re looking for?
              </Text>
              <Button variant="secondary" onClick={onCreateClick}>
                Create Atom
              </Button> */}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center h-[350px] w-full">
            <Text variant={TextVariant.bodyLarge}>No atoms found.</Text>
            <div className="flex flex-col gap-2 items-center text-center">
              <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                Atom creation locked for this quest. <br /> Propose a new entry{' '}
                <Link
                  to="https://discord.com/invite/0xintuition"
                  className="text-accent underline"
                  target="_blank"
                >
                  here
                </Link>
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
