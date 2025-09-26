
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive updates about new courses and offers.
                    </p>
                </div>
                <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Get notified on your device. (Coming soon)
                    </p>
                </div>
                <Switch id="push-notifications" disabled />
            </div>
        </div>

         <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Actions</h3>
             <Button variant="outline">Change Password</Button>
             <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
}
