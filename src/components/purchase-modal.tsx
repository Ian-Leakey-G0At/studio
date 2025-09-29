
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
import { Loader2, Shield, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
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
        <Button asChild size="lg" className="w-full font-bold text-lg gradient-success text-white interactive-glow rounded-full">
            <Link href={`/learn/${course.id}`}>
              <CheckCircle className="w-5 h-5 mr-2" />
              Continue Learning
            </Link>
        </Button>
    ) : (
       <Button onClick={handleOpenTrigger} size="lg" className="w-full font-bold text-lg gradient-primary text-white interactive-glow rounded-full">
          Get Instant Access - ${course.price}
          <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    )
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-headline">Secure Your Access</DialogTitle>
          <DialogDescription className="text-base">
              Join thousands of students transforming their financial future
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          {/* Course Summary */}
          <div className="bg-muted/30 rounded-xl p-4">
            <h3 className="font-semibold mb-2">{course.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">One-time payment</span>
              <span className="text-2xl font-bold text-gradient">${course.price}</span>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-accent" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span>Lifetime access to all materials</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="w-5 h-5 text-accent" />
              <span>Secure payment via IntaSend</span>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground bg-muted/20 rounded-lg p-3">
            You'll be redirected to our secure payment partner to complete your purchase
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handlePurchase} disabled={isLoading} className="w-full gradient-primary text-white interactive-glow" size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecting to Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Purchase
                </>
              )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
