import { useEffect, useState } from 'react'

import {
  Icon,
  Identity,
  IdentityStakeCard,
  PieChartVariant,
  PositionCard, // TODO: Add last updated when we have it available
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
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables,
  useGetAtomQuery,
  useGetTagsQuery,
} from '@0xintuition/graphql'

import { DetailInfoCardNew } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import ImageModal from '@components/profile/image-modal'
import SaveListModal from '@components/save-list/save-list-modal'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import {
  imageModalAtom,
  saveListModalAtom,
  shareModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import { calculatePercentageOfTvl, formatBalance } from '@lib/utils/misc'
import { usePrivy } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { getUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { Atom } from 'app/types/atom'
import { Triple } from 'app/types/triple'
import { useAtom } from 'jotai'
import { zeroAddress } from 'viem'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await getUserWallet(request)
  const queryAddress = userWallet?.toLowerCase() ?? zeroAddress

  if (!params.id) {
    return
  }

  const queryClient = new QueryClient()

  let atomResult: GetAtomQuery | null = null

  try {
    logger('Fetching Account Data...')
    atomResult = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
      GetAtomDocument,
      { id: params.id },
    )()

    if (!atomResult) {
      throw new Error('No atom data found for id')
    }

    logger('Atom Result:', atomResult)

    await queryClient.prefetchQuery({
      queryKey: ['get-atom', { id: params.id }],
      queryFn: () => atomResult,
    })

    const atomTagsResult = await fetcher<GetTagsQuery, GetTagsQueryVariables>(
      GetTagsDocument,
      {
        subjectId: params.id,
        predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
      },
    )()

    logger('Atom Tags Result:', atomTagsResult)

    await queryClient.prefetchQuery({
      queryKey: [
        'get-tags',
        {
          subjectId: params.id,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      queryFn: () => atomTagsResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      atomId: params.id,
    })
    throw error
  }

  logger('[$ID] -- END')
  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      atomId: params.id,
      queryAddress,
    },
    userWallet,
  })
}

export interface IdentityLoaderData {
  initialParams: {
    queryAddress: string
    atomId: string
  }
  userWallet: string
}

export default function IdentityDetails() {
  const { initialParams, userWallet } = useLoaderData<IdentityLoaderData>()
  const { user: privyUser } = usePrivy()
  const navigate = useNavigate()

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [selectedTag, setSelectedTag] = useState<Atom | null | undefined>(null)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  const { data: atomResult } = useGetAtomQuery(
    {
      id: initialParams.atomId,
    },
    {
      queryKey: ['get-atom', { id: initialParams.atomId }],
    },
  )

  logger('Atom Result (Client):', atomResult)

  const { data: atomTagsResult } = useGetTagsQuery(
    {
      subjectId: initialParams.atomId,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    {
      queryKey: [
        'get-tags',
        {
          subjectId: initialParams?.atomId,
          predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
        },
      ],
      enabled: !!initialParams?.atomId,
    },
  )

  logger('Atom Tags Result (Client):', atomTagsResult)

  const { data: vaultDetails } = useGetVaultDetails(
    MULTIVAULT_CONTRACT_ADDRESS,
    initialParams.atomId,
    undefined, // no counterVaultId
    {
      queryKey: [
        'get-vault-details',
        MULTIVAULT_CONTRACT_ADDRESS,
        initialParams.atomId,
      ],
    },
  )

  logger('Vault Details:', vaultDetails)

  const user_assets = vaultDetails
    ? vaultDetails.user_assets
    : atomResult?.atom?.vault?.current_share_price &&
        atomResult?.atom?.vault?.positions?.[0]?.shares
      ? (BigInt(atomResult?.atom.vault.current_share_price) *
          BigInt(atomResult?.atom.vault.positions[0].shares)) /
        BigInt(10 ** 18) // Division to get the correct decimal places
      : 0n
  const assets_sum = vaultDetails
    ? vaultDetails.assets_sum
    : atomResult?.atom?.vault?.current_share_price &&
        atomResult?.atom?.vault?.total_shares
      ? (BigInt(atomResult?.atom.vault.current_share_price) *
          BigInt(atomResult?.atom.vault.total_shares)) /
        BigInt(10 ** 18) // Division to get the correct decimal places
      : 0n

  const leftPanel = (
    <div className="flex-col justify-start items-start inline-flex gap-6 max-lg:w-full">
      <ProfileCard
        variant={Identity.nonUser}
        avatarSrc={atomResult?.atom?.image ?? ''}
        name={atomResult?.atom?.label ?? ''}
        id={atomResult?.atom?.data ?? ''}
        vaultId={atomResult?.atom?.id ?? 0}
        bio={
          atomResult?.atom?.value?.thing?.description ??
          atomResult?.atom?.value?.organization?.description ??
          atomResult?.atom?.value?.person?.description ??
          ''
        }
        ipfsLink={atomResult?.atom?.data ?? ''}
        externalLink={
          atomResult?.atom?.value?.thing?.url ??
          atomResult?.atom?.value?.organization?.url ??
          atomResult?.atom?.value?.person?.url ??
          ''
        }
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
          })
        }}
      />

      <>
        <Tags>
          <div className="flex flex-row gap-2 md:flex-col">
            {atomTagsResult && atomTagsResult.triples.length > 0 ? (
              <TagsContent numberOfTags={atomTagsResult.triples?.length ?? 0}>
                {atomTagsResult.triples.slice(0, 5).map((tag) => (
                  <TagWithValue
                    key={tag.id}
                    label={tag.object?.label ?? ''}
                    value={tag.vault?.allPositions?.aggregate?.count ?? 0}
                    onStake={() => {
                      setSelectedTag(tag?.object as unknown as Atom) // TODO: (ENG-4782) temporary type fix until we lock in final types
                      setSaveListModalActive({
                        isOpen: true,
                        id: tag.id,
                        tag: tag.object as unknown as Atom, // TODO: (ENG-4782) temporary type fix until we lock in final types
                      })
                    }}
                  />
                ))}
              </TagsContent>
            ) : null}
            {privyUser?.wallet?.address && (
              <Tag
                className="w-fit border-dashed"
                onClick={() => {
                  setTagsModalActive({ isOpen: true, mode: 'add' })
                }}
              >
                <Icon name="plus-small" className="w-5 h-5" />
                Add tags
              </Tag>
            )}
          </div>

          <TagsButton
            onClick={() => {
              setTagsModalActive({ isOpen: true, mode: 'view' })
            }}
          />
        </Tags>
        {vaultDetails !== null &&
        user_assets !== '0' &&
        privyUser?.wallet?.address ? (
          <PositionCard
            onButtonClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'redeem',
                modalType: 'identity',
                identity: atomResult?.atom as Atom,
                isOpen: true,
              }))
            }
          >
            <PositionCardStaked
              amount={user_assets ? +formatBalance(user_assets, 18) : 0}
            />
            <PositionCardOwnership
              percentOwnership={
                user_assets !== null && assets_sum
                  ? +calculatePercentageOfTvl(
                      user_assets?.toString() ?? '0',
                      assets_sum?.toString() ?? '0',
                    )
                  : 0
              }
              variant={PieChartVariant.default}
            />
            {/* <PositionCardLastUpdated
                timestamp={atomResult?.atom?.block_timestamp ?? ''}
              /> */}
          </PositionCard> // TODO: Add last updated when we have it available
        ) : null}
        <IdentityStakeCard
          tvl={+formatBalance(assets_sum, 18)}
          holders={atomResult?.atom?.vault?.position_count ?? 0}
          variant={Identity.nonUser} // TODO: Use the atom type to determine this once we have these
          identityImgSrc={atomResult?.atom?.image ?? ''}
          identityDisplayName={atomResult?.atom?.label ?? ''}
          onBuyClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'identity',
              identity: atomResult?.atom as Atom,
              isOpen: true,
            }))
          }
          onViewAllClick={() =>
            navigate(`${PATHS.IDENTITY}/${atomResult?.atom?.id}#positions`)
          }
          isConnected={!!privyUser}
        />
      </>
      <DetailInfoCardNew
        variant={Identity.user}
        username={atomResult?.atom?.creator?.label ?? '?'}
        avatarImgSrc={atomResult?.atom?.creator?.image ?? ''}
        id={atomResult?.atom?.creator?.id ?? ''}
        description={''}
        link={
          atomResult?.atom?.creator?.id
            ? `${PATHS.PROFILE}/${atomResult?.atom?.creator?.id}`
            : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${atomResult?.atom?.creator?.id}`}
        // timestamp={atomResult?.atom?.blockTimestamp ?? new Date().toISOString()} // TODO: Add this once we have it on the atom
        timestamp={new Date().toISOString()}
        className="w-full"
      />
      <ShareCta
        onShareClick={() =>
          setShareModalActive({
            isOpen: true,
            currentPath: location.pathname,
          })
        }
      />
    </div>
  )

  const rightPanel = <Outlet />

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {userWallet && (
        <>
          <StakeModal
            userWallet={userWallet}
            contract={MULTIVAULT_CONTRACT_ADDRESS}
            open={stakeModalActive.isOpen}
            identity={atomResult?.atom as Atom}
            vaultId={stakeModalActive.vaultId}
            vaultDetailsProp={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
                mode: undefined,
              }))
            }}
          />
          {selectedTag && (
            <SaveListModal
              contract={MULTIVAULT_CONTRACT_ADDRESS}
              tagAtom={saveListModalActive.tag ?? selectedTag}
              atom={atomResult?.atom as Atom}
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
      <TagsModal
        identity={atomResult?.atom as Atom}
        tagClaims={atomTagsResult?.triples as Triple[]}
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
      <ImageModal
        displayName={atomResult?.atom?.label ?? ''}
        imageSrc={atomResult?.atom?.image ?? ''}
        isUser={
          atomResult?.atom?.type === 'Account' ||
          atomResult?.atom?.type === 'Person' ||
          atomResult?.atom?.type === 'Default'
        }
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />
      <ShareModal
        currentPath={location.pathname}
        open={shareModalActive.isOpen}
        onClose={() =>
          setShareModalActive({
            ...shareModalActive,
            isOpen: false,
          })
        }
      />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="identity/$id" />
}
