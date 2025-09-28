import {globalSearch, semanticSearch} from '@0xintuition/sdk'
import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import {render} from 'ink'
import React from 'react'

import {SearchApp} from '../components/search/search-app.js'
import {parseSearchResults} from '../components/search/utils.js'

export default class Search extends Command {
  static override args = {
    query: Args.string({
      description: 'Search query',
      required: true,
    }),
  }
  static override description = 'Search for atoms, triples, accounts, lists'
  static override examples = [
    '<%= config.bin %> <%= command.id %> ethereum',
    '<%= config.bin %> <%= command.id %> "vitalik" -i',
    '<%= config.bin %> <%= command.id %> "defi" --classic',
  ]
  static override flags = {
    classic: Flags.boolean({
      char: 'c',
      default: false,
      description: 'Use classic output mode',
    }),
    interactive: Flags.boolean({
      char: 'i',
      default: true,
      description: 'Use interactive TUI mode',
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Search)
    const {query} = args
    const useInteractive = flags.interactive && !flags.classic

    this.log(chalk.green(`🔎 Searching for "${query}"...`))
    this.log()

    const [globalResults, semanticResults] = await Promise.all([
      globalSearch(`%${query}%`, {
        accountsLimit: 10,
        atomsLimit: 10,
        collectionsLimit: 10,
        triplesLimit: 10,
      }),
      semanticSearch(query, {limit: 5}),
    ])

    if (useInteractive) {
      const results = parseSearchResults(globalResults || {}, semanticResults || {})

      if (results.length === 0) {
        this.log(chalk.yellow(`No results found for "${query}"`))
        return
      }

      const {waitUntilExit} = render(
        React.createElement(SearchApp, {
          initialResults: results,
          searchQuery: query,
        }),
      )

      await waitUntilExit()
    } else {
      this.renderClassicOutput(globalResults || {}, semanticResults || {})
    }
  }

  // eslint-disable-next-line complexity,@typescript-eslint/no-explicit-any
  private renderClassicOutput(globalResults: any, semanticResults: any): void {
    if (globalResults?.accounts && globalResults?.accounts?.length > 0) {
      this.log(chalk.italic('Accounts'))
      this.log()
      for (const a of globalResults.accounts) {
        this.log(chalk.bold('•', a.label))
        this.log(' ', chalk.gray('https://portal.intuition.systems/explore/atom/' + a.atom_id))
        this.log()
      }
    }

    if (globalResults?.atoms && globalResults?.atoms?.length > 0) {
      this.log(chalk.italic('Atoms'))
      this.log()
      for (const a of globalResults.atoms) {
        this.log(chalk.bold('•', a.label))
        this.log(' ', chalk.gray('https://portal.intuition.systems/explore/atom/' + a.term_id))
        this.log()
      }
    }

    if (globalResults?.triples && globalResults?.triples?.length > 0) {
      this.log(chalk.italic('Claims'))
      this.log()
      for (const t of globalResults.triples) {
        this.log(
          chalk.bold('•', t.subject.label),
          chalk.gray('-'),
          chalk.bold(t.predicate.label),
          chalk.gray('-'),
          chalk.bold(t.object.label),
        )
        this.log(' ', chalk.gray('https://portal.intuition.systems/explore/triple/' + t.term_id))
        this.log()
      }
    }

    if (globalResults?.collections && globalResults?.collections?.length > 0) {
      this.log(chalk.italic('Lists'))
      this.log()
      for (const t of globalResults.collections) {
        this.log(chalk.bold('•', t.object.label))
        this.log(
          ' ',
          chalk.gray(
            'https://portal.intuition.systems/explore/list/0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d-' +
              t.object.term_id,
          ),
        )
        this.log()
      }
    }

    this.log()
    this.log(chalk.green('🔎 Semantic search results'))
    this.log()

    const results = semanticResults
    if (results?.search_term) {
      for (const i of results.search_term) {
        const name = i.atom?.value?.json_object?.name || i.atom?.value?.text_object?.data
        this.log('•', chalk.bold(name))
        if (i.atom?.value?.json_object?.description !== null) {
          this.log(' ', i.atom?.value?.json_object?.description)
        }

        if (i.atom?.value?.json_object?.url !== null) {
          this.log(' ', i.atom?.value?.json_object?.url)
        }

        if (i.atom?.term_id) {
          this.log(' ', chalk.gray('https://portal.intuition.systems/explore/atom/' + i.atom.term_id))
        }

        this.log()
      }
    }
  }
}
