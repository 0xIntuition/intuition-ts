import {
  Button,
  ButtonSize,
  ButtonVariant,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'

import chartImage from '@assets/chart.png'
import neuronImage from '@assets/neuron.png'
import { cn } from '@lib/utils/misc'

export interface IPathCardProps {
  heading: string
  children: React.ReactNode
  buttonLabel: string
  handleClick: () => void
  type: 'product' | 'business'
}

export default function PathCard({
  heading,
  buttonLabel,
  handleClick,
  type,
}: IPathCardProps) {
  return (
    <div className="w-full h-full theme-border rounded-xl relative flex flex-col items-center bg-transparent backdrop-blur-lg overflow-hidden">
      {type === 'product' && (
        <div className="absolute inset-0 z-0 translate-x-1/8 translate-y-1/4">
          <div className="relative w-full h-full">
            <img
              src={neuronImage}
              alt=""
              className="w-full h-auto object-contain opacity-100"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          </div>
        </div>
      )}
      {type === 'business' && (
        <div className="absolute -inset-2 z-0">
          <div className="relative w-full h-full flex items-end">
            <img
              src={chartImage}
              alt=""
              className="w-[100%] h-[90%] object-cover opacity-100 object-bottom"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-center gap-2 px-5 py-5 z-10">
        <Text
          variant={TextVariant.headline}
          weight={TextWeight.medium}
          className="text-white uppercase tracking-[2px]"
        >
          {heading}
        </Text>
      </div>
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <Button
          onClick={handleClick}
          variant={ButtonVariant.secondary}
          size={ButtonSize.lg}
          className={cn(
            'uppercase tracking-[3px]',
            'px-8 py-3 text-white rounded !bg-background backdrop-blur-lg',
            'transition-all duration-300 ease-in-out hover:bg-success/20 hover:border-success/40 hover:text-success',
          )}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
