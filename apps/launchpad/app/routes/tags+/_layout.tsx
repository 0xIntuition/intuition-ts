import * as React from 'react'

import { IconName, SidebarProvider } from '@0xintuition/1ui'
import {
  fetcher,
  GetTagsSidebarDocument,
  GetTagsSidebarQuery,
  GetTagsSidebarQueryVariables,
  useGetTagsSidebarQuery,
} from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLocation } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { FileExplorerSidebar } from '../../components/FileExplorerSidebar'

// Transform function to convert triples to tree structure
function transformTriplesToTree(triples: GetTagsSidebarQuery['triples']) {
  if (!triples?.length) {
    return []
  }

  const predicate = triples[0].predicate

  return [
    {
      id: predicate.id,
      name: predicate.label?.toLowerCase().replace(/ /g, '_') || '',
      path: `/tags/${predicate.id}`,
      icon: IconName.folder,
      type: 'folder' as const,
      items: triples.map((triple) => ({
        id: triple.object.id,
        name: triple.object.label || '',
        path: `/tags/${predicate.id}/${triple.object.id}`,
        icon: IconName.folder,
        type: 'folder' as const,
        items: triple.object.as_subject_triples.map((subTriple) => ({
          id: subTriple.object.id,
          name: subTriple.object.label || '',
          path: `/tags/${predicate.id}/${triple.object.id}/${subTriple.object.id}`,
          icon: IconName.circle,
          type: 'item' as const,
        })),
      })),
    },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-tags-sidebar'],
    queryFn: () =>
      fetcher<GetTagsSidebarQuery, GetTagsSidebarQueryVariables>(
        GetTagsSidebarDocument,
        {
          subjectId: 13, // Intuition
          predicateId: 4, // has_tag
        },
      ),
  })

  return {
    dehydratedState: dehydrate(queryClient),
  }
}

export default function TagsLayout() {
  const location = useLocation()

  const { data: triplesData } = useGetTagsSidebarQuery(
    {
      subjectId: 13, // Intuition
      predicateId: 4, // has_tag
    },
    {
      queryKey: ['get-tags-sidebar'],
    },
  )

  const tagsTree = React.useMemo(() => {
    if (!triplesData?.triples) {
      return []
    }
    return transformTriplesToTree(triplesData.triples)
  }, [triplesData])

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <FileExplorerSidebar
          items={tagsTree}
          selectedPath={location.pathname}
        />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
