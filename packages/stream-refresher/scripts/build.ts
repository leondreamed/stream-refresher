import * as caxa from 'caxa';
import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles, rmDist } from 'lionconfig';

chProjectDir(import.meta.url);
rmDist();
exec('tsc');
exec('tsc-alias');
await copyPackageFiles();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
await (caxa.default as any).default({
	input: './dist',
	output: './exe/Stream Refresher.app',
	command: ['{{caxa}}/node_modules/.bin/node', '{{caxa}}/bin/index.js'],
	includeNode: true,
});
