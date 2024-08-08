import { render } from '@testing-library/react'

import { ProfileCard, ProfileCardProps } from './ProfileCard'

describe('ProfileCard', () => {
  const defaultProps: ProfileCardProps = {
    variant: 'user',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
    name: 'John Doe',
    id: '0x1234567890abcdef1234567890abcdef12345678',
    vaultId: '131',
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
          class="flex flex-col justify-start items-start w-full min-w-[320px] max-w-full rounded-lg gap-2.5 p-4 overflow-hidden"
        >
          <div
            class="flex items-center space-x-4 w-full"
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
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent border-transparent disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none max-sm:py-2 max-sm:text-base p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
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
            <div
              class="w-full overflow-hidden"
            >
              <p
                class="text-base font-medium text-primary-300 pt-2.5 break-all whitespace-pre-wrap"
              >
                John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.
              </p>
            </div>
            <div
              class="pt-2.5 max-lg:flex max-lg:flex-col max-lg:items-center"
            >
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Vault ID
              </p>
              <p
                class="text-primary text-base font-normal"
              >
                131
              </p>
            </div>
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
          class="flex flex-col justify-start items-start w-full min-w-[320px] max-w-full rounded-lg gap-2.5 p-4 overflow-hidden"
        >
          <div
            class="flex items-center space-x-4 w-full"
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
              <button
                data-state="closed"
              >
                <h6
                  class="text-xl font-medium text-primary"
                >
                  Blockchai...
                </h6>
              </button>
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
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent border-transparent disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none max-sm:py-2 max-sm:text-base p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
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
            <div
              class="w-full overflow-hidden"
            >
              <p
                class="text-base font-medium text-primary-300 pt-2.5 break-all whitespace-pre-wrap"
              >
                Blockchain Corp is a leading company in blockchain technology. Visit our website for more information about how you can benefit from our services.
              </p>
            </div>
            <div
              class="pt-2.5 max-lg:flex max-lg:flex-col max-lg:items-center"
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
          class="flex flex-col justify-start items-start w-full min-w-[320px] max-w-full rounded-lg gap-2.5 p-4 overflow-hidden"
        >
          <div
            class="flex items-center space-x-4 w-full"
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
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:text-muted-foreground aria-disabled:text-muted-foreground aria-disabled:pointer-events-none bg-transparent border-transparent disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none max-sm:py-2 max-sm:text-base p-0 h-4 w-4 text-primary/60 hover:text-primary undefined"
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
            <div
              class="w-full overflow-hidden"
            >
              <p
                class="text-base font-medium text-primary-300 pt-2.5 break-all whitespace-pre-wrap"
              >
                John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.
              </p>
            </div>
            <div
              class="pt-2.5 max-lg:flex max-lg:flex-col max-lg:items-center"
            >
              <p
                class="text-base font-normal text-muted-foreground"
              >
                Vault ID
              </p>
              <p
                class="text-primary text-base font-normal"
              >
                131
              </p>
            </div>
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
