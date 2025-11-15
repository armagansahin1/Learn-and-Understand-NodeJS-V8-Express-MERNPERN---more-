import { open } from 'node:fs/promises';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function pipeFiles() {
    try {
        // Open file handles
        const readHandle = await open(`${__dirname}/greet.txt`);
        const writeHandle = await open(`${__dirname}/greetcopy.txt`, 'w');
        const compressHandle = await open(`${__dirname}/greet.txt.gz`, 'w');

        // Create streams
        const readable = readHandle.createReadStream();
        const writable = writeHandle.createWriteStream();
        const compressed = compressHandle.createWriteStream();
        const gzip = createGzip();

        // Run pipelines in parallel
        await Promise.all([
            pipeline(readable, writable),
            pipeline(readable, gzip, compressed)
        ]);

        // Close all file handles
        await Promise.all([
            readHandle.close(),
            writeHandle.close(),
            compressHandle.close()
        ]);
    } catch (err) {
        console.error('Error:', err);
    }
}

pipeFiles();