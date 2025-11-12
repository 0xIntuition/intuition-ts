import {globalSearch, semanticSearch} from '@0xintuition/sdk'
import {Args, Command} from '@oclif/core'
import chalk from 'chalk'

export default class Search extends Command {
  static override args = {
    query: Args.string({
      description: 'Search query',
    }),
  }
  static override description = 'Search for atoms, triples, accounts, lists'
  static override examples = ['<%= config.bin %> <%= command.id %>', '<%= config.bin %> <%= command.id %> ethereum']

  public async run(): Promise<void> {
    const {args} = await this.parse(Search)
    const {query} = args

    if (query) {
      this.log(chalk.green('🔎 Global search for', query))
      this.log()
      const globalResults = await globalSearch(`%${query}%`, {})

      if (globalResults?.accounts && globalResults?.accounts?.length > 0) {
        this.log(chalk.italic('Accounts'))
        this.log()
        if (globalResults?.accounts)
          for (const a of globalResults.accounts) {
            this.log(chalk.bold('•', a.label))
            this.log(' ', chalk.gray('https://portal.intuition.systems/explore/atom/' + a.atom_id))
            this.log()
          }
      }

      if (globalResults?.atoms && globalResults?.atoms?.length > 0) {
        this.log(chalk.italic('Atoms'))
        this.log()
        if (globalResults?.atoms)
          for (const a of globalResults.atoms) {
            this.log(chalk.bold('•', a.label))
            this.log(' ', chalk.gray('https://portal.intuition.systems/explore/atom/' + a.term_id))
            this.log()
          }
      }

      if (globalResults?.triples && globalResults?.triples?.length > 0) {
        this.log(chalk.italic('Claims'))
        this.log()
        if (globalResults?.triples)
          for (const t of globalResults.triples) {
            this.log(
              chalk.bold('•', t?.subject?.label),
              chalk.gray('-'),
              chalk.bold(t?.predicate?.label),
              chalk.gray('-'),
              chalk.bold(t?.object?.label),
            )
            this.log(' ', chalk.gray('https://portal.intuition.systems/explore/triple/' + t.term_id))
            this.log()
          }
      }

      if (globalResults?.collections && globalResults?.collections?.length > 0) {
        this.log(chalk.italic('Lists'))
        this.log()
        if (globalResults?.collections)
          for (const t of globalResults.collections) {
            this.log(chalk.bold('•', t?.object?.label))
            this.log(
              ' ',
              chalk.gray(
                `https://portal.intuition.systems/explore/list/0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5-${t?.object?.term_id}`,
              ),
            )
            this.log()
          }
      }

      this.log()
      this.log(chalk.green('🔎 Semantic search for', query))
      this.log()

      const results = await semanticSearch(query, {limit: 3})
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
}
