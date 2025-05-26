import { PlacesClient } from "@googlemaps/places";

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
						"X-Goog-FieldMask": "places.location",
					},
				},
			}
		);

		return response.places?.[0]?.location?.latitude
			? ([
                    response.places?.[0]?.location?.longitude,
					response.places?.[0]?.location?.latitude,
			  ] as [number, number])
			: undefined;
	} catch (error) {
		console.error("Error searching for places:", error);
		throw error;
	}
}
