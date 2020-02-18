export const VirtualFleetLabelPrefix = 'io.balena.virtual-fleet';

export function generateVolumeLabels(volType: string) {
	return {
		[VirtualFleetLabelPrefix]: '1',
		[`${VirtualFleetLabelPrefix}.type`]: volType,
	};
}

export function generateContainerLabels() {
	return {
		[VirtualFleetLabelPrefix]: '1',
		// Do we need anything else?
	};
}
