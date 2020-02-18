import * as _ from 'lodash';
import * as Docker from 'dockerode';

// TODO: Accept arguments for docker daemon
export const getDocker = _.once(() => {
	return new Docker();
});
