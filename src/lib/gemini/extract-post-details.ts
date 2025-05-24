import { z } from "zod";
import { FormattedFacebookPost } from "../facebook/extractors/post";
import { complete } from "./api";
import { zodToVertexSchema } from '@techery/zod-to-vertex-schema';


const responseSchema = z.object({
    title: z.string().describe("Title of the post"),
    isHouseRentalListing: z.boolean().describe("Flag indicating if the post is a house rental listing, this should be false if the post is about anything else then a house rental"),
    location: z.string().describe("Full Location of the property, e.g., city or neighborhood or whatever is mentioned in the post"),
    city: z.string().describe("City of the property"),
    neighborhood: z.string().optional().describe("Neighborhood of the property"),
    village: z.string().optional().describe("Village of the property"),
    price: z.number().optional().describe("Price of the property, if mentioned. price is in NIS"),
    isPriceFlexible: z.boolean().describe("Flag indicating if the price is flexible, if mentioned"),
    hasPrice: z.boolean().describe("Flag indicating if the post has a price"),
    isHouse: z.boolean().describe("Flag indicating if the property is a house"),
    isApartment: z.boolean().describe("Flag indicating if the property is an apartment or flat apposed to a house"),
    sizeInM2: z.number().optional().describe("Size of the property in square meters, if mentioned"),
    gardenSizeInM2: z.number().optional().describe("Size of the garden in square meters, if mentioned"),
    builtHouseSizeInM2: z.number().optional().describe("Size of the built house in square meters, if mentioned"),
    numberOfFloors: z.number().optional().describe("Number of floors in the property, if mentioned"),
    numberOfRooms: z.number().optional().describe("Number of rooms in the property, if mentioned"),
    numberOfBedrooms: z.number().optional().describe("Number of bedrooms in the property"),
    numberOfBathrooms: z.number().optional().describe("Number of bathrooms in the property"),
    isForLongTerm: z.boolean().describe("Flag indicating if the property is for long-term rent"),
    hasParking: z.boolean().describe("Flag indicating if the property has parking"),
    hasGarden: z.boolean().describe("Flag indicating if the property has a garden"),
    isGardenMaintained: z.boolean().describe("Flag indicating if the garden is maintained"),
    hasPool: z.boolean().describe("Flag indicating if the property has a pool"),
    hasBalcony: z.boolean().describe("Flag indicating if the property has a balcony"),
    hasView: z.boolean().describe("Flag indicating if the property has a view"),
    isFullFurnished: z.boolean().describe("Flag indicating if the property is fully furnished"),
    isPartiallyFurnished: z.boolean().describe("Flag indicating if the property is partially furnished"),
    doesPriceIncludeAllUtilities: z.boolean().describe("Flag indicating if the price includes all utilities"),
    doesPriceIncludeInternet: z.boolean().describe("Flag indicating if the price includes internet"),
    doesPriceIncludeElectricity: z.boolean().describe("Flag indicating if the price includes electricity"),
    doesPriceIncludeWater: z.boolean().describe("Flag indicating if the price includes water"),
    doesPriceIncludeLocalTaxes: z.boolean().describe("Flag indicating if the price includes local taxes"),
    availibleFrom: z.string().optional().describe("Availability date of the property"),
    isAvailableNow: z.boolean().describe("Flag indicating if the property is available now"),
    showingDate: z.string().optional().describe("Showing date of the property"),
    showingTime: z.string().optional().describe("Showing time of the property"),
    isNewConstruction: z.boolean().describe("Flag indicating if the property is a new construction"),
    isRenovated: z.boolean().describe("Flag indicating if the property is renovated"),
    phoneNumbers: z.array(z.object({
        number: z.string().describe("Phone number for contact"),
        forWhatsApp: z.boolean().describe("Flag indicating if the number is for WhatsApp"),
        forPhoneCall: z.boolean().describe("Flag indicating if the number is for phone call"),
        name: z.string().optional().describe("Name of the contact person"),
    })).optional(),
    email: z.string().optional().describe("Email address for contact"),
    isByBrokerOrAgent: z.boolean().describe("Flag indicating if the post is by a broker or agent"),
    
});

const systemInstruction = `You are a helpful assistant. 
you will be given a Facebook post with details about a property for rent in israel.
your task is to extract the details from the post and return them in a structured format.
the post will be in Hebrew, and you should return the details in English.
don't guess the details, only extract them from the post.
if a detail is not mentioned in the post, leave it out of the response.
`;

export type ExtractedPostDetails = z.infer<typeof responseSchema>;

export async function extractPostDetails(post: FormattedFacebookPost) {
    const res =  await complete(JSON.stringify(post), systemInstruction, zodToVertexSchema(responseSchema));
    return JSON.parse(res.text ?? '{}') as ExtractedPostDetails;
}