import { Button, Card, PageHeader, Text } from '@0xintuition/1ui'

import { ErrorPage } from '@components/error-page'

export function ErrorBoundary() {
  return <ErrorPage routeName="dashboard" />
}
export default function Quests() {
  return (
    <>
      <PageHeader title="Quests" />

      <div className="flex flex-col gap-6">
        <Card className="h-32 rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] w-full relative">
          <div className="absolute inset-0 p-8">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-6">
                <div className="flex border theme-border rounded-xl h-16 w-16 items-center justify-center font-serif text-2xl pointer-events-none">
                  I
                </div>
                <div className="space-y-2">
                  <Text
                    variant="headline"
                    weight="medium"
                    className="text-foreground"
                  >
                    What are your preferences?
                  </Text>
                  <Text
                    variant="body"
                    weight="medium"
                    className="text-foreground/70"
                  >
                    Answer questions about your preferences to earn IQ!
                  </Text>
                </div>
              </div>
              <Button variant="primary" size="lg" className="w-32 h-fit">
                Start
              </Button>
            </div>
          </div>
        </Card>

        <div className="relative">
          <Card className="h-32 rounded-lg border-none bg-gradient-to-br from-[#060504] to-[#101010] w-full blur-sm brightness-50">
            <div className="absolute inset-0 p-8">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-6">
                  <div className="flex border theme-border rounded-xl h-16 w-16 items-center justify-center font-serif text-2xl pointer-events-none">
                    II
                  </div>
                  <div className="space-y-2">
                    <Text
                      variant="headline"
                      weight="medium"
                      className="text-foreground"
                    >
                      What are your preferences?
                    </Text>
                    <Text
                      variant="body"
                      weight="medium"
                      className="text-foreground/70"
                    >
                      Answer questions about your preferences to earn IQ!
                    </Text>
                  </div>
                </div>
                <Button variant="primary" size="lg" className="w-32 h-fit">
                  Start
                </Button>
              </div>
            </div>
          </Card>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 px-6 py-3 rounded-lg backdrop-blur-sm">
              <span className="text-xl font-semibold text-foreground">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
