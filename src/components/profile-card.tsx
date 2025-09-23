
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, User, Grid3x3, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProfileCardProps = {
  name: string;
  imageUrl: string;
  imageHint: string;
  description: string;
  followers: number;
  posts: number;
  verified?: boolean;
  darkerButton?: boolean;
};

export function ProfileCard({
  name,
  imageUrl,
  imageHint,
  description,
  followers,
  posts,
  verified = true,
  darkerButton = false,
}: ProfileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="interactive-glow rounded-3xl"
    >
      <Card className="w-full max-w-xs overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="rounded-2xl object-cover"
                data-ai-hint={imageHint}
              />
            </div>
            <div className="flex flex-col gap-4 px-2">
                <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-foreground">{name}</h3>
                    {verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-muted-foreground text-base">
                    {description}
                </p>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span>{followers}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Grid3x3 className="h-4 w-4" />
                            <span>{posts}</span>
                        </div>
                    </div>
                    <Button 
                        size="sm" 
                        className={cn(
                            "rounded-lg interactive-glow", 
                            darkerButton ? "bg-black/40" : "bg-white/80 text-black"
                        )}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Follow
                    </Button>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
