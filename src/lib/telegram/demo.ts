import { CombinedPost } from '../db/schemas/posts';
import { sendPostToTelegram } from './send-post';

/**
 * Example function demonstrating how to send a post to Telegram
 */
export async function sendExamplePost() {
  // Create an example CombinedPost
  const examplePost: CombinedPost = {
    postId: 'example123',
    postText: 'Beautiful house for rent in the heart of Tel Aviv. 3 bedrooms, fully furnished, with a stunning view of the city. Available from June 1st.',
    postAuthor: 'John Doe',
    postAuthorId: 'john.doe',
    postUrl: 'https://facebook.com/groups/123/posts/456',
    postDate: new Date().toISOString(),
    postImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      'https://images.unsplash.com/photo-1598228723793-52759bba239c'
    ],
    // Required properties from FormattedFacebookPost
    postVideos: [],
    postLinks: [],
    commentCount: 0,
    hasSharedContent: false,
    
    // Extracted details (the fields that matter most for nice formatting)
    title: 'Beautiful 3BR House in Central Tel Aviv',
    isHouseRentalListing: true,
    location: 'Central Tel Aviv',
    city: 'Tel Aviv',
    neighborhood: 'City Center',
    price: 8500,
    isPriceFlexible: true,
    isHouse: true,
    sizeInM2: 120,
    numberOfRooms: 4,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    hasParking: true,
    hasBalcony: true,
    hasView: true,
    isFullFurnished: true,
    availibleFrom: '2025-06-01',
    phoneNumbers: [
      {
        number: '054-123-4567',
        forWhatsApp: true,
        forPhoneCall: true
      }
    ]
  };
  
  // Send the post to Telegram
  const success = await sendPostToTelegram(examplePost);
  
  if (success) {
    console.log('Post successfully sent to Telegram!');
  } else {
    console.error('Failed to send post to Telegram');
  }
}

// If this file is run directly (not imported), execute the example
if (require.main === module) {
  sendExamplePost().catch(console.error);
}