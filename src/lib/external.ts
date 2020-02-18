import * as path from 'path';

export function getExternalPath() {
	return path.join(__dirname, '..', '..', 'external');
}

export function getBalenaOsInContainerPath() {
	return path.join(getExternalPath(), 'balenaos-in-container');
}
