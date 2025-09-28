import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function CourseCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Skeleton className="h-full w-full" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <Skeleton className="mb-3 h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-1/3" />
        </div>
      </CardFooter>
    </Card>
  )
}
