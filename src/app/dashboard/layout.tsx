export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="space-y-2 mb-10">
            <h1 className="text-4xl font-bold font-headline">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here are your courses and tools.</p>
        </div>
        {children}
    </div>
  );
}
