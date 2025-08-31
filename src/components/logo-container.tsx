import { Link } from "react-router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LogoContainer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo to show based on theme
  const logoSrc = mounted && theme === "dark" ? "/svg/logo.svg" : "/svg/logo2.svg";

  return (
    <Link to={"/"}>
      <img
        src={logoSrc}
        alt="Logo"
        className="min-w-10 min-h-10 object-contain transition-all duration-300"
      />
    </Link>
  );
};

export default LogoContainer;