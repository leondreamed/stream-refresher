import type { ElementReference } from 'applescript-utils';
import { runAppleScript } from 'applescript-utils';
import { execa } from 'execa';
import { outdent } from 'outdent';

export async function cliclickElement(element: ElementReference) {
	await runAppleScript(outdent`
		tell application "OBS" to activate
	`);

	const startStreamingButtonProperties = (await runAppleScript(outdent`
		tell application "System Events"
			tell process "OBS"
				properties of ${element.pathString}
			end tell
		end tell
	`)) as { position: [number, number]; size: [number, number] };

	const [width, height] = startStreamingButtonProperties.size;
	const [x, y] = startStreamingButtonProperties.position;

	await execa('cliclick', [
		`c:${Math.round(x + width / 2)},${Math.round(y + height / 2)}`,
	]);
}
