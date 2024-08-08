import logger from '@lib/utils/logger'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { PATHS } from 'app/consts'

export async function loader() {
  return redirect(PATHS.EXPLORE_USERS)
}
