import { cn } from "@/lib/utils";
import { Container } from "./container";
import  LogoContainer  from "./logo-container";
import  MainRoutes  from "@/lib/helper";
import { NavLink } from "react-router";
import { ProfileContainer } from "@/containers/profile-container";
import { ToggleContainer } from "@/containers/toggle-container";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@clerk/clerk-react";

 const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      className={cn(
        "w-full border-x-0 border-t-0 border-b border-border/20 duration-300 transition-all ease-in-out",
        "glass-effect backdrop-blur-md bg-background/80 sticky top-0 z-50",
        "shadow-sm hover:shadow-md"
      )}
    >
      <Container>
        <div className="flex items-center gap-6 py-4">
          {/* logo section */}
          <div className="animate-fade-in">
            <LogoContainer />
          </div>
          
          {/* navigation section */}
          <nav className="hidden md:flex items-center gap-4 flex-1 justify-center">
            <ul className="flex items-center gap-8">
              {MainRoutes.map((route, index) => (
                <li key={route.href} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "text-base font-medium transition-all duration-200 relative",
                        "text-muted-foreground hover:text-foreground",
                        "after:content-[''] after:absolute after:bottom-0 after:left-0",
                        "after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                        "after:scale-x-0 hover:after:scale-x-100",
                        isActive && "text-foreground after:scale-x-100 font-semibold"
                      )
                    }
                    to={route.href}
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}

              {userId && (
                <li className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "text-base font-medium transition-all duration-200 relative",
                        "text-muted-foreground hover:text-foreground",
                        "after:content-[''] after:absolute after:bottom-0 after:left-0",
                        "after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                        "after:scale-x-0 hover:after:scale-x-100",
                        isActive && "text-foreground after:scale-x-100 font-semibold"
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

          <div className="ml-auto flex items-center gap-4 animate-fade-in">
            {/* theme toggle */}
            <div className="hover-lift">
              <ThemeToggle />
            </div>
            {/* profile section */}
            <div>
              <ProfileContainer />
            </div>
            {/* mobile menu toggle */}
            <div className="hover-lift md:hidden">
              <ToggleContainer />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header