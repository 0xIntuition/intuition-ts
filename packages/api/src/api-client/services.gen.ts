// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import type {
  ActivateLinkedAccountData,
  ActivateLinkedAccountResponse,
  AddWebhookData,
  AddWebhookResponse,
  AlchemyWebhookData,
  AlchemyWebhookResponse,
  AuthData,
  AuthResponse,
  CreateClaimData,
  CreateClaimResponse,
  CreateIdentityData,
  CreateIdentityResponse,
  CreateLinkedAccountData,
  CreateLinkedAccountResponse,
  CreatePositionData,
  CreatePositionResponse,
  CreateUserData,
  CreateUserResponse,
  DeactivateLinkedAccountData,
  DeactivateLinkedAccountResponse,
  DeleteUserData,
  DeleteUserResponse,
  GetActivityByIdData,
  GetActivityByIdResponse,
  GetAllResponse,
  GetAllUsersTotalsResponse,
  GetClaimByIdData,
  GetClaimByIdResponse,
  GetClaimPositionsResponse,
  GetIdentitiesData,
  GetIdentitiesResponse,
  GetIdentityByIdData,
  GetIdentityByIdResponse,
  GetIdentityPositionsResponse,
  GetLinkedAccountByIdData,
  GetLinkedAccountByIdResponse,
  GetLinkedAccountsData,
  GetLinkedAccountsResponse,
  GetPositionByIdData,
  GetPositionByIdResponse,
  GetQueryStructureResponse,
  GetUserByIdData,
  GetUserByIdPublicData,
  GetUserByIdPublicResponse,
  GetUserByIdResponse,
  GetUserByWalletData,
  GetUserByWalletPublicData,
  GetUserByWalletPublicResponse,
  GetUserByWalletResponse,
  GetUserIdentitiesResponse,
  GetUsersPositionsResponse,
  GetUsersResponse,
  GetUserTotalsData,
  GetUserTotalsResponse,
  RefreshData,
  RefreshResponse,
  ReissueApiKeyResponse,
  RevokeResponse,
  RunDynamicQueryData,
  RunDynamicQueryResponse,
  SearchClaimsData,
  SearchClaimsResponse,
  SearchData,
  SearchIdentityData,
  SearchIdentityResponse,
  SearchPositionsData,
  SearchPositionsResponse,
  SearchResponse,
  UpdateClaimData,
  UpdateClaimResponse,
  UpdateIdentityData,
  UpdateIdentityResponse,
  UpdatePositionData,
  UpdatePositionResponse,
  UpdateUserData,
  UpdateUserEnsData,
  UpdateUserEnsResponse,
  UpdateUserPointsData,
  UpdateUserPointsResponse,
  UpdateUserResponse,
} from './types.gen'

export class AlchemyControllerService {
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Receive message from Alchemy
   * @throws ApiError
   */
  public static alchemyWebhook(
    data: AlchemyWebhookData,
  ): CancelablePromise<AlchemyWebhookResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/Alchemy',
      body: data.requestBody,
      mediaType: 'application/octet-stream',
    })
  }
}

export class ActivitiesService {
  /**
   * @param data The data for the request.
   * @param data.blockNumber
   * @param data.vaultId
   * @param data.paging
   * @param data.sort
   * @param data.eventType
   * @param data.contract
   * @param data.creator
   * @param data.blockHash
   * @param data.transactionHash
   * @param data.fromAddress
   * @returns unknown Search activities in paginated list
   * @throws ApiError
   */
  public static search(data: SearchData): CancelablePromise<SearchResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/activities',
      query: {
        eventType: data.eventType,
        contract: data.contract,
        creator: data.creator,
        blockHash: data.blockHash,
        transactionHash: data.transactionHash,
        blockNumber: data.blockNumber,
        fromAddress: data.fromAddress,
        vaultId: data.vaultId,
        paging: data.paging,
        sort: data.sort,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Activity sql id
   * @returns unknown Get single activity by id
   * @throws ApiError
   */
  public static getActivityById(
    data: GetActivityByIdData,
  ): CancelablePromise<GetActivityByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/activities/:id',
      path: {
        id: data.id,
      },
    })
  }
}

export class AuthService {
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Return JWT token using api key and did session
   * @throws ApiError
   */
  public static auth(data: AuthData): CancelablePromise<AuthResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Refresh JWT and refresh token
   * @throws ApiError
   */
  public static refresh(data: RefreshData): CancelablePromise<RefreshResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/refresh',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @returns unknown Revoke JWT token
   * @throws ApiError
   */
  public static revoke(): CancelablePromise<RevokeResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/revoke',
    })
  }
}

export class ClaimPositionsService {
  /**
   * @returns unknown Get all claim positions
   * @throws ApiError
   */
  public static getClaimPositions(): CancelablePromise<GetClaimPositionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/claim/:id/positions',
    })
  }
}

export class ClaimsService {
  /**
   * @returns unknown Get all claims in paginated list
   * @throws ApiError
   */
  public static getAll(): CancelablePromise<GetAllResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/claims',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Create a new claim
   * @throws ApiError
   */
  public static createClaim(
    data: CreateClaimData,
  ): CancelablePromise<CreateClaimResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/claims',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Claim sql id or vault number
   * @returns unknown Get single claim by id
   * @throws ApiError
   */
  public static getClaimById(
    data: GetClaimByIdData,
  ): CancelablePromise<GetClaimByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/claims/:id',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Claim sql id
   * @param data.requestBody
   * @returns unknown Update a claim
   * @throws ApiError
   */
  public static updateClaim(
    data: UpdateClaimData,
  ): CancelablePromise<UpdateClaimResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/claims/:id',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.paging
   * @param data.creator
   * @param data.subject
   * @param data.identity
   * @param data.object
   * @param data.predicate
   * @param data.vault
   * @param data.displayName
   * @param data.counterVault
   * @param data.status
   * @param data.forUser
   * @param data.againstUser
   * @returns unknown Search claims in paginated list
   * @throws ApiError
   */
  public static searchClaims(
    data: SearchClaimsData,
  ): CancelablePromise<SearchClaimsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/claims/search',
      query: {
        creator: data.creator,
        subject: data.subject,
        identity: data.identity,
        object: data.object,
        predicate: data.predicate,
        vault: data.vault,
        display_name: data.displayName,
        counter_vault: data.counterVault,
        status: data.status,
        for_user: data.forUser,
        against_user: data.againstUser,
        paging: data.paging,
      },
    })
  }
}

export class IdentitiesService {
  /**
   * @param data The data for the request.
   * @param data.paging
   * @param data.sort
   * @param data.userWallet
   * @param data.timeframe
   * @returns unknown Get all identities in paginated list
   * @throws ApiError
   */
  public static getIdentities(
    data: GetIdentitiesData,
  ): CancelablePromise<GetIdentitiesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/identities',
      query: {
        userWallet: data.userWallet,
        timeframe: data.timeframe,
        paging: data.paging,
        sort: data.sort,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Identity sql id
   * @param data.requestBody
   * @returns unknown Update an identity
   * @throws ApiError
   */
  public static updateIdentity(
    data: UpdateIdentityData,
  ): CancelablePromise<UpdateIdentityResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/identities/:id',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Create a new identity
   * @throws ApiError
   */
  public static createIdentity(
    data: CreateIdentityData,
  ): CancelablePromise<CreateIdentityResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/identity',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.identifier sql id,identity_id string, or vault number
   * @returns unknown Get single identity by id
   * @throws ApiError
   */
  public static getIdentityById(
    data: GetIdentityByIdData,
  ): CancelablePromise<GetIdentityByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/identity/:id',
      path: {
        identifier: data.identifier,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.paging
   * @param data.sort
   * @param data.displayName
   * @param data.creator
   * @param data.userWallet
   * @param data.status
   * @param data.predicate
   * @param data.isUser
   * @param data.isContract
   * @param data.timeframe
   * @param data.identityId
   * @param data.description
   * @returns unknown Search identities in paginated list
   * @throws ApiError
   */
  public static searchIdentity(
    data: SearchIdentityData,
  ): CancelablePromise<SearchIdentityResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/identity/search',
      query: {
        displayName: data.displayName,
        creator: data.creator,
        userWallet: data.userWallet,
        status: data.status,
        predicate: data.predicate,
        isUser: data.isUser,
        isContract: data.isContract,
        timeframe: data.timeframe,
        identityId: data.identityId,
        paging: data.paging,
        sort: data.sort,
        description: data.description,
      },
    })
  }
}

export class IdentityPositionsService {
  /**
   * @returns unknown Get all identity positions
   * @throws ApiError
   */
  public static getIdentityPositions(): CancelablePromise<GetIdentityPositionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/identity/:id/positions',
    })
  }
}

export class LinkedAccountsService {
  /**
   * @param data The data for the request.
   * @param data.paging
   * @param data.sort
   * @param data.accountType
   * @param data.address
   * @param data.chainType
   * @param data.walletClient
   * @param data.walletClientType
   * @param data.connectorType
   * @param data.userId
   * @param data.privyId
   * @param data.active
   * @returns unknown Get all linked accounts in paginated list
   * @throws ApiError
   */
  public static getLinkedAccounts(
    data: GetLinkedAccountsData,
  ): CancelablePromise<GetLinkedAccountsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/linked_accounts',
      query: {
        account_type: data.accountType,
        address: data.address,
        chain_type: data.chainType,
        wallet_client: data.walletClient,
        wallet_client_type: data.walletClientType,
        connector_type: data.connectorType,
        user_id: data.userId,
        privy_id: data.privyId,
        active: data.active,
        paging: data.paging,
        sort: data.sort,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Create a new LinkedAccount for a user
   * @throws ApiError
   */
  public static createLinkedAccount(
    data: CreateLinkedAccountData,
  ): CancelablePromise<CreateLinkedAccountResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/linked_accounts',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.identifier LinkedAccount sql id or link id str
   * @returns unknown Get single linked account by id
   * @throws ApiError
   */
  public static getLinkedAccountById(
    data: GetLinkedAccountByIdData,
  ): CancelablePromise<GetLinkedAccountByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/linked_accounts/:identifier',
      path: {
        identifier: data.identifier,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.identifier sql id or link id str
   * @returns unknown Activate linked account
   * @throws ApiError
   */
  public static activateLinkedAccount(
    data: ActivateLinkedAccountData,
  ): CancelablePromise<ActivateLinkedAccountResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/linked_accounts/:identifier/activate',
      path: {
        identifier: data.identifier,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.identifier LinkedAccount sql id or link id str
   * @returns unknown Deactivate linked account
   * @throws ApiError
   */
  public static deactivateLinkedAccount(
    data: DeactivateLinkedAccountData,
  ): CancelablePromise<DeactivateLinkedAccountResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/linked_accounts/:identifier/deactivate',
      path: {
        identifier: data.identifier,
      },
    })
  }
}

export class PositionsService {
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Create a new position
   * @throws ApiError
   */
  public static createPosition(
    data: CreatePositionData,
  ): CancelablePromise<CreatePositionResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/positions',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Position sql id or vault number
   * @returns unknown Get single position by id
   * @throws ApiError
   */
  public static getPositionById(
    data: GetPositionByIdData,
  ): CancelablePromise<GetPositionByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/positions/:id',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Position sql id
   * @param data.requestBody
   * @returns unknown Update an position
   * @throws ApiError
   */
  public static updatePosition(
    data: UpdatePositionData,
  ): CancelablePromise<UpdatePositionResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/positions/:id',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.paging
   * @param data.sort
   * @param data.creator
   * @param data.vaultUuid
   * @param data.status
   * @param data.conviction
   * @param data.claim
   * @param data.identity
   * @param data.vault
   * @returns unknown Search positions in paginated list
   * @throws ApiError
   */
  public static searchPositions(
    data: SearchPositionsData,
  ): CancelablePromise<SearchPositionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/positions/search',
      query: {
        creator: data.creator,
        vault_uuid: data.vaultUuid,
        status: data.status,
        conviction: data.conviction,
        claim: data.claim,
        identity: data.identity,
        vault: data.vault,
        paging: data.paging,
        sort: data.sort,
      },
    })
  }
}

export class QueryBuilderService {
  /**
   * @returns unknown Return the query builder data structure for use with FE typeahead
   * @throws ApiError
   */
  public static getQueryStructure(): CancelablePromise<GetQueryStructureResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/query_builder',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Return query results if the query in body is valid
   * @throws ApiError
   */
  public static runDynamicQuery(
    data: RunDynamicQueryData,
  ): CancelablePromise<RunDynamicQueryResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/query_builder',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }
}

export class UsersService {
  /**
   * @returns unknown Get all users in paginated list
   * @throws ApiError
   */
  public static getUsers(): CancelablePromise<GetUsersResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Create a new user
   * @throws ApiError
   */
  public static createUser(
    data: CreateUserData,
  ): CancelablePromise<CreateUserResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/users',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id
   * @returns unknown Get single user by id
   * @throws ApiError
   */
  public static getUserByIdPublic(
    data: GetUserByIdPublicData,
  ): CancelablePromise<GetUserByIdPublicResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/:id',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id
   * @param data.requestBody
   * @returns unknown Update a user
   * @throws ApiError
   */
  public static updateUser(
    data: UpdateUserData,
  ): CancelablePromise<UpdateUserResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/:id',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id Id of user to delete
   * @returns unknown Delete a user by id
   * @throws ApiError
   */
  public static deleteUser(
    data: DeleteUserData,
  ): CancelablePromise<DeleteUserResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/users/:id',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id or wallet
   * @returns unknown Update a users ens if present
   * @throws ApiError
   */
  public static updateUserEns(
    data: UpdateUserEnsData,
  ): CancelablePromise<UpdateUserEnsResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/:id/ens',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id
   * @returns unknown Get linked accounts for user
   * @throws ApiError
   */
  public static getLinkedAccounts(
    data: GetLinkedAccountsData,
  ): CancelablePromise<GetLinkedAccountsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/:id/linked_accounts',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id
   * @param data.requestBody
   * @returns unknown Add points for user
   * @throws ApiError
   */
  public static updateUserPoints(
    data: UpdateUserPointsData,
  ): CancelablePromise<UpdateUserPointsResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/users/:id/points',
      path: {
        id: data.id,
      },
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id
   * @returns unknown Get single user by id
   * @throws ApiError
   */
  public static getUserById(
    data: GetUserByIdData,
  ): CancelablePromise<GetUserByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/:id/private',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.id User sql id
   * @returns unknown Get total position values for user
   * @throws ApiError
   */
  public static getUserTotals(
    data: GetUserTotalsData,
  ): CancelablePromise<GetUserTotalsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/:id/totals',
      path: {
        id: data.id,
      },
    })
  }

  /**
   * @returns unknown Re-issue API key
   * @throws ApiError
   */
  public static reissueApiKey(): CancelablePromise<ReissueApiKeyResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/users/apikey',
    })
  }

  /**
   * @returns unknown Get identities user has position on
   * @throws ApiError
   */
  public static getUserIdentities(): CancelablePromise<GetUserIdentitiesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/identities',
    })
  }

  /**
   * @returns unknown Get positions for user
   * @throws ApiError
   */
  public static getUsersPositions(): CancelablePromise<GetUsersPositionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/positions',
    })
  }

  /**
   * @returns unknown Get total position values for paginated set of users
   * @throws ApiError
   */
  public static getAllUsersTotals(): CancelablePromise<GetAllUsersTotalsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/totals',
    })
  }

  /**
   * @param data The data for the request.
   * @param data.wallet User wallet
   * @returns unknown Get single user by id
   * @throws ApiError
   */
  public static getUserByWalletPublic(
    data: GetUserByWalletPublicData,
  ): CancelablePromise<GetUserByWalletPublicResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/wallet/:wallet',
      path: {
        wallet: data.wallet,
      },
    })
  }

  /**
   * @param data The data for the request.
   * @param data.wallet User wallet
   * @returns unknown Get single user by id
   * @throws ApiError
   */
  public static getUserByWallet(
    data: GetUserByWalletData,
  ): CancelablePromise<GetUserByWalletResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/wallet/:wallet/private',
      path: {
        wallet: data.wallet,
      },
    })
  }
}

export class WebhooksService {
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Add new alchemy webhook
   * @throws ApiError
   */
  public static addWebhook(
    data: AddWebhookData,
  ): CancelablePromise<AddWebhookResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/webhooks',
      body: data.requestBody,
      mediaType: 'application/json',
    })
  }
}
