
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [marketUpdates, setMarketUpdates] = useState(true);
  const [email, setEmail] = useState("anuj.nair@example.com");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your personal information and account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Harvest Opportunities</p>
                <p className="text-sm text-muted-foreground">Receive alerts about new tax-loss harvesting opportunities</p>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Market Updates</p>
                <p className="text-sm text-muted-foreground">Get notifications about significant market changes</p>
              </div>
              <Switch 
                checked={marketUpdates} 
                onCheckedChange={setMarketUpdates} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your data and privacy preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline">Download My Data</Button>
              <Button variant="outline" className="ml-2">Privacy Policy</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
