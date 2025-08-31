import { Container } from "@/components/container";
import { Headings } from "@/components/headings";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb, 
  TrendingUp, 
  Shield,
  CheckCircle,
  Star
} from "lucide-react";

export const AboutUsPage = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Target, value: "95%", label: "Success Rate" },
    { icon: Award, value: "250K+", label: "Interviews Conducted" },
    { icon: TrendingUp, value: "1.2M+", label: "Offers Received" },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to provide personalized interview experiences that adapt to your unique needs."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data is protected with enterprise-grade security. We never record or store your video interviews."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We're committed to helping you achieve your career goals with proven strategies and real-time feedback."
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of professionals who trust our platform to advance their careers and land dream jobs."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former Google engineer with 10+ years in AI and product development.",
      expertise: ["AI/ML", "Product Strategy", "Leadership"]
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Expert in machine learning and natural language processing.",
      expertise: ["Machine Learning", "NLP", "System Architecture"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Career coach with experience at top tech companies.",
      expertise: ["Career Coaching", "UX Design", "Product Management"]
    }
  ];

  return (
    <div className="animate-fade-in">
      <Container>
        {/* Breadcrumb */}
        <div className="animate-slide-up">
          <CustomBreadCrumb
            breadCrumbPage="About Us"
            breadCrumpItems={[{ label: "Home", link: "/" }]}
          />
        </div>

        {/* Hero Section */}
        <div className="my-12 animate-slide-up">
          <Headings
            title="About AI Interview Platform"
            description="Empowering professionals worldwide with AI-driven interview preparation and career advancement tools."
          />
        </div>

        {/* Mission Statement */}
        <div className="gradient-card p-8 rounded-2xl mb-12 animate-scale-in hover-lift">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe everyone deserves the opportunity to showcase their true potential in interviews. 
              Our AI-powered platform transforms the way professionals prepare for interviews, providing 
              personalized feedback, real-time coaching, and data-driven insights to help you succeed.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-slide-up hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="gradient-card p-6 rounded-xl">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="gradient-card hover-lift animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground mb-2">
                        {value.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="gradient-card hover-lift animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </CardTitle>
                  <div className="text-primary font-semibold mb-3">
                    {member.role}
                  </div>
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="gradient-card p-8 rounded-2xl animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Why Choose AI Interview Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">AI-Powered Feedback</h3>
                <p className="text-sm text-muted-foreground">Get instant, personalized feedback on your interview performance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Real-time Coaching</h3>
                <p className="text-sm text-muted-foreground">Practice with AI interviewers that adapt to your skill level</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Industry-Specific Questions</h3>
                <p className="text-sm text-muted-foreground">Tailored questions for your specific role and industry</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor your improvement with detailed analytics</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
