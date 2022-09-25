import { clickElement, waitForElementMatch } from 'applescript-utils';

import { clickManageBroadcast } from '~/utils/broadcast.js';
import { cliclickElement } from '~/utils/cliclick.js';

export async function startStreamingFromExistingBroadcast() {
	await clickManageBroadcast();

	const selectExistingBroadcastTab = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) =>
				part.name.includes('Select Existing Broadcast')
			),
		{ timeout: 30_000 }
	);

	await clickElement(selectExistingBroadcastTab);

	const existingBroadcast = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) => part.name.includes('Productivity Stream'))
	);

	existingBroadcast.pathString = [
		'static text 1',
		...existingBroadcast.path.slice(1).map((part) => part.fullName),
	].join(' of ');

	await cliclickElement(existingBroadcast);

	const selectBroadcastAndStartStreamingButton = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) =>
				part.name.includes('Select broadcast and start streaming')
			)
	);

	await clickElement(selectBroadcastAndStartStreamingButton);
}

export async function stopStreaming() {
	const stopStreamingButton = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) => part.name.includes('Stop Streaming')),
		{ timeout: 30_000 }
	);

	await cliclickElement(stopStreamingButton);

	const youWillNotBeAbleToReconnectText = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) =>
				part.name.includes('You will not be able to reconnect.')
			)
	);

	const yesButton = youWillNotBeAbleToReconnectText
		.nextElement()!
		.nextElement()!;

	await clickElement(yesButton);
}
