import { Command, flags } from '@oclif/command';

import * as containers from '../lib/container';
import { getDocker } from '../lib/docker';

export default class Stop extends Command {
	static description = 'Stop a running balenaOS container';

	static args = [
		{
			name: 'container',
			description: 'The name (or ID) of the docker container',
			required: true,
		},
	];

	static flags = {
		force: flags.boolean({
			description: 'Forcefully kill the container',
			char: 'f',
			default: false,
		}),
	};

	async run() {
		const { args, flags } = this.parse(Stop);
		const containerId = await containers.find(args.container);

		if (flags.force) {
			await containers.kill(containerId);
		} else {
			await containers.stop(containerId);
		}
	}
}
