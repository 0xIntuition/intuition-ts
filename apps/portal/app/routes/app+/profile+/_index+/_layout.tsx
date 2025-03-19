import { useEffect, useState } from 'react'

import {
  Banner,
  Icon,
  Identity,
  IdentityStakeCard,
  PieChartVariant,
  PositionCard,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
  Tag,
  Tags,
  TagsButton,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetAccountProfileDocument,
  GetAccountProfileQuery,
  GetAccountProfileQueryVariables,
  GetConnectionsCountDocument,
  GetConnectionsCountQuery,
  GetConnectionsCountQueryVariables,
  GetFeeTransfersDocument,
  GetFeeTransfersQuery,
  GetFeeTransfersQueryVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables,
  useGetAccountProfileQuery,
  useGetConnectionsCountQuery,
  useGetFeeTransfersQuery,
  useGetTagsQuery,
} from '@0xintuition/graphql'

import PrivyRevalidate from '@client/privy-revalidate'
import EditSocialLinksModal from '@components/edit-social-links-modal'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import { ProfileSocialAccounts } from '@components/profile-social-accounts'
import ImageModal from '@components/profile/image-modal'
import SaveListModal from '@components/save-list/save-list-modal'
import { SegmentedNav } from '@components/segmented-nav'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { usePoints } from '@lib/hooks/usePoints'
import { fetchPoints } from '@lib/services/points'
import {
  editProfileModalAtom,
  editSocialLinksModalAtom,
  imageModalAtom,
  saveListModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { User } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useMatches,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { getUser, getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
  userIdentityRouteOptions,
  ZERO_ADDRESS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { Atom } from 'app/types/atom'
import { Triple } from 'app/types/triple'
import { useAtom } from 'jotai'
import { formatUnits, parseUnits } from 'viem'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address
  const queryAddress = userWallet.toLowerCase()

  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const queryClient = new QueryClient()

  if (userWallet) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['get-points', { userWallet }],
        queryFn: async () => {
          const response = await fetchPoints(userWallet.toLowerCase())
          return response
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['get-protocol-fees', { userWallet }],
        queryFn: async () => {
          const response = fetcher<
            GetFeeTransfersQuery,
            GetFeeTransfersQueryVariables
          >(GetFeeTransfersDocument, {
            address: userWallet,
            cutoff_timestamp: 1733356800,
          })
          return response
        },
      }),
    ])
  }

  let accountResult: GetAccountProfileQuery | null = null

  try {
    logger('Fetching Account Data...')
    accountResult = await fetcher<
      GetAccountProfileQuery,
      GetAccountProfileQueryVariables
    >(GetAccountProfileDocument, { address: queryAddress })()

    if (!accountResult) {
      throw new Error('No account data found for address')
    }

    if (!accountResult.account?.atom_id) {
      throw new Error('No atom ID found for account')
    }

    console.log('queryAddress', queryAddress)
    console.log('accountResult', accountResult)

    await queryClient.prefetchQuery({
      queryKey: ['get-account', { address: queryAddress }],
      queryFn: () => accountResult,
    })

    const accountTagsResult = await fetcher<
      GetTagsQuery,
      GetTagsQueryVariables
    >(GetTagsDocument, {
      subjectId: accountResult.account.atom_id,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    })()

    await queryClient.prefetchQuery({
      queryKey: [
        'get-tags',
        {
          subjectId: accountResult.account.atom_id,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      queryFn: () => accountTagsResult,
    })

    const accountConnectionsCountResult = await fetcher<
      GetConnectionsCountQuery,
      GetConnectionsCountQueryVariables
    >(GetConnectionsCountDocument, {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountResult.account.atom_id,
      address: queryAddress,
    })()

    await queryClient.prefetchQuery({
      queryKey: [
        'get-connections-count',
        {
          address: queryAddress,
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: accountResult.account.atom_id,
        },
      ],
      queryFn: () => accountConnectionsCountResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      queryAddress,
    })
    throw error
  }

  return json({
    privyUser: user,
    userWallet,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      subjectId: accountResult?.account?.atom_id,
      queryAddress,
    },
  })
}

export interface ProfileLoaderData {
  privyUser: User
  userWallet: string
  initialParams: {
    queryAddress: string
    subjectId: string
  }
}

export default function Profile() {
  const { privyUser, userWallet, initialParams } =
    useLoaderData<ProfileLoaderData>()

  // TODO: Remove this once the `status is added to atoms -- that will be what we check if something is pending. For now setting this to false and removing the legacy isPending check
  const isPending = false

  const { data: accountResult } = useGetAccountProfileQuery(
    {
      address: initialParams.queryAddress,
    },
    {
      queryKey: ['get-account', { address: initialParams.queryAddress }],
    },
  )

  const { data: accountTagsResult } = useGetTagsQuery(
    {
      subjectId: accountResult?.account?.atom_id,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    {
      queryKey: [
        'get-tags',
        {
          subjectId: initialParams?.subjectId,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      enabled: !!accountResult?.account?.atom_id,
    },
  )

  console.log('accountTagsResult', accountTagsResult)

  const { data: accountConnectionsCountResult } = useGetConnectionsCountQuery(
    {
      subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
      predicateId:
        getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
      objectId: accountResult?.account?.atom_id,
      address: initialParams.queryAddress,
    },
    {
      queryKey: [
        'get-connections-count',
        {
          address: initialParams.queryAddress,
          subjectId: getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
          predicateId:
            getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
          objectId: accountResult?.account?.atom_id,
        },
      ],
    },
  )

  console.log('accountResult', accountResult)

  const { data: vaultDetails } = useGetVaultDetails(
    MULTIVAULT_CONTRACT_ADDRESS,
    accountResult?.account?.atom?.vault_id,
    undefined, // no counterVaultId
    {
      queryKey: [
        'get-vault-details',
        MULTIVAULT_CONTRACT_ADDRESS,
        accountResult?.account?.atom?.vault_id,
      ],
    },
  )

  console.log('vaultDetails', vaultDetails)
  // logger('Account Result:', accountResult)
  // logger('Account Tags Result:', accountTagsResult)
  // logger('Account Connections Count Result:', accountConnectionsCountResult)
  // logger('tags', accountTagsResult && accountTagsResult?.triples)
  // logger('Vault Details:', vaultDetails)

  const user_assets = vaultDetails
    ? vaultDetails.user_assets
    : accountResult?.account?.atom?.vault?.current_share_price &&
        accountResult?.account?.atom?.vault?.positions?.[0]?.shares
      ? (BigInt(accountResult.account.atom.vault.current_share_price) *
          BigInt(accountResult.account.atom.vault.positions[0].shares)) /
        BigInt(10 ** 18) // Division to get the correct decimal places
      : 0n
  const assets_sum = vaultDetails
    ? vaultDetails.assets_sum
    : accountResult?.account?.atom?.vault?.current_share_price &&
        accountResult?.account?.atom?.vault?.total_shares
      ? (BigInt(accountResult.account.atom.vault.current_share_price) *
          BigInt(accountResult.account.atom.vault.total_shares)) /
        BigInt(10 ** 18) // Division to get the correct decimal places
      : 0n

  console.log(
    'user_assets',
    vaultDetails?.user_assets,
    (BigInt(accountResult?.account?.atom?.vault?.current_share_price ?? 0) *
      BigInt(
        accountResult?.account?.atom?.vault?.positions?.[0]?.shares ?? 0,
      )) /
      BigInt(10 ** 18),
  )
  console.log(
    'current_share_price',
    accountResult?.account?.atom?.vault?.current_share_price,
    vaultDetails?.conviction_price,
  )
  console.log(
    'user_shares',
    accountResult?.account?.atom?.vault?.positions?.[0]?.shares,
    vaultDetails?.user_conviction,
  )

  const { data: points } = usePoints(userWallet)
  const { data: protocolFees } = useGetFeeTransfersQuery({
    address: userWallet ?? ZERO_ADDRESS,
    cutoff_timestamp: 1733356800,
  })

  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)
  const [editSocialLinksModalActive, setEditSocialLinksModalActive] = useAtom(
    editSocialLinksModalAtom,
  )
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)

  const [selectedTag, setSelectedTag] = useState<Atom | null | undefined>(null)

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  const revalidator = useRevalidator()
  const navigate = useNavigate()

  useEffect(() => {
    setEditProfileModalActive(false)
    setEditSocialLinksModalActive(false)
  }, [])

  useEffect(() => {
    if (!editProfileModalActive) {
      revalidator.revalidate()
    }
  }, [editProfileModalActive])

  const matches = useMatches()
  const currentPath = matches[matches.length - 1].pathname

  // List of paths that should not use the ProfileLayout
  const excludedPaths = [PATHS.PROFILE_CREATE]

  if (excludedPaths.includes(currentPath)) {
    return <Outlet />
  }
  const feesPaidBeforeCutoff = formatUnits(
    protocolFees?.before_cutoff?.aggregate?.sum?.amount ?? 0n,
    18,
  )
  const feesPaidAfterCutoff = formatUnits(
    protocolFees?.after_cutoff?.aggregate?.sum?.amount ?? 0n,
    18,
  )

  const protocolPointsBeforeCutoff =
    Number(feesPaidBeforeCutoff || '0') * 10000000
  const protocolPoitnsAfterCutoff = Number(feesPaidAfterCutoff || '0') * 2000000
  const protocolPointsTotal = Math.round(
    protocolPointsBeforeCutoff + protocolPoitnsAfterCutoff,
  )

  const totalPoints = (points?.total_points ?? 0) + protocolPointsTotal

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-5 inline-flex max-lg:w-full">
      <ProfileCard
        variant="user"
        avatarSrc={accountResult?.account?.image ?? ''}
        name={accountResult?.account?.label ?? ''}
        id={accountResult?.account?.id ?? ''}
        vaultId={accountResult?.account?.atom_id ?? 0}
        stats={{
          numberOfFollowers:
            accountConnectionsCountResult?.followers_count?.[0]?.vault
              ?.positions_aggregate?.aggregate?.count ?? 0,
          numberOfFollowing:
            accountConnectionsCountResult?.following_count?.aggregate?.count ??
            0,
          points: totalPoints,
        }}
        bio={accountResult?.account?.atom?.value?.person?.description ?? ''}
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${accountResult?.account?.id}`}
        followingLink={`${PATHS.PROFILE_CONNECTIONS}?tab=following`}
        followerLink={`${PATHS.PROFILE_CONNECTIONS}?tab=followers`}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
          })
        }}
      />
      <ProfileSocialAccounts
        privyUser={JSON.parse(JSON.stringify(privyUser))}
        handleOpenEditSocialLinksModal={() =>
          setEditSocialLinksModalActive(true)
        }
      />
      {!isPending && (
        <>
          <Tags>
            <div className="flex flex-row gap-2 md:flex-col">
              {accountTagsResult && accountTagsResult.triples.length > 0 ? (
                <TagsContent
                  numberOfTags={accountTagsResult.triples.length ?? 0}
                >
                  {accountTagsResult.triples.slice(0, 5).map((tag) => (
                    <TagWithValue
                      key={tag.id}
                      label={tag.object?.label ?? ''}
                      value={tag.vault?.allPositions?.aggregate?.count ?? 0}
                      onStake={() => {
                        setSelectedTag(tag?.object as Atom)
                        setSaveListModalActive({
                          isOpen: true,
                          id: tag.id,
                          tag: tag.object as Atom,
                        })
                      }}
                    />
                  ))}
                </TagsContent>
              ) : null}
              <Tag
                className="w-fit border-dashed"
                onClick={() => {
                  setTagsModalActive({ isOpen: true, mode: 'add' })
                }} // TODO: The View All Tags modal is currently not working -- there are issues that we will fix in another ticket
              >
                <Icon name="plus-small" className="w-5 h-5" />
                Add tags
              </Tag>
            </div>

            <TagsButton
              onClick={() => {
                setTagsModalActive({ isOpen: true, mode: 'view' })
              }}
            />
          </Tags>
          {vaultDetails !== null && user_assets !== '0' ? (
            <PositionCard
              onButtonClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'redeem',
                  modalType: 'identity',
                  identity: accountResult?.account?.atom as Atom,
                  isOpen: true,
                }))
              }
            >
              <PositionCardStaked
                amount={
                  user_assets ? +formatBalance(BigInt(user_assets), 18) : 0
                }
              />
              <PositionCardOwnership
                percentOwnership={
                  user_assets !== null && assets_sum
                    ? +calculatePercentageOfTvl(
                        parseUnits(
                          user_assets?.toString() ?? '0',
                          18,
                        ).toString(),
                        parseUnits(assets_sum.toString() ?? '0', 18).toString(),
                      )
                    : 0
                }
                variant={PieChartVariant.default}
              />
              {/* <PositionCardLastUpdated timestamp={userIdentity.updated_at} /> */}
            </PositionCard> // TODO: Add last updated when we have it available
          ) : null}
          <IdentityStakeCard
            tvl={+formatBalance(BigInt(assets_sum), 18)}
            holders={accountResult?.account?.atom?.vault?.position_count ?? 0}
            variant={Identity.user} // TODO: Use the atom type to determine this once we have these
            // identityImgSrc={getAtomImage(accountResult?.account)} // TODO: Modify our utils and then re-add this
            identityImgSrc={accountResult?.account?.image ?? ''}
            // identityDisplayName={getAtomLabel(accountResult?.account)}
            identityDisplayName={accountResult?.account?.label ?? ''}
            onBuyClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                identity: accountResult?.account?.atom as Atom,
                isOpen: true,
              }))
            }
            onViewAllClick={() => navigate(PATHS.PROFILE_DATA_ABOUT)}
          />
        </>
      )}
    </div>
  )

  const rightPanel = isPending ? (
    <Banner
      variant="warning"
      title="Please Refresh the Page"
      message="It looks like the on-chain transaction was successful, but we're still waiting for the information to update. Please refresh the page to ensure everything is up to date."
    >
      <NavigationButton
        reloadDocument
        variant="secondary"
        to=""
        className="max-lg:w-full"
      >
        Refresh
      </NavigationButton>
    </Banner>
  ) : (
    <>
      <div className="flex flex-row justify-end mb-6 max-lg:justify-center">
        <SegmentedNav options={userIdentityRouteOptions} />
      </div>
      <Outlet />
    </>
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {!isPending && (
        <>
          <EditSocialLinksModal
            privyUser={JSON.parse(JSON.stringify(privyUser))}
            open={editSocialLinksModalActive}
            onClose={() => setEditSocialLinksModalActive(false)}
          />
          <StakeModal
            userWallet={userWallet}
            contract={MULTIVAULT_CONTRACT_ADDRESS}
            open={stakeModalActive.isOpen}
            identity={accountResult?.account?.atom as Atom}
            vaultId={stakeModalActive.vaultId}
            vaultDetailsProp={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }}
          />
          <TagsModal
            identity={accountResult?.account?.atom as Atom}
            tagClaims={accountTagsResult?.triples as Triple[]}
            userWallet={userWallet}
            open={tagsModalActive.isOpen}
            mode={tagsModalActive.mode}
            onClose={() => {
              setTagsModalActive({
                ...tagsModalActive,
                isOpen: false,
              })
              setSelectedTag(undefined)
            }}
          />
          {selectedTag && (
            <SaveListModal
              contract={MULTIVAULT_CONTRACT_ADDRESS}
              tagAtom={saveListModalActive.tag ?? selectedTag}
              atom={accountResult?.account?.atom as Atom}
              userWallet={userWallet}
              open={saveListModalActive.isOpen}
              onClose={() =>
                setSaveListModalActive({
                  ...saveListModalActive,
                  isOpen: false,
                })
              }
            />
          )}
        </>
      )}
      <ImageModal
        displayName={accountResult?.account?.label ?? ''}
        imageSrc={accountResult?.account?.image ?? ''}
        isUser={
          accountResult?.account?.type === 'Account' ||
          accountResult?.account?.type === 'Person' ||
          accountResult?.account?.type === 'Default'
        }
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />

      <PrivyRevalidate />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/layout" />
}
