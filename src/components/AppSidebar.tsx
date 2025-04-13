
import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, BookOpen, Home, Settings, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppSidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Opportunities",
      icon: TrendingUp,
      href: "/opportunities",
    },
    {
      title: "Learn & Earn",
      icon: BookOpen,
      href: "/learn",
    },
    {
      title: "Tax Simulator",
      icon: BarChart3,
      href: "/simulator",
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center py-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 rounded-md bg-emerald-500 text-white">
            <TrendingUp size={24} />
          </div>
          <h1 className="text-xl font-bold">SmartHarvest</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-emerald-100 text-emerald-800 font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="px-3 py-2">
        <div className="flex items-center gap-3 rounded-md px-2 py-2 bg-muted/50">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-emerald-200 text-emerald-800">AN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Anuj Nair</span>
            <span className="text-xs text-muted-foreground">Premium Plan</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
