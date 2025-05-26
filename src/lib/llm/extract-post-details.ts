import { z } from "zod";
import { complete } from "./api";
import { zodToVertexSchema } from '@techery/zod-to-vertex-schema';
import { GroupFeedPost } from "../facebook/group-feed-extractor";


const responseSchema = z.object({
    isHouseRentalListing: z.boolean().describe("Flag indicating if the post is a house rental listing, this should be false if the post is about anything else then a house rental. for exapmle if the post is about asking for help finding a house and not listing one, or if the post is about selling a house, this should be false"),
    location: z.string().describe("Full Location of the property, e.g., city or neighborhood or whatever is mentioned in the post"),
    price: z.number().optional().describe("Price of the property, if mentioned. price is in NIS, if the price is not mentioned, this should be 0"),
    isPriceFlexible: z.boolean().describe("Flag indicating if the price is flexible, if mentioned"),
    isHouse: z.boolean().describe("Flag indicating if the property is a house, apposite to an apartment or a room"),
    sizeInM2: z.number().optional().describe("Size of the property in square meters, if mentioned"),
    numberOfFloors: z.number().optional().describe("Number of floors in the property, if mentioned"),
    numberOfRooms: z.number().optional().describe("Number of rooms in the property, if mentioned"),
    numberOfBedrooms: z.number().optional().describe("Number of bedrooms in the property"),
    isForLongTerm: z.boolean().describe("Flag indicating if the property is for long-term rent"),
    hasParking: z.boolean().describe("Flag indicating if the property has parking"),
    hasGarden: z.boolean().describe("Flag indicating if the property has a garden"),
    isFullFurnished: z.boolean().describe("Flag indicating if the property is fully furnished"),
    isPartiallyFurnished: z.boolean().describe("Flag indicating if the property is partially furnished"),
    doesPriceIncludeElectricity: z.boolean().describe("Flag indicating if the price includes electricity"),
    doesPriceIncludeWater: z.boolean().describe("Flag indicating if the price includes water"),
    doesPriceIncludeLocalTaxes: z.boolean().describe("Flag indicating if the price includes local taxes"),
    availableFrom: z.string().optional().describe("Availability date of the property, in format YYYY-MM-DD, if mentioned else null"),
    showingDate: z.string().optional().describe("Showing date of the property if mentioned"),
    showingTime: z.string().optional().describe("Showing time of the property, in format HH:mm, if mentioned"),
    isNewConstruction: z.boolean().describe("Flag indicating if the property is a new construction"),
    isRenovated: z.boolean().describe("Flag indicating if the property is renovated"),
    phoneNumbers: z.array(z.object({
        number: z.string().describe("Phone number for contact"),
        forWhatsApp: z.boolean().describe("Flag indicating if the number is for WhatsApp"),
        forPhoneCall: z.boolean().describe("Flag indicating if the number is for phone call"),
        name: z.string().optional().describe("Name of the contact person"),
    })).optional(),
    isByBrokerOrAgent: z.boolean().describe("Flag indicating if the post is by a broker or agent"),
});

const systemInstruction = `
Today is ${new Date().toDateString()}.
You are a helpful assistant. 
you will be given a Facebook post with details about a property for rent in israel.
your task is to extract the details from the post and return them in a structured format.
the post will be in Hebrew, and you should return the details in English.
don't guess the details, only extract them from the post.
if a detail is not mentioned in the post, leave it out of the response.
all values that sould be left out should be null, and not empty strings or 0.
`;

export type ExtractedPostDetails = z.infer<typeof responseSchema>;

export async function extractPostDetails(post: GroupFeedPost) {
    const res =  await complete(JSON.stringify(post), systemInstruction, zodToVertexSchema(responseSchema));
    const json = JSON.parse(res.text ?? '{}') as ExtractedPostDetails;
    for (const key in json) {
        let value = (json as any)[key];
        if (value === undefined || value === null || value === '' || value === 'null') {
            delete (json as any)[key];
        }
    }
    if (json.price === 0) {
        delete json.price; // If price is 0, we assume it's not mentioned
    }
    return json;
}