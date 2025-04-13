
import React, { useState } from "react";
import { 
  Check, HelpCircle, Info, Lightbulb, Search, 
  TrendingDown, TrendingUp, AlertCircle, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { harvestOpportunities } from "@/data/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const { toast } = useToast();
  
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

  // Format currency values consistently
  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const handleHarvest = (asset: any) => {
    toast({
      title: "Harvest initiated",
      description: `Processing tax-loss harvesting for ${asset.name}`,
      variant: "default",
    });
  };

  return (
    <div className="content-spacing animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Harvest Opportunities</h1>
          <p className="text-muted-foreground">
            Identify and act on tax-loss harvesting opportunities
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="pl-10 w-full md:w-[250px] h-12 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="btn-accent h-12 px-5 rounded-lg" onClick={() => {
            toast({
              title: "Bulk action",
              description: "Processing multiple harvesting opportunities",
            });
          }}>
            <TrendingDown className="mr-2 h-5 w-5" /> Take Action
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg animate-hover-scale overflow-hidden rounded-xl">
          <CardContent className="card-content">
            <h3 className="text-white font-semibold text-lg mb-3">Total Potential Savings</h3>
            <div className="text-3xl font-bold mb-2">{formatCurrency(totalPotentialSavings)}</div>
            <p className="text-white/90 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              From {lossAssets.length} harvestable assets
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-navy-800 text-white md:col-span-2 shadow-lg rounded-xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start space-x-6">
              <div className="bg-emerald-500 rounded-full p-3 animate-pulse-slow">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">AI Suggests</h3>
                <p className="text-white/90 leading-relaxed">
                  Your portfolio has several tax-loss harvesting opportunities. Consider harvesting losses in tech stocks 
                  and crypto assets before year-end to offset your capital gains.
                </p>
                <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-white/10 mt-3 pl-0">
                  View AI recommendations <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="harvest" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] p-1 rounded-lg">
          <TabsTrigger value="harvest" className="text-sm py-3 rounded-md">
            Harvest Opportunities
          </TabsTrigger>
          <TabsTrigger value="all" className="text-sm py-3 rounded-md">
            All Assets
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="harvest" className="space-y-5 pt-2">
          <div className="grid grid-cols-1 gap-5">
            {lossAssets.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p>No harvestable assets match your search criteria</p>
                </CardContent>
              </Card>
            ) : (
              lossAssets.map((asset) => (
                <Card key={asset.id} hoverable className="border-l-4 border-l-red-500 shadow-md overflow-hidden rounded-xl animate-scale-in">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{asset.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{asset.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="rounded-md text-xs font-medium">
                              {asset.type}
                            </Badge>
                            <Badge variant="destructive" className="flex items-center rounded-md">
                              <TrendingDown className="mr-1 h-3 w-3" /> Loss
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Table className="md:w-auto w-full mt-4 md:mt-0 table-enhanced">
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-0">
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Current Value</TableHead>
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Initial Value</TableHead>
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Loss Amount</TableHead>
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Tax Saving</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-transparent border-0">
                            <TableCell className="font-medium p-0">{formatCurrency(asset.currentValue)}</TableCell>
                            <TableCell className="font-medium p-0">{formatCurrency(asset.initialValue)}</TableCell>
                            <TableCell className="font-medium p-0 text-red-500">{formatCurrency(asset.loss)}</TableCell>
                            <TableCell className="font-medium p-0 text-emerald-500">{formatCurrency(asset.potentialSaving)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-md transition-all duration-200 hover:bg-slate-100" onClick={() => setSelectedAsset(asset)}>
                              <Info className="mr-2 h-4 w-4" /> Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3 text-xl">
                                <span>{asset.icon}</span> {asset.name}
                              </DialogTitle>
                              <DialogDescription>
                                Tax-loss harvesting opportunity details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-6">
                              <div className="space-y-6">
                                <Table className="table-enhanced">
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className="text-sm text-muted-foreground">Current Value</TableCell>
                                      <TableCell className="text-lg font-semibold">{formatCurrency(asset.currentValue)}</TableCell>
                                      <TableCell className="text-sm text-muted-foreground">Initial Value</TableCell>
                                      <TableCell className="text-lg font-semibold">{formatCurrency(asset.initialValue)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="text-sm text-muted-foreground">Loss Amount</TableCell>
                                      <TableCell className="text-lg font-semibold text-red-500">{formatCurrency(asset.loss)}</TableCell>
                                      <TableCell className="text-sm text-muted-foreground">Tax Saving</TableCell>
                                      <TableCell className="text-lg font-semibold text-emerald-500">{formatCurrency(asset.potentialSaving)}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-3">Performance</h4>
                                  <div className="h-[220px] bg-slate-50 rounded-lg p-3">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <BarChart
                                        data={[
                                          { name: "Initial Value", value: asset.initialValue },
                                          { name: "Current Value", value: asset.currentValue },
                                          { name: "Loss", value: asset.loss },
                                          { name: "Tax Saving", value: asset.potentialSaving }
                                        ]}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                        <Bar dataKey="value" fill="#2ECC71" radius={[4, 4, 0, 0]} />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-3">AI Analysis</h4>
                                  <div className="bg-muted p-4 rounded-lg text-sm leading-relaxed">
                                    <p>{asset.details}</p>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between pt-3">
                                  <Button variant="outline" className="rounded-md transition-all duration-200">
                                    <HelpCircle className="mr-2 h-4 w-4" /> Learn More
                                  </Button>
                                  <Button className="rounded-md bg-emerald-500 hover:bg-emerald-600 transition-all duration-200"
                                          onClick={() => handleHarvest(asset)}>
                                    <Check className="mr-2 h-4 w-4" /> Harvest Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="rounded-md bg-emerald-500 hover:bg-emerald-600 transition-all duration-200"
                          onClick={() => handleHarvest(asset)}
                        >
                          <TrendingDown className="mr-2 h-4 w-4" /> Harvest
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-5 pt-2">
          <div className="grid grid-cols-1 gap-5">
            {filteredOpportunities.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
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
                  } shadow-md overflow-hidden rounded-xl animate-scale-in`}
                >
                  <CardContent className="p-5 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{asset.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{asset.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="rounded-md text-xs font-medium">
                              {asset.type}
                            </Badge>
                            {asset.status === "loss" ? (
                              <Badge variant="destructive" className="flex items-center rounded-md">
                                <TrendingDown className="mr-1 h-3 w-3" /> Loss
                              </Badge>
                            ) : (
                              <Badge variant="default" className="flex items-center bg-emerald-500 rounded-md">
                                <TrendingUp className="mr-1 h-3 w-3" /> Gain
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Table className="md:w-auto w-full mt-4 md:mt-0 table-enhanced">
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-0">
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Current Value</TableHead>
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Initial Value</TableHead>
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">
                              {asset.status === "loss" ? "Loss Amount" : "Gain Amount"}
                            </TableHead>
                            <TableHead className="h-8 p-0 text-xs text-muted-foreground">Recommendation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-transparent border-0">
                            <TableCell className="font-medium p-0">{formatCurrency(asset.currentValue)}</TableCell>
                            <TableCell className="font-medium p-0">{formatCurrency(asset.initialValue)}</TableCell>
                            <TableCell className={`font-medium p-0 ${
                              asset.status === "loss" ? "text-red-500" : "text-emerald-500"
                            }`}>
                              {formatCurrency(asset.status === "loss" ? asset.loss : asset.gain)}
                            </TableCell>
                            <TableCell className="font-medium p-0">{asset.recommendation}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="rounded-md transition-all duration-200 hover:bg-slate-100"
                        >
                          <Info className="mr-2 h-4 w-4" /> Details
                        </Button>
                        {asset.status === "loss" && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="rounded-md bg-emerald-500 hover:bg-emerald-600 transition-all duration-200"
                            onClick={() => handleHarvest(asset)}
                          >
                            <TrendingDown className="mr-2 h-4 w-4" /> Harvest
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
