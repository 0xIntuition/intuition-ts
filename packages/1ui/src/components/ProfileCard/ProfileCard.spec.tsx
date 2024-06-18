import React from 'react'

import { render } from '@testing-library/react'

import { ProfileCard, ProfileCardProps } from './ProfileCard'

describe('ProfileCard', () => {
  const defaultProps: ProfileCardProps = {
    type: 'user',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    stats: {
      numberOfFollowers: 123,
      numberOfFollowing: 45,
      points: 671234,
    },
    bio: 'John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.',
  }

  it('should render with default props', () => {
    const { asFragment } = render(<ProfileCard {...defaultProps} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-start w-[300px] rounded-lg box-border"
        >
          <div
            class="flex items-center space-x-4"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
            >
              <span
                class="bg-muted flex h-full w-full items-center justify-center rounded-full"
              >
                Jo
              </span>
            </span>
            <div>
              <h6
                class="text-xl font-medium text-primary"
              >
                John Doe
              </h6>
              <p
                class="text-base font-medium text-muted-foreground"
              >
                0x1234...5678
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center space-x-4 mt-5"
          >
            <div
              class="flex items-center space-x-1"
            >
              <p
                class="text-base font-medium text-primary-300"
              >
                45
              </p>
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Following
              </p>
            </div>
            <div
              class="flex items-center space-x-1"
            >
              <p
                class="text-base font-medium text-primary-300"
              >
                123
              </p>
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Followers
              </p>
            </div>
            <div
              class="flex items-center space-x-1"
            >
              <p
                class="text-base font-medium text-success"
              >
                671k
              </p>
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Points
              </p>
            </div>
          </div>
          <div
            class="mt-5"
          >
            <p
              class="text-base font-medium text-primary-300"
            >
              John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render with entity type and link', () => {
    const entityProps: ProfileCardProps = {
      type: 'entity',
      avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      name: 'Blockchain Corp',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      stats: {
        numberOfFollowers: 300,
      },
      link: 'https://blockchaincorp.com',
      bio: 'Blockchain Corp is a leading company in blockchain technology. Visit our website for more information about how you can benefit from our services.',
    }

    const { asFragment } = render(<ProfileCard {...entityProps} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-start w-[300px] rounded-lg box-border"
        >
          <div
            class="flex items-center space-x-4"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-lg"
            >
              <span
                class="bg-muted flex h-full w-full items-center justify-center rounded-full"
              >
                Bl
              </span>
            </span>
            <div>
              <h6
                class="text-xl font-medium text-primary"
              >
                Blockchain Corp
              </h6>
              <p
                class="text-base font-medium text-muted-foreground"
              >
                0x1234...5678
              </p>
            </div>
          </div>
          <div
            class="mt-5"
          >
            <p
              class="text-base font-medium text-primary-300"
            >
              Blockchain Corp is a leading company in blockchain technology. Visit our website for more information about how you can benefit from our services.
            </p>
            <div
              class="mt-5"
            >
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Link
              </p>
              <a
                class="text-primary-300"
                href="https://blockchaincorp.com"
              >
                https://blockchaincorp.com
              </a>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render child elements', () => {
    const { asFragment, getByText } = render(
      <ProfileCard {...defaultProps}>
        <button>Follow</button>
      </ProfileCard>,
    )
    expect(getByText('Follow')).toBeDefined()
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-start w-[300px] rounded-lg box-border"
        >
          <div
            class="flex items-center space-x-4"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
            >
              <span
                class="bg-muted flex h-full w-full items-center justify-center rounded-full"
              >
                Jo
              </span>
            </span>
            <div>
              <h6
                class="text-xl font-medium text-primary"
              >
                John Doe
              </h6>
              <p
                class="text-base font-medium text-muted-foreground"
              >
                0x1234...5678
              </p>
            </div>
          </div>
          <div
            class="flex justify-between items-center space-x-4 mt-5"
          >
            <div
              class="flex items-center space-x-1"
            >
              <p
                class="text-base font-medium text-primary-300"
              >
                45
              </p>
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Following
              </p>
            </div>
            <div
              class="flex items-center space-x-1"
            >
              <p
                class="text-base font-medium text-primary-300"
              >
                123
              </p>
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Followers
              </p>
            </div>
            <div
              class="flex items-center space-x-1"
            >
              <p
                class="text-base font-medium text-success"
              >
                671k
              </p>
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Points
              </p>
            </div>
          </div>
          <div
            class="mt-5"
          >
            <p
              class="text-base font-medium text-primary-300"
            >
              John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.
            </p>
          </div>
          <div
            class="flex justify-center w-full mt-5"
          >
            <button>
              Follow
            </button>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
