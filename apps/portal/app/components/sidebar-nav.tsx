import {
  Button,
  ButtonSize,
  ButtonVariant,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  IconName,
  IconNameType,
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutNav,
  SidebarLayoutNavBody,
  SidebarLayoutNavHeader,
  SidebarLayoutNavHeaderButton,
  SidebarLayoutProvider,
  SidebarNavItem,
} from '@0xintuition/1ui'
import { UserPresenter } from '@0xintuition/api'

import PrivyLogoutButton from '@client/privy-logout-button'
import { createClaimModalAtom, createIdentityModalAtom } from '@lib/state/store'
import { NavLink, useLocation, useNavigate, useSubmit } from '@remix-run/react'
import { PATHS } from 'app/consts'
import { useAtom } from 'jotai'

import CreateClaimModal from './create-claim/create-claim-modal'
import CreateIdentityModal from './create-identity/create-identity-modal'

interface SidebarNavRoute {
  route: string
  label: string
  iconName: IconNameType
  disabled?: boolean
}

const sidebarNavRoutes: SidebarNavRoute[] = [
  {
    route: PATHS.HOME,
    label: 'Home',
    iconName: 'home-door',
  },
  {
    route: PATHS.PROFILE,
    label: 'Profile',
    iconName: 'people',
  },
  {
    route: PATHS.EXPLORE,
    label: 'Explore',
    iconName: 'magnifying-glass',
  },
  {
    route: PATHS.EXPLORE_LISTS,
    label: 'Lists',
    iconName: 'tag',
  },
  {
    route: PATHS.ACTIVITY,
    label: 'Activity',
    iconName: 'lightning-bolt',
  },
  {
    route: PATHS.QUEST,
    label: 'Quest',
    iconName: 'crystal-ball',
  },
]

const comingSoonRoutes: SidebarNavRoute[] = [
  {
    route: '#',
    label: 'Trust Circles',
    iconName: 'trust-circle-filled',
  },
  {
    route: '#',
    label: 'Query Builder',
    iconName: 'square-checklist',
  },
  {
    route: '#',
    label: 'Preferences',
    iconName: 'settings-gear',
  },
]

export default function SidebarNav({
  children,
  userObject,
}: {
  children: React.ReactNode
  userObject: UserPresenter
}) {
  const submit = useSubmit()
  const navigate = useNavigate()
  const location = useLocation()

  const [createIdentityModalActive, setCreateIdentityModalActive] = useAtom(
    createIdentityModalAtom,
  )

  const [createClaimModalActive, setCreateClaimModalActive] =
    useAtom(createClaimModalAtom)

  function onLogout() {
    submit(null, {
      action: '/actions/logout',
      method: 'post',
    })
  }

  return (
    <>
      <SidebarLayoutProvider>
        <SidebarLayout>
          <SidebarLayoutNav>
            <SidebarLayoutNavHeader>
              <SidebarLayoutNavHeaderButton
                imgLogo={
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
                }
                textLogo={
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
                }
                productLogo={
                  <svg
                    width="84"
                    height="22"
                    viewBox="0 0 84 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.13135"
                      y="1"
                      width="82"
                      height="20"
                      rx="5.5"
                      fill="url(#paint0_linear_12913_8903)"
                      fillOpacity="0.9"
                    />
                    <rect
                      x="1.13135"
                      y="1"
                      width="82"
                      height="20"
                      rx="5.5"
                      fill="url(#paint1_linear_12913_8903)"
                      fillOpacity="0.2"
                    />
                    <rect
                      x="1.13135"
                      y="1"
                      width="82"
                      height="20"
                      rx="5.5"
                      stroke="url(#paint2_linear_12913_8903)"
                    />
                    <path
                      d="M7.76091 6.98H13.6889V8.516H9.58491V10.472H13.5449V11.984H9.58491V13.964H13.7849V15.5H7.76091V6.98ZM21.4778 6.98H23.5658L20.6738 11.216L23.5898 15.5H21.4898L19.6178 12.584L17.7338 15.5H15.6338L18.5498 11.216L15.6578 6.98H17.7578L19.6298 9.836L21.4778 6.98ZM28.9795 6.98C31.0195 6.98 32.2555 8.036 32.2555 9.764C32.2555 11.492 31.0195 12.56 28.9795 12.56H27.3955V15.5H25.5715V6.98H28.9795ZM27.3955 11.024H28.8715C29.8315 11.024 30.3835 10.592 30.3835 9.764C30.3835 8.936 29.8315 8.516 28.8715 8.516H27.3955V11.024ZM34.5823 15.5V6.98H36.4063V13.964H40.3303V15.5H34.5823ZM45.9894 15.692C43.3974 15.692 41.8494 13.988 41.8494 11.252C41.8494 8.492 43.3974 6.788 45.9894 6.788C48.5814 6.788 50.1414 8.492 50.1414 11.252C50.1414 13.988 48.5814 15.692 45.9894 15.692ZM43.7334 11.252C43.7334 13.076 44.5734 14.156 45.9894 14.156C47.4294 14.156 48.2574 13.076 48.2574 11.252C48.2574 9.416 47.4294 8.324 45.9894 8.324C44.5734 8.324 43.7334 9.416 43.7334 11.252ZM56.0429 6.98C57.8069 6.98 59.1029 7.892 59.1029 9.536C59.1029 10.616 58.4789 11.348 57.5549 11.588C58.4669 11.696 58.8989 12.128 58.9709 13.052L59.1869 15.5H57.3509L57.1829 13.364C57.1229 12.62 56.7269 12.38 55.7309 12.38H54.1349V15.5H52.3109V6.98H56.0429ZM54.1349 10.856H55.7789C56.7149 10.856 57.2309 10.436 57.2309 9.692C57.2309 8.936 56.7269 8.516 55.7789 8.516H54.1349V10.856ZM61.4858 6.98H67.4138V8.516H63.3098V10.472H67.2698V11.984H63.3098V13.964H67.5098V15.5H61.4858V6.98ZM73.6426 6.98C75.4066 6.98 76.7026 7.892 76.7026 9.536C76.7026 10.616 76.0786 11.348 75.1546 11.588C76.0666 11.696 76.4986 12.128 76.5706 13.052L76.7866 15.5H74.9506L74.7826 13.364C74.7226 12.62 74.3266 12.38 73.3306 12.38H71.7346V15.5H69.9106V6.98H73.6426ZM71.7346 10.856H73.3786C74.3146 10.856 74.8306 10.436 74.8306 9.692C74.8306 8.936 74.3266 8.516 73.3786 8.516H71.7346V10.856Z"
                      fill="black"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_12913_8903"
                        x1="51.1043"
                        y1="0.499999"
                        x2="50.5627"
                        y2="21.486"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="#736961" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_12913_8903"
                        x1="83.6313"
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
                        id="paint2_linear_12913_8903"
                        x1="30.9151"
                        y1="0.5"
                        x2="30.9151"
                        y2="21.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0.24" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                }
                onClick={() => navigate('/')}
              />
            </SidebarLayoutNavHeader>
            <SidebarLayoutNavBody className="flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-px">
                  {sidebarNavRoutes.map((sidebarNavItem, index) => (
                    <NavLink
                      key={`nav-item-${index}`}
                      to={sidebarNavItem.route}
                      prefetch="intent"
                    >
                      <SidebarNavItem
                        iconName={sidebarNavItem.iconName}
                        label={sidebarNavItem.label}
                      />
                    </NavLink>
                  ))}
                  {comingSoonRoutes.map((sidebarNavItem, index) => (
                    <SidebarNavItem
                      key={`nav-item-${index}`}
                      iconName={sidebarNavItem.iconName}
                      label={sidebarNavItem.label}
                      disabled={true}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SidebarNavItem
                      iconName={IconName.brushSparkle}
                      label="Create"
                      className="bg-for/50 hover:bg-for text-foreground hover:text-foreground"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    sideOffset={8}
                    align="center"
                    className="bg-popover w-48"
                  >
                    <Button
                      variant={ButtonVariant.text}
                      size={ButtonSize.lg}
                      onClick={() => setCreateIdentityModalActive(true)}
                    >
                      <Icon name="fingerprint" /> Create Identity
                    </Button>
                    <DropdownMenuSeparator />
                    <Button
                      variant={ButtonVariant.text}
                      size={ButtonSize.lg}
                      onClick={() => setCreateClaimModalActive(true)}
                    >
                      <Icon name="claim" /> Create Claim
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <PrivyLogoutButton handleLogout={onLogout} />
              </div>
            </SidebarLayoutNavBody>
          </SidebarLayoutNav>
          <SidebarLayoutContent currentPathname={location.pathname}>
            {children}
          </SidebarLayoutContent>
        </SidebarLayout>
      </SidebarLayoutProvider>
      <CreateIdentityModal
        open={createIdentityModalActive}
        onClose={() => setCreateIdentityModalActive(false)}
      />
      <CreateClaimModal
        open={createClaimModalActive}
        wallet={userObject.wallet}
        onClose={() => setCreateClaimModalActive(false)}
      />
    </>
  )
}
