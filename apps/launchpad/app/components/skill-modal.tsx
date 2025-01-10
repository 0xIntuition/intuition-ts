import { Dialog, DialogContent, DialogTitle, Text } from '@0xintuition/1ui'

interface Skill {
  name: string
  points: number
}

interface SkillLevel {
  name: string
  pointsThreshold: number
  asset?: string // Optional asset to show instead of roman numeral
}

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
  levels: SkillLevel[]
}

export const LockIcon = () => (
  <svg
    width="34"
    height="42"
    viewBox="0 0 34 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.9897 0.0743408C11.2367 0.0743408 6.573 4.738 6.573 10.491V14.6577H0.323V41.741H33.6563V14.6577H27.4063V10.491C27.4063 4.738 22.7426 0.0743408 16.9897 0.0743408ZM24.2813 14.6577V10.491C24.2813 6.46391 21.0168 3.19934 16.9897 3.19934C12.9626 3.19934 9.698 6.46391 9.698 10.491V14.6577H24.2813ZM18.5522 23.5118V32.8868H15.4272V23.5118H18.5522Z"
      fill="#313131"
    />
  </svg>
)

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI']

export function SkillModal({
  skill,
  isOpen,
  onClose,
  levels,
}: SkillModalProps) {
  if (!skill) {
    return null
  }

  const currentPoints = Math.floor(skill.points || 0)

  // Find current level based on points
  const currentLevel = levels.reduce((acc, level, index) => {
    if (currentPoints >= level.pointsThreshold) {
      return index
    }
    return acc
  }, -1)

  // Calculate progress percentage for current level
  const nextLevelThreshold = levels[currentLevel + 1]?.pointsThreshold
  const currentLevelThreshold = levels[currentLevel]?.pointsThreshold || 0
  const progressPercentage = nextLevelThreshold
    ? ((currentPoints - currentLevelThreshold) /
        (nextLevelThreshold - currentLevelThreshold)) *
      100
    : 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-black text-white border-gray-800">
        {/* <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose> */}
        <DialogTitle>Skill Progression</DialogTitle>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-800" />
              <div>
                <div className="flex items-center gap-2">
                  <Text
                    variant="heading4"
                    weight="normal"
                    className="text-foreground"
                  >
                    {skill.name}: {levels[currentLevel + 1]?.name}
                  </Text>
                </div>
                <Text
                  variant="headline"
                  weight="normal"
                  className="text-amber-500"
                >
                  {currentPoints.toLocaleString()} Points
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(Math.max(progressPercentage, 0), 100)}%`,
                  }}
                />
              </div>
              <Text className="text-gray-400">
                {(currentPoints - currentLevelThreshold).toLocaleString()} /{' '}
                {(nextLevelThreshold - currentLevelThreshold).toLocaleString()}
              </Text>
              <div className="ml-2 w-8 h-8 rounded-full bg-black border border-gray-800 flex items-center justify-center text-sm font-serif">
                {romanNumerals[currentLevel + 1]}
              </div>
            </div>
          </div>

          {/* Level Progression */}
          <div className="flex justify-between items-center gap-4">
            {levels?.map((level, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div
                    className={`
                      relative w-20 h-20 rounded-full flex items-center justify-center border-4
                      ${index <= currentLevel ? 'border-green-500 bg-black' : ''}
                      ${index === currentLevel + 1 ? 'border-gray-800 bg-black' : ''}
                      ${index > currentLevel + 1 ? 'border-gray-800 bg-black' : ''}
                    `}
                  >
                    {index <= currentLevel + 1 ? (
                      <span className="text-4xl font-serif text-center">
                        {level.asset || romanNumerals[index]}
                      </span>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <LockIcon />
                      </div>
                    )}
                  </div>
                  {index === currentLevel + 1 && (
                    <svg
                      className="absolute inset-0 w-20 h-20 -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="text-blue-500"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="48"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${progressPercentage * 3.02} 302`}
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
                <Text className="font-medium uppercase">{level.name}</Text>
                <Text className="text-[#E6A57E]">
                  {level.pointsThreshold.toLocaleString()}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
