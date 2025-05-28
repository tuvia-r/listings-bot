import StaticMaps from 'staticmaps';
import { getLogger } from '../../utils/logger';

const logger = getLogger('static-maps');

const options: StaticMaps.StaticMapsOptions = {
    width: 1024,
    height: 1536,
};

const markerOptions: Partial<StaticMaps.AddMarkerOptions> = {
    img: `./assets/marker.png`, // can also be a URL
    width: 512,
    height: 843,
    drawHeight: 85,
    drawWidth: 55,
    resizeMode: 'fill', // can be "cover", "contain", "stretch", "fill"
};

const localCoords = [35.04416, 32.0853]; // Example coordinates for Tel Aviv
const zoom = 10; // Example zoom for israel

let session:
    | {
          session: string;
          expiry: string; // ISO 8601 format
          tileWidth: number;
          imageFormat: string;
          tileHeight: number;
      }
    | undefined = undefined;

async function getSessionToken() {
    if (session && new Date(session.expiry) > new Date()) {
        return session.session;
    }

    const response = await fetch(`https://tile.googleapis.com/v1/createSession?key=${process.env.GOOGLE_MAPS_API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            mapType: 'roadmap',
            language: 'heb',
            region: 'IL',
        }),
    });

    session = await response.json();
    return session!.session;
}

export async function createStaticMap(marker: [number, number], outFile: string) {
    const sessionToken = await getSessionToken();
    options.tileUrl = `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=${sessionToken}&key=${process.env.GOOGLE_MAPS_API_KEY}&orientation=0`;
    const map = new StaticMaps(options);
    map.addMarker({ ...markerOptions, coord: marker } as StaticMaps.AddMarkerOptions);
    await map.render(localCoords, zoom);
    await map.image.save(outFile);
    logger.debug(`Map saved to ${outFile}`);
}
