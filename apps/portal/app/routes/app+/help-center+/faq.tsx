import React from 'react'

import { Text, TextVariant, TextWeight } from '@0xintuition/1ui'

export const identityFaq = [
  {
    question: 'What are Atoms/Identities?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          In the Intuition system, the atomic unit of knowledge is known as an
          ‘Atom’. Every concept - be it a person, an organization, a word, a
          product, or a protocol - is represented by an Atom, serving as a
          conceptual anchor for attaching and correlating data, experiences, and
          perceptions. Atoms are also often referred to as ‘Identities’ because
          they aim to prescribe everything in the world with an associated
          globally persistent digital identifier and relevant associated data,
          allowing us to reference things universally across the web!
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          These Atoms are the basic building blocks of Intuition. Each Atom
          comes with a unique decentralized identifier, structured data that
          describes it, and an associated Vault which enables users to deposit
          and withdraw from the Atom to signal its relevancy.
        </Text>
      </div>
    ),
  },
  {
    question: 'How do I create an Atom/Identity?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Click the “Create” action button in the bottom left section of the
          menu panel, then select “Create Identity”. From here, you will input
          some data to describe the Identity you are creating. You may also pass
          through some ETH to deposit on your newly-created Identity, allowing
          you the opportunity to be the first person to stake on the Identity
          you’ve created.
        </Text>
      </div>
    ),
  },
  {
    question: 'What happens when I create an Atom/Identity?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          In the Portal, when you create an Identity, the data you publish gets
          uploaded to IPFS. The returned IPFS CID is used to create an Atom in
          the Intuition contracts, which accept any arbitrary URI as the
          <code> atomURI</code>. This creates an immutable object that can now
          be referenced universally across the web.
        </Text>
      </div>
    ),
  },
]

export const claimFaq = [
  {
    question: 'What are Triples/Claims?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Triples let you ‘Claim’ anything about anything! These “Claims” are
          structured like sentences in a format called Semantic Triples, where
          three Atoms/Identities are chained together in a [Subject] [Predicate]
          [Object] structure. For example: [Alice] [is] [trustworthy]. This
          simple approach unlocks powerful utility for users and developers
          alike.
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          <span className="font-semibold">
            Please note - creating a Claim does{' '}
            <span className="italic">not</span> mean you are expressing the
            statement contained within. To express a statement, you must stake
            on a Claim.
          </span>{' '}
          This allows for many-to-one statements, where many people can Claim
          the same thing at the same time, without needing to create a new
          Claim!
        </Text>
      </div>
    ),
  },
  {
    question: 'How do I create a Triple/Claim?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Click the “Create” action button in the bottom left section of the
          menu panel, then select “Create Claim”. From here, you will select
          three Atoms/Identities to compose your Claim. Be sure to choose good
          Atoms, as this will significantly improve the queryability of the
          data! For example - using an Predicate of [employee of] and Object of
          [Intuition] would allow you to easily surface all employees of
          Intuition later, by querying for all Triples with Predicate [employee
          of] and Object [Intuition]!
        </Text>
      </div>
    ),
  },
  {
    question: 'What if the Triple/Claim I want to make already exists?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Even better! If a Claim already exists, you can express that Claim by
          staking on it. In Intuition, ‘who is saying what’ is determined by who
          is staked on what!
        </Text>
      </div>
    ),
  },
]

export const stakingFaq = [
  {
    question: 'What is Signal/Staking?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          In Intuition, Staking is your way to Signal what’s important, and what
          you believe to be true. You can stake ETH on ‘identities’ (Atoms) or
          ‘Claims’ (triples) to ‘say things about things’. For example, staking
          on the Claim [I] [am following] [User] would mean that you are
          presently signaling that you are following the User.
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          This functionality ultimately resolves to a Token Curated Registry
          (TCR) for Identities and Claims, where the most relevant information
          bubbles up to the top!
        </Text>
      </div>
    ),
  },
  {
    question: 'What happens when I Stake on an Identity?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          When you Stake on an Identity, you are signaling the relevancy of the
          Identity - allowing others to more easily discover that Identity. You
          also receive shares of the Identity, receiving fees whenever any
          subsequent users stake on that Identity.
        </Text>
      </div>
    ),
  },
  {
    question: 'What happens when I Stake on a Claim?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Claims have two Vaults - a Positive Vault, and a Negative Vault. To
          signal that you believe a Claim to be True, you would stake on the
          Positive Vault of the Claim (Deposit ‘For’). To signal that you
          believe a Claim to be False, you would stake on the Negative Vault of
          the Claim (Deposit ‘Against’).
        </Text>
        <Text
          variant={TextVariant.body}
          weight={TextWeight.semibold}
          className="text-secondary-foreground"
        >
          Please note: when you stake on a Claim, you are automatically staked
          on the Claim’s 3 underlying Identities, as you are indirectly
          signaling the relevancy of each of these Identities.
        </Text>
      </div>
    ),
  },
  {
    question: 'Can I Unstake?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Of course! You can unstake your ETH at any time, to receive your
          original deposit (minus fees). To unstake, simply navigate to the
          Identity or Claim in question, or go to your profile to manage your
          positions.
        </Text>
      </div>
    ),
  },
  {
    question: 'What are the economics of Staking?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          When you stake on an Identity or Claim, you receive Shares. These
          Shares grant you a proportionate amount of fee revenue accumulated by
          the Identity or Claim. These fees come from subsequent deposits and
          withdrawals. Therefore, you are economically incentivized to stake on
          Identities or Claims that you believe will get a lot of traction!
        </Text>
      </div>
    ),
  },
]

export const listsFaq = [
  {
    question: 'What are Lists?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Lists are our communal organization powerhouse! They help you group
          related items or data in ways that make sense to you, while also
          allowing others to discover, save, and give feedback! Over time the
          wisdom of the crowds coalescence giving all of us a better grasp on
          topics and helping us to make more informed decisions.
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          If you think about it, most online applications are composed of Lists.
          Your Twitter feed is a list of Tweets, your following is a list of
          followers, Amazon provides lists of products, Airbnb is a list of
          houses to rent, Youtube offers lists of videos, Craigslist is a list…
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          When Identities and Claims are used effectively, they enable the
          construction of deterministic queries with arbitrarily complex
          combinatorial logic. This allows the state of Intuition to be easily
          navigated, allowing for an accommodation of most use cases across the
          web. A List can be seen as the results of a query.
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          For example, to get a List all employees of a [Business], a simple
          query could be constructed to say ‘give me all Subjects of Triples
          where the Predicate is [employee of], and the Object is [Business]!
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          In the current iteration of the Portal, we’ve produced a reference
          ‘List’ implementation to demonstrate the power of these queries!
        </Text>
      </div>
    ),
  },
  {
    question: 'How do I create a List?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          When viewing a List, you’ll find the “Add to list” and “Save list”
          buttons in the upper right hand corner. Otherwise, you can add new
          Identities to a List by tagging those Identities with the List’s
          Identity!
        </Text>
      </div>
    ),
  },
  {
    question: 'How can I manage a List?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Every List is a Token Curated Registry (TCR), ordered by ETH staked.
          To order things within a List, you can deposit/withdraw ETH from the
          entries in the List to stackrank entries!
        </Text>
        <Text
          variant={TextVariant.body}
          weight={TextWeight.semibold}
          className="text-secondary-foreground"
        >
          Please note: when you stake on a Claim, you are automatically staked
          on the Claim’s 3 underlying Identities, as you are indirectly
          signaling the relevancy of each of these Identities.
        </Text>
      </div>
    ),
  },
]

export const tagsFaq = [
  {
    question: 'What are Tags?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Tags are your shortcut to organizing and finding what matters most, as
          well as the underlying feature that makes lists possible. Attach tags
          to any ‘identity’ (atom) in the Intuition knowledge graph to easily
          search and reference that information later. Super helpful when you
          want to stay on top of everything or discover something new!
          Structurally, Tags are simply Claims with the Predicate [has tag].
        </Text>
      </div>
    ),
  },
  {
    question: 'How do I create a new Tag?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Tags themselves are simply Atoms/Identities, as all things in
          Intuition are! To create a new Tag, you simply need to create a new
          Identity for the Tag you wish to tag things with!
        </Text>
      </div>
    ),
  },
  {
    question: 'How do I Tag something?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          After clicking “+ Add tags”, you’ll have the option to search through
          “Existing Tags” or add a new one! You can also create a new Identity
          if the Identity you’d like to tag something with does not yet exist.
          Behind the scenes, Tagging something means you are Staking on the
          Claim [Thing] [has tag] [Tag].{' '}
        </Text>
      </div>
    ),
  },
  {
    question: 'What happens when I Tag something?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Adding Tags to an Identity helps with discoverability for you and
          others later! Tagging is also how you add Identities to Lists. For
          example, to add this identity to the [Wallets] List, you would tag it
          with [Wallet]! Behind the scenes, tagging involves creating and
          staking on a Triple with the Predicate [has tag], and the Object
          [Wallet].
        </Text>
      </div>
    ),
  },
]

export const followsFaq = [
  {
    question: 'What are Follows?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          Following someone in Intuition isn’t just a casual connection—it’s a
          portable, contextual statement! Using Intuition’s ‘Claims’ (reference:
          “What are Triples/Claims?” above), a ‘Follow’ in the system means
          you’ve staked on the Claim [I] [am following] [User].
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          You can even signal the strength of your connection by staking ETH on
          it, making your follow more meaningful.
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          This data is open for any developer to read or write, allowing them to
          contribute to a rich, context-driven social graph that better reflects
          the trust we naturally build in real-life relationships.
        </Text>
      </div>
    ),
  },
  {
    question: 'How do I follow/unfollow someone?',
    answer: (
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          When browsing the portal, you’ll notice that some Identities have a
          circular profile picture — this shape represents a user’s identity
          (verses Identities with square profile pictures which represent
          non-user identities, like the identity of an object, thing, idea,
          etc).
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          To follow, click into a user’s identity, then click “Follow” in the
          left panel of that user’s profile page. You’ll then have the option to
          signal the strength of that connection with ETH before completing the
          follow. The minimum cost to follow another user is 0.001 ETH. You can
          always decide to increase your follow strength by adding more ETH
          later.{' '}
        </Text>
        <Text variant={TextVariant.body} className="text-secondary-foreground">
          To unfollow, click on the “Following” button in the left panel of a
          user’s profile page. This will open a modal where you can click
          “Unfollow”. Unfollowing also redeems your ETH.
        </Text>
      </div>
    ),
  },
]
