import { z } from "zod";
import { complete } from "./api";
import { zodToVertexSchema } from '@techery/zod-to-vertex-schema';
import { GroupFeedPost } from "../facebook/group-feed-extractor";
import { EXTRACT_DETAILS_OUTPUT_LANGUAGE } from "../../utils/consts";


export enum PropertyType {
    House = 'House',
    Apartment = 'Apartment',
    Room = 'Room',
    Other = 'Other'
}

export enum ListingType {
    Rental = 'Rental',
    Sale = 'Sale',
}

export enum RentalType {
    ShortTerm = 'ShortTerm',
    LongTerm = 'LongTerm',
}



const responseSchema = z.object({
    propertyType: z.enum(Object.values(PropertyType) as [PropertyType, ...PropertyType[]]).describe(`Type of the property, should be one of ${Object.values(PropertyType).join(', ')}`),
    listingType: z.enum(Object.values(ListingType) as [ListingType, ...ListingType[]]).describe(`Type of the listing, should be one of ${Object.values(ListingType).join(', ')}`),
    rentalType: z.enum(Object.values(RentalType) as [RentalType, ...RentalType[]]).optional().describe(`Type of the rental, should be one of ${Object.values(RentalType).join(', ')}, if not a rental, this should be null`),
    location: z.string().describe(`Full Location of the property, e.g., city or neighborhood or whatever is mentioned in the post`),
    price: z.number().optional().describe(`Price of the property, if mentioned. if the price is not mentioned, this should be -1`),
    sizeInM2: z.number().optional().describe(`Size of the property in square meters, if mentioned`),
    numberOfFloors: z.number().optional().describe(`Number of floors in the property, if mentioned`),
    numberOfRooms: z.number().optional().describe(`Number of rooms in the property, if mentioned`),
    numberOfBedrooms: z.number().optional().describe(`Number of bedrooms in the property`),
    isForLongTerm: z.boolean().describe(`Flag indicating if the property is for long-term rent`),
    hasParking: z.boolean().describe(`Flag indicating if the property has parking`),
    hasGarden: z.boolean().describe(`Flag indicating if the property has a garden`),
    isFullFurnished: z.boolean().describe(`Flag indicating if the property is fully furnished`),
    isPartiallyFurnished: z.boolean().describe(`Flag indicating if the property is partially furnished`),
    doesPriceIncludeElectricity: z.boolean().describe(`Flag indicating if the price includes electricity`),
    doesPriceIncludeWater: z.boolean().describe(`Flag indicating if the price includes water`),
    doesPriceIncludeLocalTaxes: z.boolean().describe(`Flag indicating if the price includes local taxes`),
    availableFrom: z.string().optional().describe(`Availability date of the property, in format YYYY-MM-DD, if mentioned else null`),
    showingDate: z.string().optional().describe(`Showing date of the property if mentioned, in format YYYY-MM-DD,`),
    showingTime: z.string().optional().describe(`Showing time of the property, in format HH:mm, if mentioned`),
    phoneNumbers: z.array(z.object({
        number: z.string().describe(`Phone number for contact`),
        forWhatsApp: z.boolean().describe(`Flag indicating if the number is for WhatsApp`),
        forPhoneCall: z.boolean().describe(`Flag indicating if the number is for phone call`),
        name: z.string().optional().describe(`Name of the contact person`),
    })).optional(),
    isByBrokerOrAgent: z.boolean().describe(`Flag indicating if the post is by a broker or agent`),
    isMarkedAsIrelevant: z.boolean().describe(`Flag indicating if the post is marked as irrelevant, like if the property is already rented or sold`),
    postSummary: z.string().describe(`Summary of the post in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, this is the text of the post itself, "{type} {size} {location}", it should be in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, dont mention the proce, for example: '3 room apartment for rent in Tel Aviv', or 'house for sale in Jerusalem', or 'room for rent in Haifa'`),
    postDescription: z.string().describe(`Description of the post in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, this is a summary of the text of the post itself, should exclude other details like price and contact info, just leave a short description of the property, it should be in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}. keep this short and concise`),
    postLocation: z.string().optional().describe(`Location of the post in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, if mentioned, else null`),
    listingSize: z.string().optional().describe(`Size of the listing in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, including number of rooms, size in m**2, etc., if mentioned, else null`),
    postPrice: z.string().optional().describe(`Price of the post in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, should include price, and price details like if it includes electricity, if mentioned, else null`),
    postExtraDetails: z.string().optional().describe(`Extra details of the post in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, other important details not covered in the other '${EXTRACT_DETAILS_OUTPUT_LANGUAGE}' fields, if mentioned. keep this short and concise. else null`),
    postContactInfo: z.string().optional().describe(`Contact info of the post in ${EXTRACT_DETAILS_OUTPUT_LANGUAGE}, short and percise, like: 'whatsapp - 0500 , john.', if mentioned, else null`),
});

const systemInstruction = `
Today is ${new Date().toDateString()}.
You are a helpful assistant. 
you will be given a Facebook post with details about a property for rent in israel.
your task is to extract the details from the post and return them in a structured format.
don't guess the details, only extract them from the post.
if a detail is not mentioned in the post, leave it out of the response.
all values that sould be left out should be null, and not empty strings or -1.

make sure to extract the right address, price, and other details.

if a child post is included in the post, don't ignore it, extract the details from the child post as well.

this is very important, make sure to extract the details from the post as accurately as possible.
`;

export type ExtractedPostDetails = z.infer<typeof responseSchema>;

export async function extractPostDetails(post: GroupFeedPost) {
    const res =  await complete(JSON.stringify(post, null, 2), systemInstruction, zodToVertexSchema(responseSchema));
    const json = JSON.parse(res.text ?? '{}') as ExtractedPostDetails;
    for (const key in json) {
        let value = (json as any)[key];
        if (value === undefined || value === null || value === '' || value === 'null' || value === -1) {
            delete (json as any)[key];
        }
    }

    return json;
}