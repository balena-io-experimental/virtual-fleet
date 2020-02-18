import * as path from 'path';

import { getDocker } from './docker';
import { generateVolumeLabels, VirtualFleetLabelPrefix } from './labels';

const docker = getDocker();

export async function create(name: string) {
	try {
		// TODO: debug logging
		for (const type of ['boot', 'state', 'data']) {
			await docker.createVolume({
				Name: `${name}-${type}`,
				Labels: generateVolumeLabels(type),
			});
		}
	} catch (e) {
		console.log(e);
		throw new Error(`There was an error creating volumes for new device: ${e}`);
	}
}

export interface Volume {
	name: string;
	created: Date;
	usage?: number;
}

export async function list() {
	const response = await docker.listVolumes({
		filters: {
			label: {
				[VirtualFleetLabelPrefix]: true,
			},
		},
	});

	const ret: Volume[] = [];
	for (const vol of response.Volumes) {
		ret.push({
			name: vol.Name,
			// This is not typed in the dockerode typings, and
			// also not documented by docker, but it always seems
			// to be present
			created: new Date((vol as any).CreatedAt),
			usage: vol.UsageData?.Size,
		});
	}

	return ret;
}

export async function addFileToVolume(
	volume: string,
	hostPath: string,
	volPath: string,
) {
	// We create a container which uses this file
	const container = await docker.createContainer({
		name: 'virtual-fleet-populate',
		Image: 'alpine:latest',
		HostConfig: {
			Binds: [`${volume}:/vol`, `${hostPath}:/file`],
		},
		Cmd: ['/bin/sh', '-c', `cp /file ${path.posix.join('/vol', volPath)}`],
	});
	await container.start();

	while ((await container.inspect()).State.Running) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	await container.remove({ force: true });
}
