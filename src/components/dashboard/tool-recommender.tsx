
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRecommendationsAction } from "@/actions/recommendations";
import { Wand2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { courses } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

const recommenderSchema = z.object({
  financialGoals: z.string().min(10, {
    message: "Please describe your financial goals in a bit more detail.",
  }),
});

type FormData = z.infer<typeof recommenderSchema>;

export function ToolRecommender() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(recommenderSchema),
    defaultValues: { financialGoals: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setRecommendations(null);

    const completedCourses = userProfile?.purchasedCourses
      ?.map(courseId => courses.find(c => c.id === courseId)?.title)
      .filter(Boolean) as string[] | undefined;
    
    const courseHistory = completedCourses?.join(", ") || "No courses completed yet.";

    // Simulate AI "thinking" time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = await getRecommendationsAction({
      financialGoals: data.financialGoals,
      courseHistory: courseHistory,
    });

    if (result.success) {
      setRecommendations(result.data.toolRecommendations);
    } else {
      setRecommendations("Sorry, we couldn't generate recommendations at this time. Please try again later.");
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center font-bold text-2xl">
          <Wand2 className="h-6 w-6 mr-3 text-primary" />
          Personalized Tool Recommendations
        </CardTitle>
        <CardDescription>
          Based on your course history and financial goals, our AI can suggest tools to help you succeed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="financialGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">What are your main financial goals right now?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I want to pay off my credit card debt faster and start saving for a down payment on a house.'"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? "Generating..." : "Get Recommendations"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <AnimatePresence>
        {(isLoading || recommendations) && (
          <CardFooter as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-full mt-6">
              <h3 className="font-bold text-xl mb-4">Your AI-Powered Suggestions</h3>
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="prose prose-sm max-w-none text-text-secondary prose-p:my-2">
                    {recommendations?.split('\n').map((rec, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        {rec}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </CardFooter>
        )}
      </AnimatePresence>
    </Card>
  );
}
