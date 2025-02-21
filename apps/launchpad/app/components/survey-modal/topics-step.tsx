import {
  Avatar,
  Badge,
  Button,
  Input,
  ScrollArea,
  Text,
  TextVariant,
  Trunctacular,
} from '@0xintuition/1ui'
import { GetAtomsQuery } from '@0xintuition/graphql'

import LoadingLogo from '@components/loading-logo'
import { Topic } from '@components/survey-modal/types'
import { Question } from '@lib/graphql/types'
import { Book, Users } from 'lucide-react'

interface TopicsStepProps {
  topics: Topic[]
  isLoadingList: boolean
  onToggleTopic: (id: string) => void
  onCreateClick: () => void
  question: Question
  searchTerm: string
  setSearchTerm: (term: string) => void
  atomsData?: GetAtomsQuery
  isSearching: boolean
}

export function TopicsStep({
  topics,
  isLoadingList,
  onToggleTopic,
  onCreateClick,
  question,
  searchTerm,
  setSearchTerm,
  atomsData,
  isSearching,
}: TopicsStepProps) {
  if (!question) {
    return null
  }

  const { title, description } = question

  // Combine existing topics with search results, ensuring selected state is preserved
  const displayedTopics = searchTerm
    ? (atomsData?.atoms ?? []).map((atom) => {
        // Check if this atom already exists in topics
        const existingTopic = topics.find((t) => t.id === atom.vault_id)
        if (existingTopic) {
          // If it exists, use the existing topic data but update selected state
          return {
            ...existingTopic,
            selected: topics.some((t) => t.id === atom.vault_id && t.selected),
          }
        }
        // If it's a new atom, create a new topic without triple
        return {
          id: atom.vault_id,
          name: atom.label ?? '',
          image: atom.image ?? undefined,
          selected: topics.some((t) => t.id === atom.vault_id && t.selected),
          totalSignals: atom.vault?.position_count,
          triple: undefined,
        } as Topic
      })
    : topics

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
        ) : displayedTopics.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-20rem)] md:h-[350px]">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 justify-items-center w-full">
                {displayedTopics.map((topic) => (
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
                            value={topic.name}
                            maxStringLength={24}
                            className="text-white text-base leading-5"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-right justify-between pr-2">
                        <Badge>
                          <Users className="w-4 h-4" />
                          {topic.totalSignals ??
                            topic.triple?.subject?.vault?.positions_aggregate
                              ?.aggregate?.count}
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
              <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                Don&apos;t see the atom you&apos;re looking for?
              </Text>
              <Button variant="secondary" onClick={onCreateClick}>
                Create Atom
              </Button>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center h-[350px] w-full">
            <Text variant={TextVariant.bodyLarge}>No atoms found.</Text>
            <div className="flex flex-row gap-2 items-center">
              <Text
                variant={TextVariant.body}
                className="italic text-primary/70"
              >
                Would you like to create one?
              </Text>
              <Button variant="secondary" onClick={onCreateClick}>
                Create Atom
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
