import React from 'react'

import { render } from '@testing-library/react'

import { ProfileCard, ProfileCardProps } from './ProfileCard'

describe('ProfileCard', () => {
  const defaultProps: ProfileCardProps = {
    variant: 'user',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    name: 'John Doe',
    id: '0x1234567890abcdef1234567890abcdef12345678',
    stats: {
      numberOfFollowers: 123,
      numberOfFollowing: 45,
      points: 671234,
    },
    ipfsLink: 'https://ipfs.io/ipfs/QmZKfjJ8v',
    bio: 'John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.',
  }

  it('should render with default props', () => {
    const { asFragment } = render(<ProfileCard {...defaultProps} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-start w-full min-w-80 rounded-lg gap-2.5 max-lg:min-w-max max-lg:items-center"
        >
          <div
            class="flex items-center space-x-4"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                  />
                </svg>
              </span>
            </span>
            <div>
              <h6
                class="text-xl font-medium text-primary"
              >
                John Doe
              </h6>
              <div
                class="flex flex-row gap-1 items-center"
              >
                <a
                  href="https://ipfs.io/ipfs/QmZKfjJ8v"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p
                    class="text-base font-medium text-muted-foreground"
                  >
                    0x1234...5678
                  </p>
                </a>
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground bg-transparent border-transparent disabled:border-transparent disabled:bg-transparent shadow-md-subtle p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
                >
                  <svg
                    class="h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#copy"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex justify-start items-center gap-4 pt-2"
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
          <div>
            <p
              class="text-base font-medium text-primary-300 pt-2.5"
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
      variant: 'non-user',
      avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      name: 'Blockchain Corp',
      id: '0x1234567890abcdef1234567890abcdef12345678',
      stats: {
        numberOfFollowers: 300,
      },
      ipfsLink: 'https://ipfs.io/ipfs/QmZKfjJ8v',
      externalLink: 'https://blockchaincorp.com',
      bio: 'Blockchain Corp is a leading company in blockchain technology. Visit our website for more information about how you can benefit from our services.',
    }

    const { asFragment } = render(<ProfileCard {...entityProps} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col justify-center items-start w-full min-w-80 rounded-lg gap-2.5 max-lg:min-w-max max-lg:items-center"
        >
          <div
            class="flex items-center space-x-4"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#fingerprint"
                  />
                </svg>
              </span>
            </span>
            <div>
              <h6
                class="text-xl font-medium text-primary"
              >
                Blockchain Corp
              </h6>
              <div
                class="flex flex-row gap-1 items-center"
              >
                <a
                  href="https://ipfs.io/ipfs/QmZKfjJ8v"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p
                    class="text-base font-medium text-muted-foreground"
                  >
                    0x1234...5678
                  </p>
                </a>
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground bg-transparent border-transparent disabled:border-transparent disabled:bg-transparent shadow-md-subtle p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
                >
                  <svg
                    class="h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#copy"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <p
              class="text-base font-medium text-primary-300 pt-2.5"
            >
              Blockchain Corp is a leading company in blockchain technology. Visit our website for more information about how you can benefit from our services.
            </p>
            <div
              class="pt-2.5"
            >
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Link
              </p>
              <a
                href="https://blockchaincorp.com"
                rel="noreferrer noopener"
                target="_blank"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  https://blockchaincorp.com
                </p>
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
          class="flex flex-col justify-center items-start w-full min-w-80 rounded-lg gap-2.5 max-lg:min-w-max max-lg:items-center"
        >
          <div
            class="flex items-center space-x-4"
          >
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden aspect-square bg-background theme-border rounded-full"
            >
              <span
                class="flex h-full w-full items-center justify-center bg-inherit"
              >
                <svg
                  class="text-primary/30 w-[80%] h-[80%] max-w-8 max-h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#crypto-punk"
                  />
                </svg>
              </span>
            </span>
            <div>
              <h6
                class="text-xl font-medium text-primary"
              >
                John Doe
              </h6>
              <div
                class="flex flex-row gap-1 items-center"
              >
                <a
                  href="https://ipfs.io/ipfs/QmZKfjJ8v"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p
                    class="text-base font-medium text-muted-foreground"
                  >
                    0x1234...5678
                  </p>
                </a>
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground bg-transparent border-transparent disabled:border-transparent disabled:bg-transparent shadow-md-subtle p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
                >
                  <svg
                    class="h-4 w-4"
                  >
                    <use
                      href="/src/components/Icon/Icon.sprites.svg#copy"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex justify-start items-center gap-4 pt-2"
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
          <div>
            <p
              class="text-base font-medium text-primary-300 pt-2.5"
            >
              John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.
            </p>
          </div>
          <div
            class="flex justify-center w-full"
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
