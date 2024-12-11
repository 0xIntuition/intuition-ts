import {
  Claim,
  ClaimStakeCard,
  Icon,
  Identity,
  PieChartVariant,
  PositionCard,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  Tag,
  TagSize,
  TagVariant,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  SortDirection,
} from '@0xintuition/api'
import {
  fetcher,
  GetAtomQuery,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
  useGetTripleQuery,
} from '@0xintuition/graphql'

import { DetailInfoCardNew } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import RemixLink from '@components/remix-link'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import StakeModal from '@components/stake/stake-modal'
import { useGetVaultDetails } from '@lib/hooks/useGetVaultDetails'
import { useGoBack } from '@lib/hooks/useGoBack'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaim } from '@lib/services/claims'
import { shareModalAtom, stakeModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const id = params.id
  if (!id) {
    throw new Error('Claim ID not found in the URL.')
  }

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const sortBy: ClaimSortColumn =
    (searchParams.get('sortBy') as ClaimSortColumn) ?? 'CreatedAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'

  const { claim } = await getClaim(request, id)
  if (!claim) {
    throw new Response('Not Found', { status: 404 })
  }

  const tripleResult = await fetcher<GetTripleQuery, GetTripleQueryVariables>(
    GetTripleDocument,
    {
      tripleId: id,
    },
  )()

  logger('tripleResult', tripleResult)

  await queryClient.prefetchQuery({
    queryKey: ['get-triple', { id: params.id }],
    queryFn: () => tripleResult,
  })

  return json({
    wallet,
    claim,
    sortBy,
    direction,
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      id,
      predicateId: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
      objectId: tripleResult?.triple?.id,
    },
  })
}

export interface ClaimDetailsLoaderData {
  wallet: string
  claim: ClaimPresenter
}

type Atom = GetAtomQuery['atom']

export default function ClaimDetails() {
  const { wallet, claim, initialParams } = useLiveLoader<{
    wallet: string
    claim: ClaimPresenter
    vaultDetails: VaultDetailsType
    initialParams: {
      id: string
      predicateId: string
      objectId: string
    }
  }>(['create', 'attest'])
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  const { data: tripleData } = useGetTripleQuery(
    {
      tripleId: initialParams.id,
    },
    {
      queryKey: [
        'get-triple',
        {
          id: initialParams.id,
        },
      ],
    },
  )

  logger('tripleData', tripleData)

  const { data: vaultDetails, isLoading: isLoadingVaultDetails } =
    useGetVaultDetails(
      MULTIVAULT_CONTRACT_ADDRESS,
      tripleData?.triple?.vault_id,
      tripleData?.triple?.counter_vault_id,
      {
        queryKey: [
          'get-vault-details',
          MULTIVAULT_CONTRACT_ADDRESS,
          tripleData?.triple?.vault_id,
          tripleData?.triple?.counter_vault_id,
        ],
        enabled:
          !!tripleData?.triple?.vault_id &&
          !!tripleData?.triple?.counter_vault_id,
      },
    )

  logger('Vault Details:', vaultDetails)

  const direction: 'for' | 'against' =
    (vaultDetails?.user_conviction_against ?? claim.user_conviction_against) ===
    '0'
      ? 'for'
      : 'against'

  const user_assets: string =
    (vaultDetails?.user_conviction ?? claim.user_conviction_for) > '0'
      ? vaultDetails?.user_assets ?? claim.user_assets_for
      : vaultDetails?.user_assets_against ?? claim.user_assets_against

  const assets_sum: string =
    (vaultDetails?.assets_sum ?? claim.for_assets_sum) > '0'
      ? vaultDetails?.assets_sum ?? claim.for_assets_sum
      : vaultDetails?.against_assets_sum ?? claim.against_assets_sum

  const userConviction =
    vaultDetails?.user_conviction ?? claim.user_conviction_for

  const directionTagVariant =
    +userConviction > 0 ? TagVariant.for : TagVariant.against

  const directionTagText = +userConviction > 0 ? 'FOR' : 'AGAINST'

  const handleGoBack = useGoBack({ fallbackRoute: PATHS.EXPLORE_CLAIMS })

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
      <NavigationButton
        variant="secondary"
        size="icon"
        to="#"
        onClick={handleGoBack}
      >
        <Icon name="arrow-left" />
      </NavigationButton>
      <div className="flex-row flex m-auto md:hidden">
        <Claim
          size="xl"
          maxIdentityLength={60}
          subject={{
            variant:
              tripleData?.triple?.subject?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.subject as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.subject as Atom),
            id: tripleData?.triple?.subject?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.subject as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.subject as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.subject as Atom),
            linkComponent: RemixLink,
          }}
          predicate={{
            variant:
              tripleData?.triple?.predicate?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.predicate as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.predicate as Atom),
            id: tripleData?.triple?.predicate?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.predicate as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.predicate as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.predicate as Atom),
            linkComponent: RemixLink,
          }}
          object={{
            variant:
              tripleData?.triple?.object?.type === 'Person'
                ? Identity.user
                : Identity.nonUser,
            label: getAtomLabelGQL(tripleData?.triple?.object as Atom),
            imgSrc: getAtomImageGQL(tripleData?.triple?.object as Atom),
            id: tripleData?.triple?.object?.id,
            description: getAtomDescriptionGQL(
              tripleData?.triple?.object as Atom,
            ),
            ipfsLink: getAtomIpfsLinkGQL(tripleData?.triple?.object as Atom),
            link: getAtomLinkGQL(tripleData?.triple?.object as Atom),
            linkComponent: RemixLink,
          }}
        />
      </div>
      {!!vaultDetails && !isLoadingVaultDetails && user_assets !== '0' ? (
        <PositionCard
          onButtonClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'redeem',
              modalType: 'claim',
              claim,
              vaultId:
                direction === 'for' ? claim.vault_id : claim.counter_vault_id,
              direction,
              isOpen: true,
            }))
          }
        >
          <div>
            <PositionCardStaked
              amount={user_assets ? +formatBalance(user_assets, 18) : 0}
            />
            <Tag variant={directionTagVariant} size={TagSize.sm}>
              {directionTagText}
            </Tag>
          </div>
          <PositionCardOwnership
            percentOwnership={
              user_assets !== null && assets_sum
                ? +calculatePercentageOfTvl(
                    user_assets,
                    (
                      +vaultDetails?.assets_sum +
                      +(vaultDetails?.against_assets_sum ?? '0')
                    ).toString(),
                  )
                : 0
            }
            variant={
              direction === 'for'
                ? PieChartVariant.for
                : PieChartVariant.against
            }
          />
          <PositionCardLastUpdated timestamp={claim.updated_at} />
        </PositionCard>
      ) : null}
      <ClaimStakeCard
        currency="ETH"
        totalTVL={
          +formatBalance(
            +(vaultDetails?.assets_sum ?? '0') +
              +(vaultDetails?.against_assets_sum ?? '0'),
          )
        }
        tvlAgainst={
          +formatBalance(
            vaultDetails?.against_assets_sum ?? claim.against_assets_sum,
          )
        }
        tvlFor={
          +formatBalance(vaultDetails?.assets_sum ?? claim.for_assets_sum)
        }
        numPositionsAgainst={claim.against_num_positions}
        numPositionsFor={claim.for_num_positions}
        onAgainstBtnClick={() =>
          setStakeModalActive((prevState) => ({
            ...prevState,
            mode: 'deposit',
            modalType: 'claim',
            claim,
            vaultId: claim.counter_vault_id,
            direction: 'against',
            isOpen: true,
          }))
        }
        onForBtnClick={() =>
          setStakeModalActive((prevState) => ({
            ...prevState,
            mode: 'deposit',
            modalType: 'claim',
            claim,
            vaultId: claim.vault_id,
            direction: 'for',
            isOpen: true,
          }))
        }
        disableForBtn={
          (vaultDetails?.user_conviction_against ??
            claim.user_conviction_against) > '0'
        }
        disableAgainstBtn={
          (vaultDetails?.user_conviction ?? claim.user_conviction_for) > '0'
        }
      />
      <DetailInfoCardNew
        variant={Identity.user}
        list={
          String(tripleData?.triple?.predicate?.id) ===
          String(getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId)
            ? tripleData?.triple
            : undefined
        }
        username={tripleData?.triple?.creator?.label ?? '?'}
        avatarImgSrc={tripleData?.triple?.creator?.image ?? ''}
        id={tripleData?.triple?.creator?.id ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id ? `${PATHS.PROFILE}/${claim.creator?.wallet}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${claim.creator?.wallet}`}
        timestamp={claim.created_at}
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
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel} />
      <StakeModal
        userWallet={wallet}
        contract={claim.contract}
        open={stakeModalActive.isOpen}
        direction={stakeModalActive.direction}
        claim={claim}
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
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id" />
}
