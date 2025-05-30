import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  Users, 
  Target, 
  Heart,
  Leaf,
  Award,
  TrendingUp,
  Sparkles,
  Globe,
  Mail,
  CheckCircle
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: React.ReactNode;
}

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function About() {
  const values: Value[] = [
    {
      title: "Accuracy First",
      description: "Our calculations are based on scientific research and real-world testing to ensure reliable results.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Grower Focused",
      description: "Built by growers for growers, we understand the challenges and needs of modern cultivation.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Safety Priority",
      description: "We emphasize safety in all our recommendations and provide comprehensive guidelines.",
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: "Continuous Innovation",
      description: "We constantly update our tools based on the latest research and user feedback.",
      icon: <Sparkles className="h-6 w-6" />
    }
  ];

  const features = [
    "Professional-grade CO₂ calculations",
    "Safety-first approach to supplementation",
    "Mobile-responsive design",
    "Export functionality for record keeping",
    "Comprehensive growing guides",
    "Regular updates based on user feedback"
  ];

  const milestones = [
    { year: "2023", event: "Project conception and initial research" },
    { year: "2024", event: "Calculator development and testing" },
    { year: "2025", event: "Public launch and community building" },
    { year: "Future", event: "Advanced features and mobile apps" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="neu-floating rounded-3xl p-10 mb-12 bg-gradient-to-br from-neu-light via-neu-medium-light to-neu-light">
          <div className="text-center">
            <div className="inline-flex neu-raised rounded-full p-6 mb-6">
              <Info className="h-12 w-12 text-neu-dark" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold neu-heading-primary mb-4">About CO₂ Flow Estimator</h1>
            <p className="text-xl neu-text-secondary max-w-3xl mx-auto">
              Empowering growers with precision tools for optimal CO₂ supplementation
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="neu-card p-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex neu-raised rounded-2xl p-4 mb-6 bg-gradient-olive text-white">
                <Leaf className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold neu-heading-primary mb-6">Our Mission</h2>
              <p className="text-lg text-neu-medium-dark leading-relaxed mb-6">
                We believe every grower deserves access to professional-grade tools that help maximize yields 
                while maintaining safety. Our CO₂ Flow Estimator bridges the gap between complex scientific 
                calculations and practical, everyday growing needs.
              </p>
              <p className="text-lg text-neu-medium-dark leading-relaxed">
                By providing accurate, easy-to-use calculators and comprehensive educational resources, 
                we're helping cultivators worldwide optimize their CO₂ supplementation strategies for 
                better harvests and more sustainable growing practices.
              </p>
            </div>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="neu-card p-6 hover:scale-105 transition-transform">
                <div className="neu-raised rounded-2xl p-3 inline-flex mb-4 bg-gradient-sage text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold neu-heading-primary mb-2">{value.title}</h3>
                <p className="text-neu-medium-dark">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold neu-heading-secondary mb-6 flex items-center">
                <div className="neu-raised rounded-2xl p-3 mr-4">
                  <Award className="h-6 w-6 text-neu-dark" />
                </div>
                Why Choose Our Calculator?
              </h2>
              <p className="text-lg text-neu-medium-dark mb-6">
                Our calculator isn't just another online tool - it's a comprehensive solution designed 
                with real growers' needs in mind. Every feature has been carefully crafted based on 
                extensive research and user feedback.
              </p>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-neu-medium-dark">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <Card className="neu-card p-8 bg-gradient-to-br from-neu-light to-neu-medium-light">
                <div className="text-center">
                  <div className="text-5xl font-bold text-neu-dark mb-2">10,000+</div>
                  <p className="text-lg text-neu-medium-dark">Calculations Performed</p>
                </div>
              </Card>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="neu-card p-6 text-center">
                  <div className="text-3xl font-bold text-neu-dark mb-1">98%</div>
                  <p className="text-sm text-neu-medium">Accuracy Rate</p>
                </Card>
                <Card className="neu-card p-6 text-center">
                  <div className="text-3xl font-bold text-neu-dark mb-1">24/7</div>
                  <p className="text-sm text-neu-medium">Available</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="neu-raised rounded-full p-4 mr-6 bg-gradient-earth text-white flex-shrink-0">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="neu-card p-6">
                    <h3 className="text-xl font-semibold text-neu-darkest mb-2">{milestone.year}</h3>
                    <p className="text-neu-medium-dark">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Reach */}
        <section className="mb-16">
          <Card className="neu-card p-10 text-center">
            <div className="inline-flex neu-raised rounded-full p-4 mb-6 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
              <Globe className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold neu-heading-primary mb-6">Global Impact</h2>
            <p className="text-lg text-neu-medium-dark max-w-3xl mx-auto mb-8">
              Our tools are used by growers in over 50 countries, from small hobbyists to commercial operations. 
              We're proud to support sustainable cultivation practices worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-neu-dark">50+</div>
                <p className="text-sm text-neu-medium">Countries</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-neu-dark">5</div>
                <p className="text-sm text-neu-medium">Languages</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-neu-dark">∞</div>
                <p className="text-sm text-neu-medium">Possibilities</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact CTA */}
        <section>
          <Card className="neu-card p-10 text-center bg-gradient-to-br from-neu-light via-neu-medium-light to-neu-light">
            <h2 className="text-3xl font-bold neu-heading-primary mb-4">Join Our Growing Community</h2>
            <p className="text-lg text-neu-medium-dark mb-8 max-w-2xl mx-auto">
              Whether you're a seasoned professional or just starting your growing journey, 
              we're here to help you succeed with CO₂ supplementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@co2forplants.co.uk" 
                className="neu-button inline-flex items-center px-8 py-4 rounded-2xl font-medium text-neu-darkest hover:scale-105 transition-transform"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
              <a 
                href="/guide" 
                className="neu-button inline-flex items-center px-8 py-4 rounded-2xl font-medium text-neu-darkest hover:scale-105 transition-transform"
              >
                <Leaf className="mr-2 h-5 w-5" />
                Start Growing
              </a>
            </div>
          </Card>
        </section>
      </div>
    </Layout>
  );
}