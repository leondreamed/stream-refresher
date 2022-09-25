import { clickElement, waitForElementMatch } from 'applescript-utils';

import { cliclickElement } from '~/utils/cliclick.js';

export async function startStreamingFromExistingBroadcast() {
	const selectExistingBroadcastTab = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) =>
				part.name.includes('Select Existing Broadcast')
			),
		{ timeout: 30_000 }
	);


	await clickElement(selectExistingBroadcastTab);
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
