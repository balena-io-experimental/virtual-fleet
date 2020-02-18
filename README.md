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
* [`virtual-fleet hello [FILE]`](#virtual-fleet-hello-file)
* [`virtual-fleet help [COMMAND]`](#virtual-fleet-help-command)

## `virtual-fleet hello [FILE]`

describe the command here

```
USAGE
  $ virtual-fleet hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ virtual-fleet hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/balena-io-playground/virtual-fleet/blob/v0.0.1/src/commands/hello.ts)_

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
<!-- commandsstop -->
