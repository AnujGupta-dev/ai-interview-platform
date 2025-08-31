import React from "react";

import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"; // Import Lucide icons
import { Link } from "react-router";
import { Container } from "@/components/container";
import MainRoutes from "@/lib/helper";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg ${hoverColor}`}
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-background via-background to-muted/30 border-t border-border/50">
      <Container>
        <div className="py-12 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* First Column: Links */}
            <div className="animate-slide-up">
              <h3 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                <span className="w-1 h-6 gradient-primary rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3  text-left">
                {MainRoutes.map((route, index) => (
                  <li key={route.href} style={{ animationDelay: `${index * 0.1}s` }}>
                    <FooterLink to={route.href}>
                      {route.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Column: About Us */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                <span className="w-1 h-6 gradient-primary rounded-full"></span>
                About Us
              </h3>
              <p className="text-muted-foreground leading-relaxed  text-left">
                We are committed to helping you unlock your full potential with
                AI-powered tools. Our platform offers a wide range of resources to
                improve your interview skills and chances of success.
              </p>
            </div>

            {/* Third Column: Services */}
            <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                <span className="w-1 h-6 gradient-primary rounded-full"></span>
                Services
              </h3>
              <ul className="space-y-3 text-muted-foreground text-left">
                <p>
                  Interview Preparation
                </p>
                <p>
                  Career Coaching
                </p>
                <p>
                  Resume Building
                </p>
              </ul>
            </div>

            {/* Fourth Column: Contact and Social Media */}
            <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <h3 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
                <span className="w-1 h-6 gradient-primary rounded-full"></span>
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>123 AI Street, Tech City, 12345</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>contact@aiinterview.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    <SocialLink
                      href="https://facebook.com"
                      icon={<Facebook size={20} />}
                      hoverColor="hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                    />
                    <SocialLink
                      href="https://twitter.com"
                      icon={<Twitter size={20} />}
                      hoverColor="hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                    />
                    <SocialLink
                      href="https://instagram.com"
                      icon={<Instagram size={20} />}
                      hoverColor="hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/20"
                    />
                    <SocialLink
                      href="https://linkedin.com"
                      icon={<Linkedin size={20} />}
                      hoverColor="hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © 2024 AI Interview Platform. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;