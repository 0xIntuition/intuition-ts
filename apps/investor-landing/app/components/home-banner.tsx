import * as React from 'react'

import { Tag } from '@0xintuition/1ui'

import { HOME_BANNER_MP4 } from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'

export interface HomeBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function HomeBanner(props: HomeBannerProps) {
  return (
    <div
      className="relative px-5 py-20 md:py-30 w-full theme-border rounded-lg bg-background/60 shadow-md backdrop-blur-lg overflow-hidden"
      {...props}
    >
      <div className="relative z-10 flex flex-col gap-4 items-center justify-center w-full">
        <div className="flex gap-2 items-center">
          <TextSVG />
          <BadgeSVG />
        </div>
        <div>
          <Tag
            variant="accent"
            className="px-2.5 py-1 tracking-wider backdrop-blur bg-accent/20 hover:bg-accent/20 border-accent/50 hover:border-accent/50 hover:cursor-default text-accent hover:text-accent" // TODO: ENG-0000 Add read-only variant to tag.  This is to overwrite the tag hover styling
          >
            BETA
          </Tag>
        </div>
      </div>

      <div className="absolute left-[50%] translate-x-[-50%] -top-5 w-full h-full">
        <HomeAnimation />
      </div>
    </div>
  )
}

const TextSVG: React.FC = () => (
  <svg
    width="152"
    height="21"
    viewBox="0 0 101 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.638672 0.718803H2.31411V13.2815H0.638672V0.718803ZM7.24154 0.718803H9.44055L16.247 11.0457H16.2819V0.718803H17.9574V13.2815H15.8282L8.95188 2.95453H8.91697V13.2815H7.24154V0.718803ZM25.46 2.31575H21.4808V0.718803H31.1146V2.31575H27.1354V13.2815H25.46V2.31575ZM36.0925 0.718803V8.41965C36.0925 8.81001 36.1448 9.21812 36.2495 9.64397C36.3542 10.058 36.5288 10.4424 36.7731 10.7973C37.0174 11.1522 37.3374 11.442 37.733 11.6668C38.1286 11.8915 38.6172 12.0039 39.199 12.0039C39.7807 12.0039 40.2694 11.8915 40.665 11.6668C41.0606 11.442 41.3806 11.1522 41.6249 10.7973C41.8692 10.4424 42.0438 10.058 42.1485 9.64397C42.2532 9.21812 42.3055 8.81001 42.3055 8.41965V0.718803H43.981V8.6858C43.981 9.41922 43.8588 10.0876 43.6145 10.6909C43.3701 11.2823 43.0327 11.7969 42.6022 12.2346C42.1717 12.6723 41.6656 13.0094 41.0839 13.246C40.5021 13.4826 39.8738 13.6009 39.199 13.6009C38.5242 13.6009 37.8959 13.4826 37.3141 13.246C36.7324 13.0094 36.2263 12.6723 35.7958 12.2346C35.3653 11.7969 35.0278 11.2823 34.7835 10.6909C34.5392 10.0876 34.417 9.41922 34.417 8.6858V0.718803H36.0925ZM48.6772 0.718803H50.3526V13.2815H48.6772V0.718803ZM57.863 2.31575H53.8838V0.718803H63.5176V2.31575H59.5384V13.2815H57.863V2.31575ZM67.0469 0.718803H68.7223V13.2815H67.0469V0.718803ZM79.3213 13.6009C78.3789 13.6009 77.5121 13.4352 76.7209 13.104C75.9297 12.761 75.2491 12.2937 74.679 11.7023C74.1205 11.1108 73.6784 10.4129 73.3526 9.60849C73.0384 8.8041 72.8814 7.93465 72.8814 7.00014C72.8814 6.06563 73.0384 5.19618 73.3526 4.39179C73.6784 3.5874 74.1205 2.88947 74.679 2.29801C75.2491 1.70655 75.9297 1.24521 76.7209 0.913987C77.5121 0.570939 78.3789 0.399414 79.3213 0.399414C80.2638 0.399414 81.1306 0.570939 81.9217 0.913987C82.7129 1.24521 83.3878 1.70655 83.9462 2.29801C84.5164 2.88947 84.9585 3.5874 85.2726 4.39179C85.5984 5.19618 85.7613 6.06563 85.7613 7.00014C85.7613 7.93465 85.5984 8.8041 85.2726 9.60849C84.9585 10.4129 84.5164 11.1108 83.9462 11.7023C83.3878 12.2937 82.7129 12.761 81.9217 13.104C81.1306 13.4352 80.2638 13.6009 79.3213 13.6009ZM79.3213 12.0039C80.0311 12.0039 80.671 11.8738 81.2411 11.6135C81.8112 11.3415 82.2999 10.9807 82.7071 10.5312C83.1143 10.0817 83.4285 9.55525 83.6496 8.95196C83.8706 8.33684 83.9811 7.68623 83.9811 7.00014C83.9811 6.31404 83.8706 5.66935 83.6496 5.06605C83.4285 4.45093 83.1143 3.91862 82.7071 3.4691C82.2999 3.01959 81.8112 2.66471 81.2411 2.40447C80.671 2.1324 80.0311 1.99636 79.3213 1.99636C78.6116 1.99636 77.9717 2.1324 77.4016 2.40447C76.8314 2.66471 76.3428 3.01959 75.9355 3.4691C75.5283 3.91862 75.2142 4.45093 74.9931 5.06605C74.772 5.66935 74.6615 6.31404 74.6615 7.00014C74.6615 7.68623 74.772 8.33684 74.9931 8.95196C75.2142 9.55525 75.5283 10.0817 75.9355 10.5312C76.3428 10.9807 76.8314 11.3415 77.4016 11.6135C77.9717 11.8738 78.6116 12.0039 79.3213 12.0039ZM89.9155 0.718803H92.1145L98.921 11.0457H98.9559V0.718803H100.631V13.2815H98.5021L91.6258 2.95453H91.5909V13.2815H89.9155V0.718803Z"
      fill="#E5E5E5"
    />
  </svg>
)

const BadgeSVG: React.FC = () => (
  <svg
    width="84"
    height="22"
    viewBox="0 0 84 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="83"
      height="21"
      rx="5.5"
      fill="url(#paint0_linear_14487_3)"
      fillOpacity="0.9"
    />
    <rect
      x="0.5"
      y="0.5"
      width="83"
      height="21"
      rx="5.5"
      fill="url(#paint1_linear_14487_3)"
      fillOpacity="0.2"
    />
    <rect
      x="0.5"
      y="0.5"
      width="83"
      height="21"
      rx="5.5"
      stroke="url(#paint2_linear_14487_3)"
    />
    <path
      d="M13.9195 6.98V8.516H11.3755V15.5H9.53953V8.516H6.98353V6.98H13.9195ZM16.0896 6.98H22.0176V8.516H17.9136V10.472H21.8736V11.984H17.9136V13.964H22.1136V15.5H16.0896V6.98ZM24.5144 6.98H26.9504L29.1224 13.184L31.2704 6.98H33.7184V15.5H31.8824V9.932L29.8904 15.476H28.3304L26.3384 9.932V15.5H24.5144V6.98ZM39.7105 6.98C41.7505 6.98 42.9865 8.036 42.9865 9.764C42.9865 11.492 41.7505 12.56 39.7105 12.56H38.1265V15.5H36.3025V6.98H39.7105ZM38.1265 11.024H39.6025C40.5625 11.024 41.1145 10.592 41.1145 9.764C41.1145 8.936 40.5625 8.516 39.6025 8.516H38.1265V11.024ZM45.3133 15.5V6.98H47.1373V13.964H51.0613V15.5H45.3133ZM52.9392 15.5L56.0112 6.98H58.1712L61.2432 15.5H59.3472L58.7232 13.688H55.4472L54.8232 15.5H52.9392ZM55.9632 12.188H58.2192L57.0912 8.9L55.9632 12.188ZM68.5936 6.98V8.516H66.0496V15.5H64.2136V8.516H61.6576V6.98H68.5936ZM70.7636 6.98H76.6916V8.516H72.5876V10.472H76.5476V11.984H72.5876V13.964H76.7876V15.5H70.7636V6.98Z"
      fill="black"
    />
    <defs>
      <linearGradient
        id="paint0_linear_14487_3"
        x1="51.0811"
        y1="-9.85709e-07"
        x2="50.4937"
        y2="21.9843"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#736961" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_14487_3"
        x1="84"
        y1="11"
        x2="1.95378e-07"
        y2="11"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity="0" />
        <stop offset="0.0793919" stopColor="white" stopOpacity="0.8" />
        <stop offset="0.955" stopColor="#FBFBFB" stopOpacity="0.786437" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_14487_3"
        x1="30.6487"
        y1="0"
        x2="30.6487"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.24" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

export const HomeAnimation = () => {
  return (
    <div className="opacity-70 w-full">
      <AnimatePresence>
        <motion.div
          key="mediaPlayer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <video
            src={HOME_BANNER_MP4}
            title={'Home'}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto overflow-hidden"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
