import {
	clickElement,
	setTextFieldValue,
	toggleCheckbox,
	waitForElementMatch,
} from 'applescript-utils';

import { cliclickElement } from '~/utils/cliclick.js';

export async function clickManageBroadcast() {
	const manageBroadcastButton = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) => part.name.includes('Manage Broadcast'))
	);

	await cliclickElement(manageBroadcastButton);
}

export async function clickSelectExistingBroadcast() {
	const selectExistingBroadcastButton = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) =>
				part.name.includes('Select Existing Broadcast')
			)
	);

	await clickElement(selectExistingBroadcastButton);
}

export async function checkIfExistingBroadcast() {
	await clickSelectExistingBroadcast();
	try {
		await waitForElementMatch('OBS', (element) =>
			element.path.some((part) => part.name.includes('Productivity Stream'))
		);
		return true;
	} catch {
		return false;
	}
}

export async function createNewBroadcast() {
	const createNewBroadcastTab = await waitForElementMatch(
		'OBS',
		(element) =>
			element.path.some((part) => part.name.includes('Create New Broadcast')),
		{ timeout: 30_000 }
	);

	await clickElement(createNewBroadcastTab);

	const titleText = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) => part.name.includes('Title'))
	);
	const titleTextbox = titleText.nextElement();

	if (titleTextbox === undefined) {
		throw new Error('Title textbox not found.');
	}

	await setTextFieldValue(titleTextbox, 'Productivity Stream');

	const categoryText = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) => part.name.includes('Category'))
	);
	const categoryComboBox = categoryText.nextElement();

	if (categoryComboBox === undefined) {
		throw new Error('Category combobox not found.');
	}

	await clickElement(categoryComboBox);
	const peopleAndBlogsOption = await waitForElementMatch(
		'OBS',
		(element) => element.path[0]?.fullName === 'static text 8'
	);
	await cliclickElement(peopleAndBlogsOption);

	const notMadeForKidsCheckbox = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) => part.name.includes('not made for kids'))
	);

	await toggleCheckbox({ element: notMadeForKidsCheckbox, value: true });

	const latencyText = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) => part.name.includes('Latency'))
	);
	const latencyCombobox = latencyText.nextElement();

	if (latencyCombobox === undefined) {
		throw new Error('Could not get latency combobox');
	}

	await clickElement(latencyCombobox);

	const ultralowOption = await waitForElementMatch(
		'OBS',
		(element) => element.path[0]?.fullName === 'static text 3'
	);
	await cliclickElement(ultralowOption);

	const createBroadcastButton = await waitForElementMatch('OBS', (element) =>
		element.path.some((part) =>
			part.name.includes('Create broadcast and start streaming')
		)
	);
	await cliclickElement(createBroadcastButton);
}
