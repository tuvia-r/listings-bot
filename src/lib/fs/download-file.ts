import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";


export async function downloadFile(url: string, filePath: string): Promise<void> {
    if (!url || !filePath) {
        throw new Error('URL and file path must be provided');
    }
    if (existsSync(filePath)) {
        console.log(`File already exists at ${filePath}. Skipping download.`);
        return;
    }
    console.log(`Downloading image from ${url} to ${filePath}...`);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));
    console.log(`Image downloaded and saved to ${filePath}`);
}