
import React, { useState } from "react";
import { Check, HelpCircle, Info, Lightbulb, Search, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { harvestOpportunities } from "@/data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  
  const filteredOpportunities = harvestOpportunities.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const lossAssets = filteredOpportunities.filter((asset) => asset.status === "loss");
  const gainAssets = filteredOpportunities.filter((asset) => asset.status === "gain");
  
  const totalPotentialSavings = lossAssets.reduce(
    (total, asset) => total + asset.potentialSaving,
    0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-3xl">Harvest Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            Identify and act on tax-loss harvesting opportunities
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="pl-8 w-full md:w-[200px] lg:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <TrendingDown className="mr-2 h-4 w-4" /> Take Action
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Total Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalPotentialSavings.toLocaleString()}</div>
            <p className="text-white/80 text-sm">From {lossAssets.length} harvestable assets</p>
          </CardContent>
        </Card>
        
        <Card className="bg-navy-800 text-white md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-500 rounded-full p-2">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI Suggests</h3>
                <p className="text-white/80">
                  Your portfolio has several tax-loss harvesting opportunities. Consider harvesting losses in tech stocks 
                  and crypto assets before year-end to offset your capital gains.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="harvest" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="harvest">Harvest Opportunities</TabsTrigger>
          <TabsTrigger value="all">All Assets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="harvest">
          <div className="grid grid-cols-1 gap-4">
            {lossAssets.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>No harvestable assets match your search criteria</p>
                </CardContent>
              </Card>
            ) : (
              lossAssets.map((asset) => (
                <Card key={asset.id} hoverable className="border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{asset.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{asset.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2">
                              {asset.type}
                            </Badge>
                            <Badge variant="destructive" className="flex items-center">
                              <TrendingDown className="mr-1 h-3 w-3" /> Loss
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Value</p>
                          <p className="font-semibold">₹{asset.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Initial Value</p>
                          <p className="font-semibold">₹{asset.initialValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Loss Amount</p>
                          <p className="font-semibold text-red-500">₹{asset.loss.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tax Saving</p>
                          <p className="font-semibold text-emerald-500">₹{asset.potentialSaving.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedAsset(asset)}>
                              <Info className="mr-1 h-4 w-4" /> Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <span>{asset.icon}</span> {asset.name}
                              </DialogTitle>
                              <DialogDescription>
                                Tax-loss harvesting opportunity details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Current Value</p>
                                    <p className="text-lg font-semibold">₹{asset.currentValue.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Initial Value</p>
                                    <p className="text-lg font-semibold">₹{asset.initialValue.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Loss Amount</p>
                                    <p className="text-lg font-semibold text-red-500">₹{asset.loss.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Potential Tax Saving</p>
                                    <p className="text-lg font-semibold text-emerald-500">₹{asset.potentialSaving.toLocaleString()}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Performance</h4>
                                  <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <BarChart
                                        data={[
                                          { name: "Initial Value", value: asset.initialValue },
                                          { name: "Current Value", value: asset.currentValue },
                                          { name: "Loss", value: asset.loss },
                                          { name: "Tax Saving", value: asset.potentialSaving }
                                        ]}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                        <Bar dataKey="value" fill="#2ECC71" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">AI Analysis</h4>
                                  <div className="bg-muted p-3 rounded-lg text-sm">
                                    <p>{asset.details}</p>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between">
                                  <Button variant="outline">
                                    <HelpCircle className="mr-2 h-4 w-4" /> Learn More
                                  </Button>
                                  <Button>
                                    <Check className="mr-2 h-4 w-4" /> Harvest Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="default" size="sm">
                          <TrendingDown className="mr-1 h-4 w-4" /> Harvest
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-4">
            {filteredOpportunities.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p>No assets match your search criteria</p>
                </CardContent>
              </Card>
            ) : (
              filteredOpportunities.map((asset) => (
                <Card 
                  key={asset.id} 
                  hoverable 
                  className={`border-l-4 ${
                    asset.status === "loss" ? "border-l-red-500" : "border-l-emerald-500"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{asset.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{asset.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2">
                              {asset.type}
                            </Badge>
                            {asset.status === "loss" ? (
                              <Badge variant="destructive" className="flex items-center">
                                <TrendingDown className="mr-1 h-3 w-3" /> Loss
                              </Badge>
                            ) : (
                              <Badge variant="default" className="flex items-center bg-emerald-500">
                                <TrendingUp className="mr-1 h-3 w-3" /> Gain
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-0">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Value</p>
                          <p className="font-semibold">₹{asset.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Initial Value</p>
                          <p className="font-semibold">₹{asset.initialValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {asset.status === "loss" ? "Loss Amount" : "Gain Amount"}
                          </p>
                          <p className={`font-semibold ${
                            asset.status === "loss" ? "text-red-500" : "text-emerald-500"
                          }`}>
                            ₹{(asset.loss || asset.gain).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Recommendation</p>
                          <p className="font-semibold">{asset.recommendation}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          <Info className="mr-1 h-4 w-4" /> Details
                        </Button>
                        {asset.status === "loss" && (
                          <Button variant="default" size="sm">
                            <TrendingDown className="mr-1 h-4 w-4" /> Harvest
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Opportunities;
