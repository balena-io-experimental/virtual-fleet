import { Command, flags } from '@oclif/command';

import * as containers from '../lib/container';
import { getDocker } from '../lib/docker';

export default class Start extends Command {
	static description = 'Start a balenaOS container';

	static args = [
		{
			name: 'container',
			description: 'The name (or ID) of the docker container',
			required: true,
		},
	];

	static flags = {
		shell: flags.boolean({
			description: 'Drop into a shell after the container has started',
			char: 's',
			default: false,
			exclusive: ['logs'],
		}),
		logs: flags.boolean({
			description: 'Follow the logs of the container',
			char: 'f',
			exclusive: ['shell'],
			default: false,
		}),
	};

	async run() {
		const { args, flags } = this.parse(Start);
		const containerId = await containers.find(args.container);
		await containers.start(containerId);

		// TODO
		if (flags.logs) {
			console.log('Logs not yet supported');
		}

		if (flags.shell) {
			console.log('Shell not yet supported');
		}
	}
}
