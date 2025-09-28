
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailsLoading() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
            <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-[500px] rounded-lg" />
            </div>
            <div className="flex flex-col gap-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-12 w-48" />
                <div className="mt-6 space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className a="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
