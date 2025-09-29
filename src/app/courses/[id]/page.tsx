import { getAllCourses, getCourse } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModernHeader } from "@/components/modern-header";
import { PurchaseModal } from "@/components/purchase-modal";
import type { Course } from "@/lib/types";
import { notFound } from 'next/navigation';
import { CheckCircle, Clock, BookOpen, Users, Star, Play, Download, Award } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";

export async function generateStaticParams() {
    const courses = await getAllCourses();
    return courses.map((course) => ({
        id: course.id,
    }));
}

export default async function CourseDetailsPage({ 
    params, 
    searchParams 
}: { 
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const course = await getCourse(params.id);

    if (!course) {
        notFound();
    }

    const purchaseSuccess = searchParams.purchase === 'success';

    // Mock data for enhanced features
    const courseFeatures = [
        { icon: Play, label: "12 Video Lessons", value: "4.5 hours" },
        { icon: Download, label: "Downloadable Resources", value: "15 PDFs" },
        { icon: Award, label: "Certificate", value: "Upon completion" },
        { icon: Users, label: "Community Access", value: "Lifetime" },
    ];

    const curriculum = [
        { title: "Introduction to Financial Foundations", duration: "25 min", locked: false },
        { title: "Understanding Your Money Mindset", duration: "30 min", locked: false },
        { title: "Creating Your Financial Blueprint", duration: "35 min", locked: true },
        { title: "Advanced Strategies", duration: "40 min", locked: true },
        { title: "Implementation & Action Steps", duration: "20 min", locked: true },
    ];

    return (
        <div className="min-h-screen bg-background">
            <ModernHeader />
            
            <div className="pt-32 pb-16">
                {purchaseSuccess && (
                    <div className="max-w-6xl mx-auto px-4 mb-8">
                        <Alert variant="default" className="bg-accent/10 border-accent/30 text-accent-foreground">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>Purchase Successful!</AlertTitle>
                            <AlertDescription>
                                You now have access to this course. Enjoy your learning journey!
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Course Header */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    <BookOpen className="w-4 h-4" />
                                    {course.category}
                                </div>
                                
                                <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 leading-tight">
                                    {course.title}
                                </h1>
                                
                                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                                    {course.description}
                                </p>

                                {/* Course Stats */}
                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>1,247 students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span>4.8 (324 reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.format}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Course Image */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                <ResponsiveImage 
                                    src={`https://images.unsplash.com/photo-1586448681913-2fc1b29c5cca?w=800&h=450&fit=crop`} 
                                    alt={course.title} 
                                    width={800} 
                                    height={450} 
                                    className="w-full h-full object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Button size="lg" className="gradient-primary text-white rounded-full px-8 py-4">
                                        <Play className="w-6 h-6 mr-2" />
                                        Preview Course
                                    </Button>
                                </div>
                            </div>

                            {/* Course Description */}
                            <Card className="premium-card">
                                <CardHeader>
                                    <CardTitle className="text-2xl">What You'll Learn</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {course.longDescription}
                                    </p>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {courseFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                                <feature.icon className="w-5 h-5 text-primary" />
                                                <div>
                                                    <div className="font-medium">{feature.label}</div>
                                                    <div className="text-sm text-muted-foreground">{feature.value}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Curriculum */}
                            <Card className="premium-card">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Course Curriculum</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {curriculum.map((lesson, index) => (
                                            <div 
                                                key={index}
                                                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                                                    lesson.locked 
                                                        ? 'bg-muted/30 border-muted' 
                                                        : 'bg-accent/5 border-accent/20 hover:bg-accent/10'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                                        lesson.locked 
                                                            ? 'bg-muted text-muted-foreground' 
                                                            : 'bg-accent text-accent-foreground'
                                                    }`}>
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className={`font-medium ${lesson.locked ? 'text-muted-foreground' : ''}`}>
                                                            {lesson.title}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {lesson.duration}
                                                        </div>
                                                    </div>
                                                </div>
                                                {lesson.locked && (
                                                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                        Locked
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Purchase Card */}
                            <Card className="premium-card sticky top-32">
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-bold text-gradient mb-2">
                                            ${course.price}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            One-time payment • Lifetime access
                                        </div>
                                    </div>

                                    <PurchaseModal course={course} />

                                    <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent" />
                                            <span>30-day money-back guarantee</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent" />
                                            <span>Lifetime access to course materials</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent" />
                                            <span>Certificate of completion</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent" />
                                            <span>Access to private community</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Instructor Card */}
                            <Card className="premium-card">
                                <CardContent className="p-6">
                                    <h3 className="font-headline text-lg font-bold mb-4">Your Instructor</h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src="https://i.pravatar.cc/60?img=5"
                                            alt="Instructor"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium">Alex Morgan</div>
                                            <div className="text-sm text-muted-foreground">Financial Expert</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Certified Financial Planner with 15+ years of experience helping 
                                        people achieve financial independence.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}