import { Container } from "@/components/container";
import { Headings } from "@/components/headings";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

import { 
   
  Users, 
  Zap,
  Star,
  TrendingUp,
  Shield
} from "lucide-react";

export const ServicesPage = () => {
 

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant feedback and start practicing immediately with our optimized platform."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. We never store your video interviews."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Access to career experts and AI specialists to help you succeed in your job search."
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Join thousands of professionals who have successfully landed their dream jobs."
    }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      company: "Google",
      content: "The AI mock interviews helped me prepare for my Google interview. The feedback was incredibly detailed and accurate.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Product Manager",
      company: "Microsoft",
      content: "The career coaching service transformed my approach to interviews. I landed my dream job within 2 months!",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Data Scientist",
      company: "Amazon",
      content: "The resume builder is amazing. My resume passed through ATS systems and got me multiple interviews.",
      rating: 5
    }
  ];

  return (
    <div className="animate-fade-in">
      <Container>

        {/* Hero Section */}
        <div className="my-12 animate-slide-up">
          <Headings
            title="Our Services"
            description="Comprehensive interview preparation and career development tools designed to help you succeed."
          />
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="gradient-card hover-lift animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="gradient-card hover-lift animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </Container>
    </div>
  );
};
