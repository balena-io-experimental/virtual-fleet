virtual-fleet
=============

A small CLI utility to create and manage balenaOS-in-container instances

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/virtual-fleet.svg)](https://npmjs.org/package/virtual-fleet)
[![Downloads/week](https://img.shields.io/npm/dw/virtual-fleet.svg)](https://npmjs.org/package/virtual-fleet)
[![License](https://img.shields.io/npm/l/virtual-fleet.svg)](https://github.com/balena-io-playground/virtual-fleet/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g virtual-fleet
$ virtual-fleet COMMAND
running command...
$ virtual-fleet (-v|--version|version)
virtual-fleet/0.0.1 linux-x64 node-v10.16.3
$ virtual-fleet --help [COMMAND]
USAGE
  $ virtual-fleet COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`virtual-fleet help [COMMAND]`](#virtual-fleet-help-command)
* [`virtual-fleet list [TYPE]`](#virtual-fleet-list-type)
* [`virtual-fleet new CONFIG`](#virtual-fleet-new-config)
* [`virtual-fleet start CONTAINER`](#virtual-fleet-start-container)
* [`virtual-fleet stop CONTAINER`](#virtual-fleet-stop-container)

## `virtual-fleet help [COMMAND]`

display help for virtual-fleet

```
USAGE
  $ virtual-fleet help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `virtual-fleet list [TYPE]`

List resources managed by virtual-fleet

```
USAGE
  $ virtual-fleet list [TYPE]

ARGUMENTS
  TYPE  (devices|volumes) [default: devices] The type of resource to show

OPTIONS
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [src/commands/list.ts](https://github.com/balena-io-playground/virtual-fleet/blob/v0.0.1/src/commands/list.ts)_

## `virtual-fleet new CONFIG`

Create a new virtual device

```
USAGE
  $ virtual-fleet new CONFIG

ARGUMENTS
  CONFIG  The path to a config.json file from the dashboard

OPTIONS
  -h, --help         show CLI help
  -i, --image=image  [default: resin/resinos:2.46.0_rev1.dev-intel-nuc] The balenaos image to use for the device
  -n, --name=name    The name to use for the device container

EXAMPLE
  $ virtual-fleet new
```

_See code: [src/commands/new.ts](https://github.com/balena-io-playground/virtual-fleet/blob/v0.0.1/src/commands/new.ts)_

## `virtual-fleet start CONTAINER`

Start a balenaOS container

```
USAGE
  $ virtual-fleet start CONTAINER

ARGUMENTS
  CONTAINER  The name (or ID) of the docker container

OPTIONS
  -f, --logs   Follow the logs of the container
  -s, --shell  Drop into a shell after the container has started
```

_See code: [src/commands/start.ts](https://github.com/balena-io-playground/virtual-fleet/blob/v0.0.1/src/commands/start.ts)_

## `virtual-fleet stop CONTAINER`

Stop a running balenaOS container

```
USAGE
  $ virtual-fleet stop CONTAINER

ARGUMENTS
  CONTAINER  The name (or ID) of the docker container

OPTIONS
  -f, --force  Forcefully kill the container
```

_See code: [src/commands/stop.ts](https://github.com/balena-io-playground/virtual-fleet/blob/v0.0.1/src/commands/stop.ts)_
<!-- commandsstop -->
