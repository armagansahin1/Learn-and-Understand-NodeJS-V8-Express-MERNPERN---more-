import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function streamFiles() {
    try {
        // Open file handles
        const readHandle = await open(`${__dirname}/greet.txt`);
        const writeHandle = await open(`${__dirname}/greetcopy.txt`, 'w');

        // Create streams
        const readable = readHandle.createReadStream({ 
            encoding: 'utf8', 
            highWaterMark: 16 * 1024 
        });
        const writable = writeHandle.createWriteStream();

        // Handle data chunks
        for await (const chunk of readable) {
            console.log(chunk);
            await writable.write(chunk);
        }

        // Close file handles
        await readHandle.close();
        await writeHandle.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

streamFiles();