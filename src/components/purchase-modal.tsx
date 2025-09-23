
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

    // In a real app, this is where you would integrate with a payment provider like Stripe or PayPal.
    // For this demo, we'll simulate a successful payment.
    await new Promise(resolve => setTimeout(resolve, 2000));

    // After successful payment, update the user's data.
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        purchasedCourses: arrayUnion(course.id),
      });
      // Redirect to the course learning page.
       router.push(`/learn/${course.id}`);
    } else {
        setPurchaseComplete(true);
    }
    
    setIsLoading(false);
  };

  const handleLoginRedirect = () => {
    // After purchase, if the user wasn't logged in, redirect them to sign up.
    // Pass the course ID so we can grant them access after they create an account.
    router.push(`/signup?courseId=${course.id}`);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        // Reset state when the dialog closes
        setPurchaseComplete(false);
        setIsLoading(false);
    }
    setIsOpen(open);
  }

  const isAlreadyPurchased = userProfile?.purchasedCourses?.includes(course.id);

  if (isAlreadyPurchased) {
    return (
        <Button asChild size="lg" className="w-full md:w-auto font-bold text-lg">
            <a href={`/learn/${course.id}`}>Go to Course</a>
        </Button>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-auto font-bold text-lg">
            Buy Now for ${course.price}
        </Button>
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
                {/* This is where you would place your payment form (e.g., Stripe Elements or PayPal button) */}
                <p className="text-sm text-center text-muted-foreground">
                    Payment provider integration would appear here.
                </p>
                </div>
                <DialogFooter>
                <Button onClick={handlePurchase} disabled={isLoading} className="w-full" size="lg">
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
                    <Button onClick={handleLoginRedirect} className="w-full" size="lg">
                        Create Account or Log In
                    </Button>
                </DialogFooter>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}
