import * as React from 'react'

import {
  cn,
  Sheet,
  SheetContent,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  Text,
  TextVariant,
  useIsMobile,
} from '@0xintuition/1ui'

import { AccountButton } from '@components/account-button'
import LoadingButton from '@components/loading-button'
import { usePrivy } from '@privy-io/react-auth'
import { useLocation } from '@remix-run/react'
import {
  Activity,
  Circle,
  FileText,
  Gem,
  Github,
  Globe,
  Home,
  LayoutGrid,
  Medal,
  Settings,
  Upload,
} from 'lucide-react'

import { ConnectButton } from './connect-button'

export const SidebarVariant = {
  default: 'default',
  minimal: 'minimal',
} as const

export type SidebarVariantType =
  (typeof SidebarVariant)[keyof typeof SidebarVariant]

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SidebarVariantType
}

export interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  isAccent?: boolean
}

interface AppSidebarProps extends SidebarProps {
  activeItem?: string
}

export function AppSidebar({
  variant = SidebarVariant.default,
  activeItem,
  ...props
}: AppSidebarProps) {
  const isMinimal = variant === SidebarVariant.minimal
  const isMobile = useIsMobile()
  const location = useLocation()
  const { ready, authenticated, user: privyUser } = usePrivy()

  const mainNavItems: NavItem[] = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      isAccent: location.pathname === '/',
    },
    {
      icon: LayoutGrid,
      label: 'Dashboard',
      href: '/dashboard',
      isAccent: location.pathname === '/dashboard',
    },
    {
      icon: Globe,
      label: 'Discover',
      href: '/discover',
      isAccent: location.pathname === '/discover',
    },
    {
      icon: Activity,
      label: 'Network',
      href: '/network',
      isAccent: location.pathname === '/network',
    },
    {
      icon: Gem,
      label: 'Rewards',
      href: '/rewards',
      isAccent: location.pathname === '/rewards',
    },
    {
      icon: Medal,
      label: 'Leaderboard',
      href: '/leaderboard',
      isAccent: location.pathname === '/leaderboard',
    },
  ]

  const isPreferencesActive = location.pathname.startsWith(
    '/marketplaces/preferences',
  )

  const footerNavItems: NavItem[] = [
    { icon: FileText, label: 'Developer Docs', href: '#' },
    { icon: Github, label: 'Github', href: '#' },
    { icon: Upload, label: 'Bulk Uploader', href: '#' },
    { icon: Circle, label: 'Ecosystem', href: '#' },
  ]

  const sidebarContent = (
    <>
      <SidebarHeader className="px-5 py-3">
        <SidebarMenu className="gap-3">
          <SidebarMenuItem className="flex flex-row gap-3 px-4 py-3 items-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5722 19.5675C17.5786 19.5756 17.5903 19.5769 17.5983 19.5704C18.8904 18.5138 19.9266 17.1695 20.6267 15.6412C21.3295 14.1072 21.6748 12.4292 21.6358 10.7377C21.5967 9.04617 21.1744 7.38675 20.4017 5.88853C19.6319 4.3959 18.5349 3.10333 17.1955 2.11057C17.1872 2.1044 17.1755 2.10627 17.1695 2.11474L16.8097 2.61813C16.8037 2.62659 16.8055 2.63844 16.8138 2.6446C18.0724 3.57771 19.1033 4.79249 19.8268 6.19521C20.5531 7.60356 20.9501 9.16338 20.9868 10.7534C21.0235 12.3434 20.6989 13.9208 20.0383 15.3627C19.3803 16.799 18.4066 18.0624 17.1925 19.0555C17.1845 19.062 17.1832 19.0739 17.1896 19.0821L17.5722 19.5675Z"
                fill="#E5E5E5"
              />
              <path
                d="M16.3132 1.54326C16.3185 1.53425 16.3155 1.52263 16.3067 1.51733C14.9727 0.719854 13.4859 0.222649 11.9465 0.0593706C10.4009 -0.104564 8.83853 0.0719634 7.3658 0.576939C5.89304 1.08191 4.54446 1.90349 3.4118 2.98574C2.28368 4.06368 1.39612 5.37502 0.809011 6.83119C0.805108 6.84087 0.809684 6.85193 0.819213 6.85589L1.38576 7.09064C1.39531 7.0946 1.40616 7.08994 1.41008 7.08026C1.96195 5.71189 2.79611 4.47959 3.85626 3.4666C4.92097 2.44928 6.18866 1.677 7.57302 1.20232C8.9574 0.727645 10.426 0.561709 11.8789 0.715806C13.3256 0.869248 14.7228 1.33642 15.9765 2.08572C15.9853 2.09102 15.9968 2.08803 16.002 2.07903L16.3132 1.54326Z"
                fill="#E5E5E5"
              />
              <path
                d="M0.380453 8.1857C0.370508 8.183 0.360306 8.18905 0.357683 8.19914C0.113567 9.14035 -0.00661751 10.1103 0.000280913 11.0836C0.000355927 11.094 0.00877764 11.1024 0.019069 11.1023L0.630942 11.0965C0.641231 11.0964 0.649488 11.0879 0.649416 11.0774C0.643034 10.1633 0.755913 9.25235 0.985096 8.3683C0.987719 8.35818 0.981796 8.34783 0.971848 8.34513L0.380453 8.1857Z"
                fill="#E5E5E5"
              />
              <path
                d="M0.114765 12.465C0.104572 12.4664 0.0974195 12.4759 0.0988044 12.4863C0.295541 13.9574 0.783179 15.3727 1.53241 16.6469C2.2848 17.9266 3.28535 19.0372 4.47317 19.9114C5.66099 20.7856 7.01133 21.4051 8.44214 21.7321C9.86689 22.0578 11.3418 22.0868 12.778 21.8175C12.7881 21.8156 12.7948 21.8057 12.7929 21.7955L12.6811 21.1838C12.6792 21.1736 12.6695 21.1668 12.6594 21.1687C11.3097 21.4216 9.92367 21.3943 8.58478 21.0882C7.23984 20.7808 5.97051 20.1985 4.85395 19.3767C3.7374 18.555 2.79689 17.511 2.08962 16.3081C1.38556 15.1107 0.927232 13.7807 0.742198 12.3983C0.74081 12.3879 0.731431 12.3806 0.721229 12.382L0.114765 12.465Z"
                fill="#E5E5E5"
              />
              <path
                d="M13.8642 21.5346C13.8671 21.5446 13.8775 21.5504 13.8873 21.5474C14.8318 21.2631 15.7337 20.849 16.568 20.3167C16.5767 20.3111 16.5793 20.2994 16.5738 20.2906L16.2478 19.7642C16.2423 19.7554 16.2308 19.7527 16.2221 19.7583C15.4384 20.2582 14.5913 20.6471 13.7043 20.9143C13.6944 20.9172 13.6888 20.9278 13.6917 20.9378L13.8642 21.5346Z"
                fill="#E5E5E5"
              />
              <path
                d="M18.59 16.4748C15.614 20.8362 9.72285 21.9198 5.4317 18.8952C1.14051 15.8706 0.0742711 9.88307 3.0502 5.52168C6.02613 1.16028 11.9173 0.0766147 16.2085 3.10124C20.4997 6.12585 21.5659 12.1134 18.59 16.4748ZM4.45749 6.51361C2.02057 10.0851 2.89368 14.9881 6.40763 17.4649C9.92158 19.9417 14.7457 19.0543 17.1827 15.4829C19.6196 11.9114 18.7465 7.00835 15.2325 4.53156C11.7186 2.05475 6.89442 2.94214 4.45749 6.51361Z"
                fill="#E5E5E5"
              />
            </svg>
            <svg
              width="101"
              height="14"
              viewBox="0 0 101 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.638672 0.718803H2.31411V13.2815H0.638672V0.718803ZM7.24154 0.718803H9.44055L16.247 11.0457H16.2819V0.718803H17.9574V13.2815H15.8282L8.95188 2.95453H8.91697V13.2815H7.24154V0.718803ZM25.46 2.31575H21.4808V0.718803H31.1146V2.31575H27.1354V13.2815H25.46V2.31575ZM36.0925 0.718803V8.41965C36.0925 8.81001 36.1448 9.21812 36.2495 9.64397C36.3542 10.058 36.5288 10.4424 36.7731 10.7973C37.0174 11.1522 37.3374 11.442 37.733 11.6668C38.1286 11.8915 38.6172 12.0039 39.199 12.0039C39.7807 12.0039 40.2694 11.8915 40.665 11.6668C41.0606 11.442 41.3806 11.1522 41.6249 10.7973C41.8692 10.4424 42.0438 10.058 42.1485 9.64397C42.2532 9.21812 42.3055 8.81001 42.3055 8.41965V0.718803H43.981V8.6858C43.981 9.41922 43.8588 10.0876 43.6145 10.6909C43.3701 11.2823 43.0327 11.7969 42.6022 12.2346C42.1717 12.6723 41.6656 13.0094 41.0839 13.246C40.5021 13.4826 39.8738 13.6009 39.199 13.6009C38.5242 13.6009 37.8959 13.4826 37.3141 13.246C36.7324 13.0094 36.2263 12.6723 35.7958 12.2346C35.3653 11.7969 35.0278 11.2823 34.7835 10.6909C34.5392 10.0876 34.417 9.41922 34.417 8.6858V0.718803H36.0925ZM48.6772 0.718803H50.3526V13.2815H48.6772V0.718803ZM57.863 2.31575H53.8838V0.718803H63.5176V2.31575H59.5384V13.2815H57.863V2.31575ZM67.0469 0.718803H68.7223V13.2815H67.0469V0.718803ZM79.3213 13.6009C78.3789 13.6009 77.5121 13.4352 76.7209 13.104C75.9297 12.761 75.2491 12.2937 74.679 11.7023C74.1205 11.1108 73.6784 10.4129 73.3526 9.60849C73.0384 8.8041 72.8814 7.93465 72.8814 7.00014C72.8814 6.06563 73.0384 5.19618 73.3526 4.39179C73.6784 3.5874 74.1205 2.88947 74.679 2.29801C75.2491 1.70655 75.9297 1.24521 76.7209 0.913987C77.5121 0.570939 78.3789 0.399414 79.3213 0.399414C80.2638 0.399414 81.1306 0.570939 81.9217 0.913987C82.7129 1.24521 83.3878 1.70655 83.9462 2.29801C84.5164 2.88947 84.9585 3.5874 85.2726 4.39179C85.5984 5.19618 85.7613 6.06563 85.7613 7.00014C85.7613 7.93465 85.5984 8.8041 85.2726 9.60849C84.9585 10.4129 84.5164 11.1108 83.9462 11.7023C83.3878 12.2937 82.7129 12.761 81.9217 13.104C81.1306 13.4352 80.2638 13.6009 79.3213 13.6009ZM79.3213 12.0039C80.0311 12.0039 80.671 11.8738 81.2411 11.6135C81.8112 11.3415 82.2999 10.9807 82.7071 10.5312C83.1143 10.0817 83.4285 9.55525 83.6496 8.95196C83.8706 8.33684 83.9811 7.68623 83.9811 7.00014C83.9811 6.31404 83.8706 5.66935 83.6496 5.06605C83.4285 4.45093 83.1143 3.91862 82.7071 3.4691C82.2999 3.01959 81.8112 2.66471 81.2411 2.40447C80.671 2.1324 80.0311 1.99636 79.3213 1.99636C78.6116 1.99636 77.9717 2.1324 77.4016 2.40447C76.8314 2.66471 76.3428 3.01959 75.9355 3.4691C75.5283 3.91862 75.2142 4.45093 74.9931 5.06605C74.772 5.66935 74.6615 6.31404 74.6615 7.00014C74.6615 7.68623 74.772 8.33684 74.9931 8.95196C75.2142 9.55525 75.5283 10.0817 75.9355 10.5312C76.3428 10.9807 76.8314 11.3415 77.4016 11.6135C77.9717 11.8738 78.6116 12.0039 79.3213 12.0039ZM89.9155 0.718803H92.1145L98.921 11.0457H98.9559V0.718803H100.631V13.2815H98.5021L91.6258 2.95453H91.5909V13.2815H89.9155V0.718803Z"
                fill="#E5E5E5"
              />
            </svg>
            <svg
              width="96"
              height="22"
              viewBox="0 0 96 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.13135"
                y="1"
                width="94"
                height="20"
                rx="5.5"
                fill="url(#paint0_linear_14611_39534)"
                fillOpacity="0.9"
              />
              <rect
                x="1.13135"
                y="1"
                width="94"
                height="20"
                rx="5.5"
                fill="url(#paint1_linear_14611_39534)"
                fillOpacity="0.2"
              />
              <rect
                x="1.13135"
                y="1"
                width="94"
                height="20"
                rx="5.5"
                stroke="url(#paint2_linear_14611_39534)"
              />
              <path
                d="M7.62075 15.5V6.98H9.44475V13.964H13.3688V15.5H7.62075ZM15.2467 15.5L18.3187 6.98H20.4787L23.5507 15.5H21.6547L21.0307 13.688H17.7547L17.1307 15.5H15.2467ZM18.2707 12.188H20.5267L19.3987 8.9L18.2707 12.188ZM32.3886 12.428C32.3886 14.42 31.0326 15.692 28.8846 15.692C26.7246 15.692 25.3686 14.42 25.3686 12.428V6.968H27.1926V12.428C27.1926 13.556 27.8166 14.156 28.8846 14.156C29.9406 14.156 30.5646 13.556 30.5646 12.428V6.968H32.3886V12.428ZM34.9461 6.98H36.9501L40.3221 12.812V6.98H42.1461V15.5H40.0701L36.7701 9.86V15.5H34.9461V6.98ZM52.2986 12.428C51.9506 14.492 50.6306 15.692 48.5906 15.692C46.0706 15.692 44.4866 13.784 44.4866 11.252C44.4866 8.72 46.0706 6.788 48.5906 6.788C50.5466 6.788 51.8906 7.94 52.2626 9.908L50.3666 9.992C50.1506 8.924 49.4906 8.324 48.5546 8.324C47.0546 8.324 46.3586 9.584 46.3586 11.252C46.3586 12.908 47.0666 14.156 48.5546 14.156C49.5506 14.156 50.1986 13.508 50.3906 12.356L52.2986 12.428ZM54.5614 15.5V6.98H56.3854V10.448H59.5654V6.98H61.3894V15.5H59.5654V11.984H56.3854V15.5H54.5614ZM67.5309 6.98C69.5709 6.98 70.8069 8.036 70.8069 9.764C70.8069 11.492 69.5709 12.56 67.5309 12.56H65.9469V15.5H64.1229V6.98H67.5309ZM65.9469 11.024H67.4229C68.3829 11.024 68.9349 10.592 68.9349 9.764C68.9349 8.936 68.3829 8.516 67.4229 8.516H65.9469V11.024ZM71.5496 15.5L74.6216 6.98H76.7816L79.8536 15.5H77.9576L77.3336 13.688H74.0576L73.4336 15.5H71.5496ZM74.5736 12.188H76.8296L75.7016 8.9L74.5736 12.188ZM84.7447 6.98C87.5047 6.98 89.0527 8.516 89.0527 11.252C89.0527 13.976 87.5287 15.5 84.8167 15.5H81.8047V6.98H84.7447ZM83.6287 13.964H84.7447C86.4007 13.964 87.1927 13.088 87.1927 11.24C87.1927 9.392 86.4007 8.516 84.7447 8.516H83.6287V13.964Z"
                fill="black"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_14611_39534"
                  x1="58.4016"
                  y1="0.499999"
                  x2="57.9283"
                  y2="21.4893"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#736961" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_14611_39534"
                  x1="95.6313"
                  y1="11"
                  x2="0.631348"
                  y2="11"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopOpacity="0" />
                  <stop
                    offset="0.0793919"
                    stopColor="white"
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="0.955"
                    stopColor="#FBFBFB"
                    stopOpacity="0.786437"
                  />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_14611_39534"
                  x1="35.2935"
                  y1="0.5"
                  x2="35.2935"
                  y2="21.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0.24" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {!ready ? (
              <LoadingButton />
            ) : authenticated && privyUser ? (
              <AccountButton privyUser={privyUser} isMinimal={isMinimal} />
            ) : (
              <ConnectButton />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-6 px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={activeItem === item.label}
                    className={cn(
                      'w-full gap-3 py-3',
                      item.isAccent ? 'text-accent' : undefined,
                    )}
                  >
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="!h-5 !w-5" />
                      {!isMinimal && (
                        <Text
                          variant={TextVariant.body}
                          className="text-inherit"
                        >
                          {item.label}
                        </Text>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Marketplaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  asChild
                  isActive={isPreferencesActive}
                  className={cn(
                    'w-full gap-3 py-3',
                    isPreferencesActive ? 'text-accent' : undefined,
                  )}
                >
                  <a
                    href="/marketplaces/preferences"
                    className="flex items-center gap-3"
                  >
                    <Settings className="h-4 w-4" />
                    {!isMinimal && <span>Preferences</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto mb-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {footerNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    className={cn('w-full gap-3 py-3')}
                  >
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="!h-5 !w-5" />
                      {!isMinimal && (
                        <Text
                          variant={TextVariant.body}
                          className="text-inherit"
                        >
                          {item.label}
                        </Text>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )

  return (
    <>
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <SidebarTrigger />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] p-0 bg-gradient-to-r from-[#060504] to-[#101010]"
          >
            {sidebarContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar
          className="border-r border-border/10 bg-gradient-to-r from-[#060504] to-[#101010]"
          collapsible="icon"
          {...props}
        >
          {sidebarContent}
        </Sidebar>
      )}
    </>
  )
}
