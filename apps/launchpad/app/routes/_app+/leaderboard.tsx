import {
  Avatar,
  Badge,
  Card,
  CardContent,
  PageHeader,
  ScrollArea,
} from '@0xintuition/1ui'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { users } from 'app/data/mock-leaderboard'
import { Brain } from 'lucide-react'

const categories = [
  { id: 'protocol', name: 'Protocol' },
  { id: 'launchpad', name: 'Launchpad' },
  { id: 'nft', name: 'NFT' },
  { id: 'community', name: 'Community' },
  { id: 'portal', name: 'Portal' },
  { id: 'social', name: 'Social' },
]

export default function LeaderboardPage() {
  return (
    <>
      <PageHeader title="Leaderboard" />
      <Tabs defaultValue="protocol" className="w-full">
        <div className="relative mb-8">
          <ScrollArea className="w-full">
            <TabsList className="w-full justify-start">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="min-w-24"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            {/* Featured Top Player */}
            <div className="mb-5">
              {users[category.id].slice(0, 1).map((user) => (
                <div
                  key={user.rank}
                  className="relative rounded-lg overflow-hidden border-none bg-gradient-to-br from-[#060504] to-[#101010]"
                >
                  <div className="flex flex-wrap items-center gap-6 p-6">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-4xl font-bold text-accent px-4 py-1.5 bg-primary/5 rounded-lg">
                        1
                      </div>
                      <div className="relative">
                        <Avatar
                          className="w-24 h-24"
                          src={user.avatar}
                          name={user.name}
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                        <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center gap-2.5 px-10">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            <span className="text-base font-semibold">
                              Level {user.level}
                            </span>
                            <span className="text-base text-muted-foreground">
                              /
                            </span>
                            <span className="text-base text-muted-foreground">
                              {user.score} IQ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next 4 Players Grid (ranks 2-5) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {users[category.id].slice(1, 5).map((user) => (
                <Card
                  key={user.rank}
                  className="border-none bg-gradient-to-br from-[#060504] to-[#101010]"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="text-2xl font-bold text-primary shrink-0 px-2.5 py-2 rounded-lg bg-primary/5">
                          {user.rank}
                        </div>
                        <Avatar
                          className="w-12 h-12 shrink-0 border border-border/10"
                          src={user.avatar}
                          name={user.name}
                        />
                        <h3 className="font-semibold truncate">{user.name}</h3>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center gap-2.5">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          <span className="text-base font-semibold">
                            Level {user.level}
                          </span>
                          <span className="text-base text-muted-foreground">
                            /
                          </span>
                          <span className="text-base text-muted-foreground">
                            {user.score} IQ
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leaderboard Table */}
            <Card className="border-none bg-gradient-to-br from-[#060504] to-[#101010] overflow-hidden">
              <CardContent className="p-0">
                <div className="min-w-0 overflow-x-auto">
                  <div className="w-full min-w-[600px]">
                    <div className="grid grid-cols-[80px_1fr_200px_120px] px-6 py-3 border-b border-border/10 text-sm text-muted-foreground text-center">
                      <div>Rank</div>
                      <div>Player</div>
                      <div>Level</div>
                      <div>IQ</div>
                    </div>
                    {users[category.id].slice(5).map((user) => (
                      <div
                        key={user.rank}
                        className="grid grid-cols-[80px_1fr_200px_120px] px-6 py-4 border-b border-border/10 items-center transition-colors text-center last:border-b-0"
                      >
                        <div className="font-foreground/70">{user.rank}</div>
                        <div className="flex items-center gap-3 min-w-0 pl-10">
                          <Avatar
                            className="w-8 h-8 shrink-0"
                            src={user.avatar}
                            name={user.name}
                          />
                          <span className="font-semibold truncate text-base">
                            {user.name}
                          </span>
                        </div>
                        <div>
                          <Badge variant="secondary" className="gap-2">
                            <Brain className="w-4 h-4" />
                            <span className="text-base font-semibold">
                              Level {user.level}
                            </span>
                          </Badge>
                        </div>
                        <div className="text-center text-base">
                          {user.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
