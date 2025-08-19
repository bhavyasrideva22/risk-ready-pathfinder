import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Shield, 
  FileSearch, 
  BarChart3, 
  CheckCircle,
  Clock,
  Users,
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-assessment.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Psychometric Evaluation",
      description: "Assess your personality fit and motivation for risk & audit careers"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Technical Aptitude",
      description: "Test analytical skills, numerical reasoning, and domain knowledge"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Personalized Results",
      description: "Get detailed career recommendations and skill development plans"
    }
  ];

  const careers = [
    "Risk Analyst",
    "Internal Auditor", 
    "Compliance Analyst",
    "Operational Risk Associate",
    "Financial Auditor",
    "Cyber Risk Analyst"
  ];

  const stats = [
    { icon: <Clock className="w-5 h-5" />, label: "Assessment Time", value: "25-30 min" },
    { icon: <Users className="w-5 h-5" />, label: "Question Categories", value: "3 Sections" },
    { icon: <CheckCircle className="w-5 h-5" />, label: "Accuracy Rate", value: "92%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Risk and Audit Assessment" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Professional Career Assessment
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Are You Ready to Become a 
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                {" "}Risk & Audit Analyst?
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your fit for a career in risk management and internal auditing with our comprehensive, 
              scientifically-designed assessment. Get personalized insights and development recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate('/assessment')}
                className="min-w-64"
              >
                <Shield className="w-5 h-5 mr-2" />
                Start Assessment
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  {stat.icon}
                  <span>{stat.label}: <strong>{stat.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Comprehensive Career Assessment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our assessment evaluates multiple dimensions to provide you with accurate, 
              actionable insights about your risk & audit career potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Career Opportunities
            </h2>
            <p className="text-lg text-muted-foreground">
              This assessment helps determine your fit for these high-demand career paths
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {careers.map((career, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium">{career}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto shadow-elegant">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Ready to Discover Your Career Potential?
              </h3>
              <p className="text-muted-foreground mb-6">
                Take our comprehensive assessment and get personalized insights 
                into your readiness for a career in risk and audit analysis.
              </p>
              <Button 
                variant="assessment" 
                size="xl"
                onClick={() => navigate('/assessment')}
                className="min-w-48"
              >
                Begin Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
