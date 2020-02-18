import { getDocker } from './docker';
import * as volumes from './volume';

import * as path from 'path';
import { getBalenaOsInContainerPath } from './external';
import { generateContainerLabels, VirtualFleetLabelPrefix } from './labels';

const docker = getDocker();

export interface VirtualDeviceCreateOpts {
	config: string;
	image: string;
	name: string;
}

export async function create({ config, image, name }: VirtualDeviceCreateOpts) {
	// First create the volumes we will need
	await volumes.create(name);

	// Create the container but don't start it
	await docker.createContainer({
		name,
		StopSignal: 'SIGRTMIN+3',
		// Once
		// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42445
		// is merged, remove the as any below
		StopTimeout: 30,
		Env: ['container=docker'],
		HostConfig: {
			Dns: ['127.0.0.2'],
			Privileged: true,
			Binds: [
				// /lib/modules
				'/lib/modules:/lib/modules:ro',
				// systemd-watchdog
				`${path.join(
					getBalenaOsInContainerPath(),
					'conf',
					'systemd-watchdog.conf',
				)}:/etc/systemd/system.conf.d/watchdog.conf:ro`,
				// Aufs2Ovelay script
				`${path.join(
					getBalenaOsInContainerPath(),
					'aufs2overlay.sh',
				)}:/aufs2overlay`,
				// boot volume
				`${name}-boot:/mnt/boot`,
				// state volume
				`${name}-state:/mnt/state`,
				// data volume
				`${name}-data:/mnt/data`,
			],
		},
		Entrypoint: ['/bin/sh', '-c'],
		Labels: generateContainerLabels(),
		Cmd: '/aufs2overlay;exec /sbin/init;',
		Image: image,
	} as any);

	// Now we need to drop the config.json into the volume
	await volumes.addFileToVolume(`${name}-boot`, config, '/config.json');
}

export interface Container {
	id: string;
	name: string;
	state: string;
	image: string;
}

export async function list() {
	const response = await docker.listContainers({
		all: true,
		filters: {
			label: {
				[VirtualFleetLabelPrefix]: true,
			},
		},
	});

	const ret: Container[] = [];
	for (const c of response) {
		ret.push({
			id: c.Id,
			image: c.Image,
			state: c.State,
			// The names comes with a leading /, remove it
			name: c.Names[0].substr(1),
		});
	}

	return ret;
}

export async function find(nameOrId: string): Promise<string> {
	const containers = await docker.listContainers({ all: true });
	for (const container of containers) {
		if (container.Id.startsWith(nameOrId)) {
			return container.Id;
		}
		if (container.Names[0]?.endsWith(nameOrId)) {
			return container.Id;
		}
	}
	throw new Error(`Cannot find a container with a name or ID of: ${nameOrId}`);
}

export async function start(containerId: string): Promise<void> {
	await docker.getContainer(containerId).start();
}

export async function stop(containerId: string): Promise<void> {
	await docker.getContainer(containerId).stop();
}

export async function kill(containerId: string): Promise<void> {
	await docker.getContainer(containerId).kill();
}
