import { Command, flags } from '@oclif/command';
import * as crypto from 'crypto';

import * as container from '../lib/container';

export default class New extends Command {
	static description = 'Create a new virtual device';

	static examples = [`$ virtual-fleet new`];

	static flags = {
		help: flags.help({ char: 'h' }),
		// flag with a value (-n, --name=VALUE)
		image: flags.string({
			char: 'i',
			description: 'The balenaos image to use for the device',
			// TODO: don't hardcode the image like this
			default: 'resin/resinos:2.46.0_rev1.dev-intel-nuc',
		}),
		name: flags.string({
			char: 'n',
			description: 'The name to use for the device container',
		}),
	};

	static args = [
		{
			name: 'config',
			required: true,
			description: 'The path to a config.json file from the dashboard',
		},
	];

	async run() {
		const { args, flags } = this.parse(New);

		if (flags.name == null) {
			flags.name = `balenaos-${crypto.randomBytes(3).toString('hex')}`;
		}

		// TODO: Check that the config exists
		await container.create({
			config: args.config,
			image: flags.image,
			name: flags.name,
		});
	}
}
