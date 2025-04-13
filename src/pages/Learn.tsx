
import React from "react";
import { Award, BookOpen, Check, ChevronRight, Medal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { learningModules, badges } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";

const Learn = () => {
  const completedModules = learningModules.filter(module => module.completed);
  const totalXp = learningModules.reduce((total, module) => {
    return total + (module.completed ? module.xpPoints : Math.floor(module.xpPoints * (module.progress / 100)));
  }, 0);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">Learn & Earn Hub</h1>
        <p className="text-muted-foreground mt-1">
          Master tax-loss harvesting and earn rewards
        </p>
      </div>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-3xl font-bold">{completedModules.length} / {learningModules.length}</div>
                <p className="text-white/90">Modules completed</p>
              </div>
              <div>
                <div className="text-3xl font-bold">{totalXp} XP</div>
                <p className="text-white/90">Experience points earned</p>
              </div>
              <div>
                <div className="text-3xl font-bold">{badges.filter(badge => badge.earned).length}</div>
                <p className="text-white/90">Badges earned</p>
              </div>
            </div>
            
            <Progress 
              value={(completedModules.length / learningModules.length) * 100} 
              className="h-2 bg-white/20"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" /> Your Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-navy-800 flex items-center justify-center">
                <div className="text-6xl">🥷</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Tax Ninja</h3>
              <p className="text-sm text-muted-foreground">Your Tax IQ is 87%</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Learning Content */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="badges">Badges & Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules" className="space-y-4">
          {learningModules.map((module) => (
            <Card key={module.id} hoverable className={module.completed ? "border-emerald-200" : ""}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-navy-100 rounded-xl text-3xl">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center">
                        {module.title}
                        {module.completed && (
                          <Check className="ml-2 h-5 w-5 text-emerald-500" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <Medal className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{module.xpPoints} XP</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {module.duration} to complete
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                    {!module.completed && module.progress > 0 && (
                      <div className="w-full sm:w-36 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                    <Button 
                      variant={module.completed ? "outline" : "default"} 
                      className={module.completed ? "border-emerald-500 text-emerald-500 hover:bg-emerald-50" : ""}
                    >
                      {module.completed ? "Review Module" : module.progress > 0 ? "Continue" : "Start Learning"}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Card key={badge.id} hoverable className={badge.earned ? "" : "opacity-70"}>
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full ${badge.earned ? "bg-emerald-100" : "bg-gray-100"} flex items-center justify-center mb-3`}>
                      <div className="text-4xl">{badge.icon}</div>
                    </div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                    <div className="mt-3">
                      {badge.earned ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs">
                          <Award className="h-3 w-3" /> Earned
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                          Locked
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Quiz Section */}
      <Card>
        <CardHeader>
          <CardTitle>Test Your Knowledge</CardTitle>
          <CardDescription>Take a quiz to earn XP and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Question: What is the wash sale rule?</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="option1" name="quiz" className="h-4 w-4 text-emerald-500" />
                  <label htmlFor="option1">A rule that prevents claiming a loss on a security sold at a loss and repurchased within 30 days</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="option2" name="quiz" className="h-4 w-4 text-emerald-500" />
                  <label htmlFor="option2">A rule that requires washing your hands before trading securities</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="option3" name="quiz" className="h-4 w-4 text-emerald-500" />
                  <label htmlFor="option3">A rule that allows unlimited tax deductions on investment losses</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="option4" name="quiz" className="h-4 w-4 text-emerald-500" />
                  <label htmlFor="option4">A rule that allows you to claim losses on securities regardless of when you repurchase them</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Submit Answer</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Learn;
