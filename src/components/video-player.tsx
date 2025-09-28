
"use client";

import { useEffect, useState } from "react";
import { getSignedVideoUrl } from "@/actions/videos";


export function VideoPlayer({ courseId }: { courseId: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      setIsLoading(true);
      setError(null);
      const result = await getSignedVideoUrl(courseId);
      if (result.url) {
        setVideoUrl(result.url);
      } else {
        setError(result.error || "An unknown error occurred.");
      }
      setIsLoading(false);
    };

    fetchUrl();
  }, [courseId]);

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Loading video...</p>
        </div>
      )}
      {error && (
        <div className="w-full h-full flex items-center justify-center bg-destructive/20">
          <p className="text-destructive-foreground">{error}</p>
        </div>
      )}
      {!isLoading && !error && videoUrl && (
        <video controls className="w-full h-full" src={videoUrl} autoPlay>
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
