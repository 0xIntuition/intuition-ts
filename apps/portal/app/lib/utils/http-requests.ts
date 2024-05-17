/**
 * This module exports HTTP requests utility functions.
 * These utilities handle common tasks such as building request URLs, sending the requests, and processing
 * the responses.
 * They ensure proper error handling by checking the response status and converting error messages
 * into meaningful exceptions.
 * The environment variable API_URL is used to define the base API endpoint, and an error is thrown during module
 * initialization if API_URL is not defined.
 */

import { authenticator } from '@server/auth'
import type { APIError } from '@types/query'

const apiUrl = process.env.API_URL
if (!apiUrl) {
  throw new Error('API_URL is not defined')
}

/**
 * Sends a GET request to the specified path and returns the result as JSON.
 */
export const apiGET = <TResult>(path: string, headers?: HeadersInit) => {
  const url = new URL(path, `https://dev.api.intuition.systems/auth`)
  const init = {
    method: 'GET',
    headers,
  }

  return fetch(url, init).then(checkResponse).then<TResult>(toJSON)
}

/**
 * Sends a POST request with a JSON body to the specified path and returns the result as JSON.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiPOST = <TResult, TBody = any>(
  path: string,
  body: TBody,
  headers?: HeadersInit,
) => {
  const url = new URL(path, `https://dev.api.intuition.systems/auth`)
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }

  return fetch(url, options).then(checkResponse).then<TResult>(toJSON)
}

/**
 * Parses the response body as JSON.
 */
export const toJSON = <TResult>(response: Response) =>
  response.json() as TResult

/**
 *
 * @param request
 * Handles unauthorized requests by logging out a user.
 */
export const handleUnauthorized = async (request: Request) => {
  try {
    await authenticator.logout(request, { redirectTo: '/' })
  } catch (error) {
    console.error('Failed to log out user:', error)
  }
}

/**
 * Checks if the fetch response is OK. If not, parses the error message and throws an appropriate error as well as the message and status
 */
export const checkResponse = async (
  response: Response,
  onUnauthorized?: () => Promise<void>,
) => {
  if (!response.ok) {
    const errorObj = (await response.json()) as { error: string }
    const errorMessage = errorObj.error

    if (response.status === 401 && onUnauthorized) {
      await onUnauthorized()
    }

    throw {
      name: 'APIError',
      message: errorMessage,
      status: response.status,
      fullError: errorObj,
    } as APIError
  }

  return response
}
