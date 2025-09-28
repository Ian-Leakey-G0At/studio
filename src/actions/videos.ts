'use server';

import { Storage } from '@google-cloud/storage';

// Initialize storage
const storage = new Storage();
// IMPORTANT: Replace with your actual bucket name
const bucketName = 'your-videos-bucket'; 

export async function getSignedVideoUrl(courseId: string): Promise<{ url?: string; error?: string }> {
  // Assume the video file is named after the course ID.
  const videoFileName = `${courseId}.mp4`; 

  const options = {
    version: 'v4' as const,
    action: 'read' as const,
    expires: Date.now() + 15 * 60 * 1000, // 15-minute expiration
  };

  try {
    // Get a signed URL for the video file
    const [url] = await storage.bucket(bucketName).file(videoFileName).getSignedUrl(options);
    return { url };
  } catch (error: any) {
    console.error('Error generating signed URL:', error.message);
    return { error: 'Could not retrieve video. Please try again later.' };
  }
}
