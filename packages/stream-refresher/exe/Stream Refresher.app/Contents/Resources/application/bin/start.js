import { scheduleJob } from 'node-schedule';
import { checkIfExistingBroadcast, clickManageBroadcast, createNewBroadcast, restartBroadcast, } from '../utils/broadcast.js';
import { startStreamingFromExistingBroadcast } from '../utils/stream.js';
// Craete a broadcast
await clickManageBroadcast();
const existingBroadcast = await checkIfExistingBroadcast();
if (existingBroadcast) {
    await startStreamingFromExistingBroadcast();
}
else {
    await createNewBroadcast();
}
scheduleJob('6 30 * * *', async () => {
    await restartBroadcast();
});
