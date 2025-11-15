import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function readFiles() {
    try {
        const greet = await readFile(`${__dirname}/greet.txt`, 'utf8');
        console.log(greet);
    } catch (err) {
        console.error('Error:', err);
    }
}

readFiles();
console.log('Done!');