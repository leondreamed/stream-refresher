import { runAppleScript, waitForElementMatch } from 'applescript-utils';
import { execa } from 'execa';
import { outdent } from 'outdent';
import { stopStreaming } from './utils/stream.js';
stopStreaming();
async function clickStreamingButton(args) {
    await runAppleScript(outdent `
		tell application "OBS"
			activate
		end tell
	`);
    const startStreamingButton = await waitForElementMatch('OBS', (element) => element.path.some((part) => part.name.includes('shouldStart' in args ? 'Start Streaming' : 'Stop Streaming')), { timeout: 30000 });
    const startStreamingButtonProperties = (await runAppleScript(outdent `
		tell application "System Events"
			tell process "OBS"
					properties of ${startStreamingButton.pathString}
			end tell
		end tell
	`));
    const [width, height] = startStreamingButtonProperties.size;
    const [x, y] = startStreamingButtonProperties.position;
    await execa('cliclick', [`c:${x + width / 2},${y + height / 2}`]);
}
/*
scheduleJob('30 6 * * *', async () => {
    await clickStreamingButton({ shouldStop: true });
    await clickStreamingButton({ shouldStart: true });
});

try {
    await clickStreamingButton({ shouldStart: true });
} catch {
    // noop
}
*/
