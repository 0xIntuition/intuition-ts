/**
 * This module exports HTTP requests utility functions.
 * These utilities handle common tasks such as building request URLs, sending the requests, and processing
 * the responses.
 * They ensure proper error handling by checking the response status and converting error messages
 * into meaningful exceptions.
 * The environment variable API_URL is used to define the base API endpoint, and an error is thrown during module
 * initialization if API_URL is not defined.
 */

export const privateApiUrl = process.env.PHOSPHOR_ADMIN_API_URL
if (!privateApiUrl) {
  throw new Error('PHOSPHOR_ADMIN_API_URL is not defined')
}

export const phosphorHeaders = {
  'Content-Type': 'application/json',
  'Phosphor-Api-Key': process.env.PHOSPHOR_API_KEY!,
}

/**
 * Sends a GET request to the specified path and returns the result as JSON.
 */
export const apiPrivateGET = <TResult>(
  path: string,
  headers: HeadersInit = phosphorHeaders,
) => {
  return apiGET<TResult>(privateApiUrl, path, headers)
}
export const apiGET = <TResult>(
  apiUrl: string,
  path: string,
  headers?: HeadersInit,
) => {
  const url = new URL(path, apiUrl)
  const init = {
    method: 'GET',
    headers,
  }
  return fetch(url, init).then(checkResponse).then<TResult>(toJSON)
}

/**
 * Parses the response body as JSON.
 */
export const toJSON = async <TResult>(response: Response) =>
  (await response.json()) as TResult

/**
 * Checks if the fetch response is OK. If not, parses the error message and throws an appropriate error
 */
export const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorObj = (await response.json()) as { error: string }
    const errorMessage = JSON.stringify(errorObj)
    throw new Error(`${errorMessage} (status: ${response.status})`)
  }
  return response
}
