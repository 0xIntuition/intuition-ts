import { Button, Text, TextVariant, TextWeight } from '@0xintuition/1ui'

import intuitionLogo from '@assets/intuition-logo.svg'
import investorWelcomeCardBg from '@assets/investor-welcome-card-bg.png'
import { Card, CardContent } from '@components/card'
import { BORING_DOCSEND } from '@consts/links'
import { useNavigate } from '@remix-run/react'

export default function InvestorsWelcome() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/map')
  }

  return (
    <Card className="h-fit theme-border sm:p-10 p-5 bg-transparent relative overflow-hidden backdrop-blur-sm max-sm:w-[94vw]">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <img
          src={investorWelcomeCardBg}
          alt=""
          className="w-full h-auto object-cover"
          aria-hidden="true"
        />
      </div>
      <CardContent className="pb-0 relative">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center pb-5 gap-2.5">
            <img src={intuitionLogo} alt="" className="h-9" />
            <Text
              variant={TextVariant.bodyLarge}
              weight={TextWeight.medium}
              className="text-primary tracking-widest uppercase"
            >
              Believe In Something.
            </Text>
          </div>
          {/* <Text
            variant={TextVariant.body}
            className="text-primary/50 tracking-widest"
          >
            CHOOSE YOUR PATH...
          </Text> */}
          <div className="flex flex-row items-start justify-center gap-6">
            <div className="flex flex-col gap-2">
              <a
                href={BORING_DOCSEND}
                target="_blank"
                rel="noreferrer"
                className="inline-block no-underline w-full"
              >
                <Button className="rounded-md border border-for/50 bg-for/15 text-primary/70 tracking-widest transition-all duration-300 hover:bg-for/30 hover:border-for hover:text-primary w-full">
                  BLUE PILL
                </Button>
              </a>
              <Text
                variant={TextVariant.caption}
                className="tracking-widest text-primary/50 uppercase text-center"
              >
                standard docsend
              </Text>
            </div>

            <Text
              variant={TextVariant.bodyLarge}
              className="tracking-widest text-primary/50"
            >
              OR
            </Text>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleClick}
                className="rounded-md border border-destructive/50 bg-destructive/15 text-primary/70 tracking-widest transition-all duration-300 hover:bg-destructive/30 hover:border-destructive hover:text-primary"
              >
                RED PILL
              </Button>
              <Text
                variant={TextVariant.caption}
                className="tracking-widest text-primary/50 uppercase text-center"
              >
                intuitive experience
              </Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
