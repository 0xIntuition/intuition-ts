intuition-cli
=================

A CLI for the Intuition protocol.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/intuition-cli.svg)](https://npmjs.org/package/intuition-cli)
[![Downloads/week](https://img.shields.io/npm/dw/intuition-cli.svg)](https://npmjs.org/package/intuition-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g intuition-cli
$ intu COMMAND
running command...
$ intu (--version)
intuition-cli/0.0.0 darwin-arm64 node-v22.12.0
$ intu --help [COMMAND]
USAGE
  $ intu COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`intu hello PERSON`](#intu-hello-person)
* [`intu hello world`](#intu-hello-world)
* [`intu help [COMMAND]`](#intu-help-command)
* [`intu plugins`](#intu-plugins)
* [`intu plugins add PLUGIN`](#intu-plugins-add-plugin)
* [`intu plugins:inspect PLUGIN...`](#intu-pluginsinspect-plugin)
* [`intu plugins install PLUGIN`](#intu-plugins-install-plugin)
* [`intu plugins link PATH`](#intu-plugins-link-path)
* [`intu plugins remove [PLUGIN]`](#intu-plugins-remove-plugin)
* [`intu plugins reset`](#intu-plugins-reset)
* [`intu plugins uninstall [PLUGIN]`](#intu-plugins-uninstall-plugin)
* [`intu plugins unlink [PLUGIN]`](#intu-plugins-unlink-plugin)
* [`intu plugins update`](#intu-plugins-update)

## `intu hello PERSON`

Say hello

```
USAGE
  $ intu hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ intu hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/0xintuition/intuition-ts/blob/v0.0.0/src/commands/hello/index.ts)_

## `intu hello world`

Say hello world

```
USAGE
  $ intu hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ intu hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/0xintuition/intuition-ts/blob/v0.0.0/src/commands/hello/world.ts)_

## `intu help [COMMAND]`

Display help for intu.

```
USAGE
  $ intu help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for intu.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `intu plugins`

List installed plugins.

```
USAGE
  $ intu plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ intu plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/index.ts)_

## `intu plugins add PLUGIN`

Installs a plugin into intu.

```
USAGE
  $ intu plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into intu.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the INTU_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the INTU_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ intu plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ intu plugins add myplugin

  Install a plugin from a github url.

    $ intu plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ intu plugins add someuser/someplugin
```

## `intu plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ intu plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ intu plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/inspect.ts)_

## `intu plugins install PLUGIN`

Installs a plugin into intu.

```
USAGE
  $ intu plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into intu.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the INTU_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the INTU_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ intu plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ intu plugins install myplugin

  Install a plugin from a github url.

    $ intu plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ intu plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/install.ts)_

## `intu plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ intu plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ intu plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/link.ts)_

## `intu plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ intu plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ intu plugins unlink
  $ intu plugins remove

EXAMPLES
  $ intu plugins remove myplugin
```

## `intu plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ intu plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/reset.ts)_

## `intu plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ intu plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ intu plugins unlink
  $ intu plugins remove

EXAMPLES
  $ intu plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/uninstall.ts)_

## `intu plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ intu plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ intu plugins unlink
  $ intu plugins remove

EXAMPLES
  $ intu plugins unlink myplugin
```

## `intu plugins update`

Update installed plugins.

```
USAGE
  $ intu plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.43/src/commands/plugins/update.ts)_
<!-- commandsstop -->
