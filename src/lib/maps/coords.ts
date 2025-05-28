import { PlacesClient } from '@googlemaps/places';
import { getLogger } from '../../utils/logger';

const logger = getLogger('maps-coords');

const placesClient = new PlacesClient({
    apiKey: process.env.GOOGLE_MAPS_API_KEY!,
});

export async function searchCoords(query: string) {
    try {
        const [response] = await placesClient.searchText(
            {
                textQuery: query,
            },
            {
                otherArgs: {
                    headers: {
                        'X-Goog-FieldMask': 'places.location',
                    },
                },
            },
        );

        return response.places?.[0]?.location?.latitude ? ([response.places?.[0]?.location?.longitude, response.places?.[0]?.location?.latitude] as [number, number]) : undefined;
    } catch (error) {
        logger.error('Error searching for places:', error);
        throw error;
    }
}
