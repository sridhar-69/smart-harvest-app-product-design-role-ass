import React, { useState, useEffect } from "react";
import { Calculator, Check, ChevronDown, Info, RefreshCw, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { harvestOpportunities } from "@/data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const taxBrackets = [
  { value: "10", label: "10% - Basic Rate" },
  { value: "20", label: "20% - Standard Rate" },
  { value: "30", label: "30% - Higher Rate" },
];

const Simulator = () => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [taxRate, setTaxRate] = useState("20");
  const [additionalCapitalGains, setAdditionalCapitalGains] = useState(50000);
  const [includeWashSale, setIncludeWashSale] = useState(true);
  
  const [taxSavingsBeforeHarvest, setTaxSavingsBeforeHarvest] = useState(0);
  const [taxSavingsAfterHarvest, setTaxSavingsAfterHarvest] = useState(0);

  const lossAssets = harvestOpportunities.filter(asset => asset.status === "loss");
  
  const toggleAssetSelection = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter(id => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };
  
  const selectAllAssets = () => {
    setSelectedAssets(lossAssets.map(asset => asset.id));
  };
  
  const clearAssetSelection = () => {
    setSelectedAssets([]);
  };
  
  useEffect(() => {
    const taxBeforeHarvest = (additionalCapitalGains * parseInt(taxRate)) / 100;
    setTaxSavingsBeforeHarvest(taxBeforeHarvest);
    
    const totalLosses = lossAssets
      .filter(asset => selectedAssets.includes(asset.id))
      .reduce((sum, asset) => sum + asset.loss, 0);
    
    const effectiveLosses = includeWashSale 
      ? totalLosses 
      : totalLosses * 0.8;
    
    const netGains = Math.max(0, additionalCapitalGains - effectiveLosses);
    const taxAfterHarvest = (netGains * parseInt(taxRate)) / 100;
    
    setTaxSavingsAfterHarvest(taxBeforeHarvest - taxAfterHarvest);
  }, [selectedAssets, taxRate, additionalCapitalGains, includeWashSale]);
  
  const comparisonChartData = [
    {
      name: "Before Harvesting",
      tax: taxSavingsBeforeHarvest,
      savings: 0,
    },
    {
      name: "After Harvesting",
      tax: taxSavingsBeforeHarvest - taxSavingsAfterHarvest,
      savings: taxSavingsAfterHarvest,
    },
  ];
  
  const generateImpactData = () => {
    const data = [];
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i < 5; i++) {
      data.push({
        year: currentYear + i,
        withoutHarvesting: additionalCapitalGains * parseInt(taxRate) / 100 * (1 + i * 0.05),
        withHarvesting: (additionalCapitalGains * parseInt(taxRate) / 100 - taxSavingsAfterHarvest) * (1 + i * 0.05),
      });
    }
    
    return data;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">Tax Impact Simulator</h1>
        <p className="text-muted-foreground mt-1">
          Simulate the tax impact of harvesting your losses
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Simulation Parameters
              </CardTitle>
              <CardDescription>Adjust variables to see impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tax-bracket" className="text-sm font-medium">
                    Your Tax Bracket
                  </Label>
                  <Select
                    value={taxRate}
                    onValueChange={(value) => setTaxRate(value)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select your tax bracket" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxBrackets.map((bracket) => (
                        <SelectItem key={bracket.value} value={bracket.value}>
                          {bracket.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="capital-gains" className="text-sm font-medium">
                      Capital Gains (₹)
                    </Label>
                    <span className="text-sm font-medium">
                      ₹{additionalCapitalGains.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    id="capital-gains"
                    min={0}
                    max={200000}
                    step={5000}
                    value={[additionalCapitalGains]}
                    onValueChange={(value) => setAdditionalCapitalGains(value[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>₹0</span>
                    <span>₹200,000</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="wash-sale"
                    checked={includeWashSale}
                    onCheckedChange={setIncludeWashSale}
                  />
                  <div>
                    <Label htmlFor="wash-sale" className="text-sm font-medium">
                      Consider Wash Sale Rules
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Apply 30-day repurchase restrictions
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Select Assets to Harvest</Label>
                  <div className="space-x-1">
                    <Button variant="outline" size="sm" onClick={selectAllAssets}>
                      All
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearAssetSelection}>
                      None
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-[200px] border rounded-md p-2">
                  {lossAssets.map((asset) => (
                    <div 
                      key={asset.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={asset.id}
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => toggleAssetSelection(asset.id)}
                          className="h-4 w-4 text-emerald-500 rounded"
                        />
                        <Label htmlFor={asset.id} className="flex items-center gap-1 cursor-pointer select-none">
                          <span>{asset.icon}</span> {asset.name.split(" - ")[0]}
                        </Label>
                      </div>
                      <span className="text-sm font-medium text-red-500">
                        -₹{asset.loss.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Potential Tax Savings</h3>
                <div className="text-4xl font-bold">
                  ₹{Math.round(taxSavingsAfterHarvest).toLocaleString()}
                </div>
                <p className="text-emerald-100">
                  With {selectedAssets.length} harvested {selectedAssets.length === 1 ? 'asset' : 'assets'}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 bg-white text-emerald-800 border-white hover:bg-emerald-50"
                >
                  <TrendingDown className="mr-2 h-4 w-4" /> Apply This Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Savings Comparison</CardTitle>
              <CardDescription>Before and after tax-loss harvesting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={comparisonChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Legend />
                    <Bar name="Tax Paid" dataKey="tax" fill="#E74C3C" />
                    <Bar name="Tax Saved" dataKey="savings" fill="#2ECC71" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Long-Term Impact Projection</CardTitle>
              <CardDescription>5-year tax savings forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generateImpactData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="withoutHarvesting" 
                      name="Without Harvesting" 
                      stroke="#E74C3C" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="withHarvesting" 
                      name="With Harvesting" 
                      stroke="#2ECC71" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Info className="mr-2 h-4 w-4" /> About This Projection
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">Projection Methodology</h4>
                      <p className="text-sm text-muted-foreground">
                        This projection assumes a 5% annual growth in tax liability without any additional
                        tax-loss harvesting. Actual results may vary based on market conditions and your
                        personal financial situation.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset Simulation
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-emerald-500" /> 
                Summary of Tax-Saving Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Tax Before Harvesting</div>
                    <div className="text-xl font-semibold">₹{Math.round(taxSavingsBeforeHarvest).toLocaleString()}</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Tax After Harvesting</div>
                    <div className="text-xl font-semibold">₹{Math.round(taxSavingsBeforeHarvest - taxSavingsAfterHarvest).toLocaleString()}</div>
                  </div>
                  <div className="bg-emerald-100 p-4 rounded-lg">
                    <div className="text-sm text-emerald-800">Total Savings</div>
                    <div className="text-xl font-semibold text-emerald-800">₹{Math.round(taxSavingsAfterHarvest).toLocaleString()}</div>
                  </div>
                </div>
                
                {selectedAssets.length > 0 ? (
                  <div className="bg-navy-800 text-white p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-500 rounded-full p-1 mt-0.5">
                        <Info className="h-4 w-4" />
                      </div>
                      <div>
                        <p>
                          With {selectedAssets.length} harvested {selectedAssets.length === 1 ? 'asset' : 'assets'}, 
                          you save ₹{Math.round(taxSavingsAfterHarvest).toLocaleString()} in capital gains tax
                          at your current {taxRate}% tax rate.
                        </p>
                        {includeWashSale && (
                          <p className="mt-2 text-sm text-white/80">
                            Remember: Wash sale rules prohibit repurchasing substantially identical securities
                            within 30 days before or after selling at a loss.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-lg flex items-center gap-3">
                    <Info className="h-5 w-5" />
                    <p>Select assets to harvest to see your potential tax savings.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
