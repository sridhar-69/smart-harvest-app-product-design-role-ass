
import React from "react";
import { BarChart3, Bell, Calendar, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import { userData, portfolioSummary, harvestOpportunities } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid, Tooltip } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Prepare data for pie chart
  const gainLossData = [
    { name: "Gains", value: portfolioSummary.gainLossDistribution.gains },
    { name: "Losses", value: portfolioSummary.gainLossDistribution.losses },
  ];
  
  // Prepare data for asset allocation chart
  const allocationData = [
    { name: "Stocks", value: portfolioSummary.assetAllocation.stocks },
    { name: "Bonds", value: portfolioSummary.assetAllocation.bonds },
    { name: "REITs", value: portfolioSummary.assetAllocation.reits },
    { name: "Crypto", value: portfolioSummary.assetAllocation.crypto },
  ];
  
  // Prepare data for harvest opportunities bar chart
  const harvestableAssets = harvestOpportunities
    .filter(asset => asset.status === "loss")
    .map(asset => ({
      name: asset.name.split(" - ")[0],
      saving: asset.potentialSaving,
      loss: asset.loss,
    }));
    
  const COLORS = ["#2ECC71", "#1C2833", "#3498DB", "#9B59B6"];
  const GAIN_LOSS_COLORS = ["#2ECC71", "#E74C3C"];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">
            Hi {userData.name}, here's your tax-saving summary today
          </h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="bg-gradient-to-br from-emerald-500/90 to-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/90 flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Potential Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{userData.taxSavings.toLocaleString()}</div>
            <p className="text-white/80 text-sm">This quarter through harvesting</p>
          </CardContent>
        </Card>
        
        <Card hoverable>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <TrendingDown className="h-4 w-4" /> Harvestable Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.harvestableAssets}</div>
            <p className="text-muted-foreground text-sm">Out of {userData.totalAssets} total assets</p>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> Next Tax Filing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96 days</div>
            <p className="text-muted-foreground text-sm">July 15, 2025</p>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="h-4 w-4" /> Portfolio Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(portfolioSummary.totalValue / 100000).toFixed(1)}L</div>
            <p className="text-muted-foreground text-sm">Total portfolio value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gain/Loss Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Gain/Loss Distribution</CardTitle>
            <CardDescription>Current portfolio status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gainLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {gainLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GAIN_LOSS_COLORS[index % GAIN_LOSS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Gains: ₹{(portfolioSummary.gainLossDistribution.gains / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Losses: ₹{(portfolioSummary.gainLossDistribution.losses / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Asset Allocation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Diversification overview</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <div className="grid grid-cols-2 gap-2 w-full text-sm">
              {allocationData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>

        {/* Harvest Opportunities */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Tax Saving Potential</CardTitle>
            <CardDescription>Top opportunities</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={harvestableAssets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="saving" name="Potential Saving" fill="#2ECC71" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => navigate('/opportunities')}
            >
              <TrendingUp className="mr-2 h-4 w-4" /> View All Opportunities
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Notification Banner */}
      <Card className="bg-navy-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-emerald-500 rounded-full p-2 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Tax-Saving Opportunity Alert</h3>
              <p className="text-white/80">You can save ₹12,500 this quarter through strategic harvesting.</p>
            </div>
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Take Action
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
