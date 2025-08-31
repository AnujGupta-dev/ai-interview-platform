import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

import MainRoutes  from "@/lib/helper";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const ToggleContainer = () => {
  const { userId } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="w-9 h-9 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 bg-background border-l border-border/50">
        <nav className="mt-8">
          <ul className="flex flex-col items-start gap-6">
            {MainRoutes.map((route, index) => (
              <li key={route.href} className="w-full animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "text-base font-medium transition-all duration-200 relative block w-full py-2 px-4 rounded-lg",
                      "text-muted-foreground hover:text-foreground hover:bg-accent",
                      isActive && "text-foreground bg-accent font-semibold"
                    )
                  }
                  to={route.href}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}

            {userId && (
              <li className="w-full animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "text-base font-medium transition-all duration-200 relative block w-full py-2 px-4 rounded-lg",
                      "text-muted-foreground hover:text-foreground hover:bg-accent",
                      isActive && "text-foreground bg-accent font-semibold"
                    )
                  }
                  to={"/generate"}
                >
                  Take an Interview
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
