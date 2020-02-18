import { Command } from '@oclif/command';
import { cli } from 'cli-ux';

import * as volumes from '../lib/volume';
import * as containers from '../lib/container';

export default class List extends Command {
	static description = 'List resources managed by virtual-fleet';

	static args = [
		{
			name: 'type',
			description: 'The type of resource to show',
			options: ['devices', 'volumes'],
			default: 'devices',
		},
	];

	static flags = {
		...cli.table.flags(),
	};

	async run() {
		const { args, flags } = this.parse(List);

		switch (args.type) {
			case 'devices':
				const cs = await containers.list();

				cli.table(
					cs,
					{
						id: {
							header: 'Id',
							get: ({ id }) => id.substr(0, 8),
							minWidth: 12,
						},
						name: {
							header: 'Name',
							minWidth: 30,
						},
						image: {
							header: 'Image',
							minWidth: 50,
						},
						state: {
							header: 'State',
						},
					},
					{ ...flags },
				);
				break;
			case 'volumes':
				const vols = await volumes.list();

				cli.table(
					vols,
					{
						name: {
							header: 'Name',
							minWidth: 15,
						},
						created: {
							header: 'Created',
							get: row => row.created.toLocaleString(),
							minWidth: 30,
						},
						usage: {
							header: 'Disk usage',
							get: row => row.usage ?? 'Unavailable',
							extended: true,
						},
					},
					{ ...flags },
				);
		}
	}
}
