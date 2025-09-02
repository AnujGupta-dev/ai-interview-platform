import { Container } from "@/components/container";
import { Headings } from "@/components/headings";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
} from "lucide-react";

export const ContactUsPage = () => {


  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      primary: "contact@aiinterview.com",
      secondary: "support@aiinterview.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      primary: "+1 (555) 123-4567",
      secondary: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      primary: "123 AI Street, Tech City",
      secondary: "San Francisco, CA 94105"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "When we're available",
      primary: "Monday - Friday",
      secondary: "9:00 AM - 6:00 PM EST"
    }
  ];

  const faqs = [
    {
      question: "How does the AI interview system work?",
      answer: "Our AI system uses advanced natural language processing to conduct realistic mock interviews. It asks relevant questions based on your role and provides instant feedback on your responses, body language, and overall performance."
    },
    {
      question: "Is my interview data secure?",
      answer: "Absolutely! We take security seriously. Your video interviews are never recorded or stored. All data is processed in real-time and immediately deleted. We use enterprise-grade encryption to protect your information."
    },
    {
      question: "What industries do you support?",
      answer: "We support a wide range of industries including technology, finance, healthcare, marketing, sales, and more. Our AI can adapt to specific industry requirements and company cultures."
    },
    {
      question: "Can I practice for specific companies?",
      answer: "Yes! Our platform includes company-specific interview preparation modules for major tech companies, consulting firms, and other organizations. We regularly update our question banks based on real interview experiences."
    }
  ];



  return (
    <div className="animate-fade-in">
      <Container>
        {/* Hero Section */}
        <div className="my-12 animate-slide-up">
          <Headings
            title="Get in Touch"
            description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
          />
        </div>

        <div className=" gap-12 mb-16">

          {/* Contact Information */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="gradient-card hover-lift animate-slide-up h-full">
                  <CardContent className="p-6 h-full flex flex-col justify-center">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col items-start pl-5">
                        <CardTitle className="text-lg font-bold text-foreground mb-2">
                          {info.title}
                        </CardTitle>  
                        <CardDescription className="text-muted-foreground mb-2">
                          {info.description}
                        </CardDescription>
                        <div className="text-foreground font-medium">{info.primary}</div>
                        <div className="text-sm text-muted-foreground">{info.secondary}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq) => (
              <Card key={faq.question} className="gradient-card hover-lift animate-slide-up  h-full">
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-bold text-foreground mb-3">
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map/Office Section */}
        <div className="gradient-card p-8 rounded-2xl animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-muted-foreground">
              Come say hello at our office HQ.
            </p>
          </div>
          
          <div className="bg-muted rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Interactive Map</p>
              <p className="text-sm text-muted-foreground">
                123 AI Street, Tech City, San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
