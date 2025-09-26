
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Course } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApp';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface PurchaseModalProps {
  course: Course;
}

export function PurchaseModal({ course }: PurchaseModalProps) {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        purchasedCourses: arrayUnion(course.id),
      });
      router.push(`/learn/${course.id}`);
    } else {
      setPurchaseComplete(true);
    }
    
    setIsLoading(false);
  };

  const handleLoginRedirect = () => {
    router.push(`/signup?courseId=${course.id}`);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPurchaseComplete(false);
      setIsLoading(false);
    }
    setIsOpen(open);
  }

  const isAlreadyPurchased = userProfile?.purchasedCourses?.includes(course.id);

  const TriggerButton = () => (
    isAlreadyPurchased ? (
        <Button asChild size="lg" className="w-full font-bold text-lg interactive-glow rounded-full">
            <Link href={`/learn/${course.id}`}>Go to Course</Link>
        </Button>
    ) : (
       <Button size="lg" className="w-full font-bold text-lg interactive-glow rounded-full">
          Purchase Course - ${course.price}
      </Button>
    )
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>
      <DialogContent>
        {!purchaseComplete ? (
            <>
                <DialogHeader>
                <DialogTitle>Complete Your Purchase</DialogTitle>
                <DialogDescription>
                    You're about to purchase "{course.title}" for ${course.price}.
                </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                <p className="text-sm text-center text-muted-foreground">
                    Payment provider integration would appear here.
                </p>
                </div>
                <DialogFooter>
                <Button onClick={handlePurchase} disabled={isLoading} className="w-full interactive-glow" size="lg">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? 'Processing Payment...' : 'Confirm Purchase'}
                </Button>
                </DialogFooter>
            </>
        ) : (
            <>
                <DialogHeader>
                <DialogTitle>Purchase Successful!</DialogTitle>
                <DialogDescription>
                    Just one more step. Create an account or log in to access your course.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className='!justify-center pt-4'>
                    <Button onClick={handleLoginRedirect} className="w-full interactive-glow" size="lg">
                        Create Account or Log In
                    </Button>
                </DialogFooter>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}
