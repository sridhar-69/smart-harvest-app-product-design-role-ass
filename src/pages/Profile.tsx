
import React from "react";
import { Award, ChartBar, Download, Link, Settings, Star, TrendingDown, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userData, badges, achievementMetrics, learningModules } from "@/data/mockData";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Profile = () => {
  // Calculate completion percentages
  const modulesCompletionPercent = (achievementMetrics.modulesCompleted / achievementMetrics.totalModules) * 100;
  const badgesEarnedPercent = (badges.filter(b => b.earned).length / badges.length) * 100;
  
  // Prepare data for radar chart
  const skillsData = [
    { skill: "Tax Knowledge", value: 87 },
    { skill: "Investment Strategy", value: 75 },
    { skill: "Loss Harvesting", value: 90 },
    { skill: "Portfolio Analysis", value: 65 },
    { skill: "Market Timing", value: 60 },
  ];
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-3xl">Your Profile</h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and achievements
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" /> Account Settings
        </Button>
      </div>
      
      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="text-xl bg-navy-800 text-white">
                {userData.name.slice(0, 1)}N
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{userData.name} Nair</h2>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                  {userData.plan} Plan
                </Badge>
                <Badge variant="outline" className="bg-navy-100 text-navy-800 hover:bg-navy-200">
                  Tax Ninja
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center">
                  <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" /> Top Harvester
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Member since April 2024
              </p>
            </div>
            
            <div className="md:ml-auto space-y-2">
              <Button variant="outline" className="w-full">
                <Link className="mr-2 h-4 w-4" /> Connect Portfolios
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Tax Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <TrendingDown className="h-4 w-4" /> Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievementMetrics.opportunitiesIdentified}</div>
            <p className="text-muted-foreground text-sm">Tax-saving opportunities identified</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <ChartBar className="h-4 w-4" /> Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{achievementMetrics.savingsGained.toLocaleString()}</div>
            <p className="text-white/90 text-sm">Total tax savings secured</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4" /> Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievementMetrics.modulesCompleted}/{achievementMetrics.totalModules}</div>
            <p className="text-muted-foreground text-sm">Learning modules completed</p>
            <Progress value={modulesCompletionPercent} className="h-1 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" /> Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.confidenceScore}%</div>
            <p className="text-muted-foreground text-sm">Tax confidence score</p>
            <Progress value={userData.confidenceScore} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for Details */}
      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="skills">Skills & Knowledge</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
              <CardDescription>Your achievements and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className={`flex flex-col items-center p-3 rounded-lg border 
                      ${badge.earned ? 'bg-white' : 'bg-muted/50 opacity-60'}`}
                  >
                    <div className={`w-12 h-12 rounded-full ${badge.earned ? 'bg-emerald-100' : 'bg-gray-100'} flex items-center justify-center mb-2`}>
                      <div className="text-2xl">{badge.icon}</div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{badge.name}</p>
                      {badge.earned ? (
                        <Badge variant="outline" className="mt-1 bg-emerald-50 text-emerald-700 text-xs">Earned</Badge>
                      ) : (
                        <Badge variant="outline" className="mt-1 bg-gray-100 text-gray-500 text-xs">Locked</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Progress value={badgesEarnedPercent} className="h-1 mt-6" />
              <p className="text-center text-sm text-muted-foreground mt-2">
                {badges.filter(b => b.earned).length} of {badges.length} badges earned
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "April 12, 2025", action: "Completed 'Wash Sale Rules' learning module", icon: "📚" },
                  { date: "April 10, 2025", action: "Harvested losses on NFLX stock", icon: "📉" },
                  { date: "April 05, 2025", action: "Earned 'Tax Ninja' badge", icon: "🥷" },
                  { date: "April 02, 2025", action: "Identified 3 new harvesting opportunities", icon: "🔍" },
                  { date: "March 28, 2025", action: "Started tax-loss harvesting journey", icon: "🚀" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                    <div className="bg-muted rounded-full p-2 text-lg">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Knowledge Profile</CardTitle>
              <CardDescription>Your skills and expertise areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#2ECC71"
                      fill="#2ECC71"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your educational journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningModules.map((module) => (
                  <div key={module.id} className="flex items-center gap-3">
                    <div className="text-2xl">{module.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{module.title}</p>
                        <span className="text-sm">
                          {module.completed ? "Completed" : `${module.progress}%`}
                        </span>
                      </div>
                      <Progress 
                        value={module.progress} 
                        className="h-1.5 mt-1" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
