
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

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: course.price,
          email: user?.email,
          firstName: userProfile?.displayName?.split(' ')[0] || 'Guest',
          lastName: userProfile?.displayName?.split(' ')[1] || '',
          courseId: course.id,
          userId: user?.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Checkout API error:', data.error);
        // You should show a user-friendly error here, e.g., using a toast notification.
        setIsLoading(false);
        return;
      }

      if (data.url) {
        // Redirect to the IntaSend checkout page
        window.location.href = data.url;
      } else {
        console.error('No redirect URL found in IntaSend response');
        setIsLoading(false);
      }

    } catch (error) {
      console.error('Failed to initiate purchase:', error);
      // You should show a user-friendly error here.
      setIsLoading(false);
    }
  };

  const handleOpenTrigger = () => {
    if (!user) {
      // Redirect to login if user is not authenticated, passing the course page as the redirect URL
      router.push(`/login?redirect=/courses/${course.id}`);
    } else {
      // Open the modal if user is authenticated
      setIsOpen(true);
    }
  };

  const isAlreadyPurchased = userProfile?.purchasedCourses?.includes(course.id);

  const TriggerButton = () => (
    isAlreadyPurchased ? (
        <Button asChild size="lg" className="w-full font-bold text-lg interactive-glow rounded-full">
            <Link href={`/learn/${course.id}`}>Go to Course</Link>
        </Button>
    ) : (
       <Button onClick={handleOpenTrigger} size="lg" className="w-full font-bold text-lg interactive-glow rounded-full">
          Purchase Course - ${course.price}
      </Button>
    )
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
              You're about to purchase "{course.title}" for ${course.price}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
            <p className="text-sm text-muted-foreground">
                You will be redirected to our secure payment partner, IntaSend, to complete the transaction.
            </p>
        </div>
        <DialogFooter>
          <Button onClick={handlePurchase} disabled={isLoading} className="w-full interactive-glow" size="lg">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Redirecting...' : 'Proceed to Payment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
