import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BadgeVariant,
  Card,
  CardContent,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'

import { users } from 'app/data/mock-leaderboard'
import { Brain, Trophy } from 'lucide-react'

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
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-8">
        <Trophy className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>

      <Tabs defaultValue="protocol" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="min-w-24"
                label={category.name}
              ></TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            {/* Featured Top Player */}
            <div className="mb-8">
              {users[category.id].slice(0, 1).map((user) => (
                <div
                  key={user.rank}
                  className="relative rounded-lg overflow-hidden bg-background border border-border"
                >
                  <div className="flex items-center gap-6 p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-4xl font-bold text-amber-500">1</div>
                      <div className="relative">
                        <Avatar
                          className="w-24 h-24"
                          src={user.avatar}
                          name={user.name}
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={BadgeVariant.accent}
                            className="text-sm gap-1.5"
                          >
                            <Brain className="w-4 h-4" />
                            Level {user.level}
                          </Badge>
                          <span className="text-muted-foreground">
                            {user.score} IQ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next 4 Players Grid (ranks 2-5) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {users[category.id].slice(1, 5).map((user) => (
                <Card key={user.rank} className="bg-background border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-blue-500">
                          {user.rank}
                        </div>
                        <Avatar
                          className="w-16 h-16"
                          src={user.avatar}
                          name={user.name}
                        />
                        <h3 className="font-semibold">{user.name}</h3>
                      </div>
                      <div className="flex items-center gap-10">
                        <Badge variant="secondary" className="gap-1">
                          <Brain className="w-3 h-3" />
                          Level {user.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {user.score} IQ
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leaderboard Table - starts from rank 6 now */}
            <Card className="bg-background border-border">
              <CardContent className="p-0">
                <div className="rounded-md">
                  <div className="w-full">
                    <div className="grid grid-cols-[80px_1fr_200px_120px] px-6 py-3 border-b border-border text-sm text-muted-foreground">
                      <div>Rank</div>
                      <div>Player</div>
                      <div>Level</div>
                      <div className="text-right">IQ</div>
                    </div>
                    {users[category.id].slice(5).map((user) => (
                      <div
                        key={user.rank}
                        className="grid grid-cols-[80px_1fr_200px_120px] px-6 py-4 border-b border-border items-center hover:bg-accent transition-colors"
                      >
                        <div className="text-lg font-mono">{user.rank}</div>
                        <div className="flex items-center gap-3">
                          <Avatar
                            className="w-10 h-10"
                            src={user.avatar}
                            name={user.name}
                          />
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <div>
                          <Badge variant="secondary" className="gap-1">
                            <Brain className="w-3 h-3" />
                            Level {user.level}
                          </Badge>
                        </div>
                        <div className="text-right font-mono">{user.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
