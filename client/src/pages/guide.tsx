import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sprout, 
  Flower2, 
  TreePine, 
  Leaf,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Timer,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface GrowthStage {
  name: string;
  icon: React.ReactNode;
  co2Level: string;
  duration: string;
  tips: string[];
}

export default function Guide() {
  const growthStages: GrowthStage[] = [
    {
      name: "Seedling",
      icon: <Sprout className="h-8 w-8" />,
      co2Level: "400-600 ppm",
      duration: "1-3 weeks",
      tips: [
        "Keep CO₂ near ambient levels",
        "Focus on root development",
        "Maintain high humidity (65-70%)",
        "Low light intensity recommended"
      ]
    },
    {
      name: "Vegetative",
      icon: <Leaf className="h-8 w-8" />,
      co2Level: "800-1000 ppm",
      duration: "3-8 weeks",
      tips: [
        "Increase CO₂ gradually",
        "Optimal temperature: 24-28°C",
        "Higher light intensity needed",
        "Monitor pH levels closely"
      ]
    },
    {
      name: "Flowering",
      icon: <Flower2 className="h-8 w-8" />,
      co2Level: "1200-1500 ppm",
      duration: "6-12 weeks",
      tips: [
        "Maximum CO₂ enrichment",
        "Lower humidity to 40-50%",
        "Temperature: 20-26°C",
        "Critical for yield optimization"
      ]
    },
    {
      name: "Harvest",
      icon: <TreePine className="h-8 w-8" />,
      co2Level: "Ambient",
      duration: "1-2 weeks",
      tips: [
        "Reduce CO₂ to ambient",
        "Focus on ripening",
        "Monitor trichomes",
        "Prepare for drying/curing"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="neu-floating rounded-3xl p-10 mb-12 text-center bg-gradient-to-br from-neu-light via-neu-medium-light to-neu-light">
          <h1 className="text-4xl lg:text-5xl font-bold neu-heading-primary mb-4">CO₂ Growing Guide</h1>
          <p className="text-xl neu-text-secondary max-w-3xl mx-auto">
            Master the art of CO₂ supplementation through every stage of plant growth
          </p>
        </div>

        {/* Growth Stages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-neu-dark" />
            </div>
            Growth Stage Optimization
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthStages.map((stage, index) => (
              <div key={stage.name} className="relative">
                <Card className="neu-card p-6 h-full hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="neu-raised rounded-2xl p-3 bg-gradient-olive text-neu-light">
                      {stage.icon}
                    </div>
                    <span className="text-3xl font-bold text-neu-medium">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold neu-heading-primary mb-2">{stage.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="font-medium text-neu-dark">CO₂:</span> 
                      <span className="text-neu-medium-dark ml-1">{stage.co2Level}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-neu-dark">Duration:</span> 
                      <span className="text-neu-medium-dark ml-1">{stage.duration}</span>
                    </p>
                  </div>
                  
                  <ul className="space-y-2">
                    {stage.tips.map((tip, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle2 className="h-4 w-4 text-neu-medium mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-neu-medium-dark">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                
                {index < growthStages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-neu-medium" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Environmental Factors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <Thermometer className="h-6 w-6 text-neu-dark" />
            </div>
            Environmental Optimization
          </h2>

          <Tabs defaultValue="temperature" className="w-full">
            <TabsList className="grid w-full grid-cols-4 neu-raised rounded-2xl p-1">
              <TabsTrigger value="temperature" className="data-[state=active]:neu-pressed">Temperature</TabsTrigger>
              <TabsTrigger value="humidity" className="data-[state=active]:neu-pressed">Humidity</TabsTrigger>
              <TabsTrigger value="light" className="data-[state=active]:neu-pressed">Light</TabsTrigger>
              <TabsTrigger value="airflow" className="data-[state=active]:neu-pressed">Airflow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="temperature" className="mt-6">
              <Card className="neu-card p-8">
                <div className="flex items-start space-x-4">
                  <div className="neu-raised rounded-2xl p-4 bg-gradient-to-br from-orange-400 to-red-500">
                    <Thermometer className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold neu-heading-primary mb-4">Temperature Management</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">Optimal Ranges</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">Seedling:</span>
                            <span className="font-medium">22-25°C</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">Vegetative:</span>
                            <span className="font-medium">24-28°C</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">Flowering:</span>
                            <span className="font-medium">20-26°C</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">CO₂ & Temperature</h4>
                        <p className="text-sm text-neu-medium-dark mb-3">
                          Higher CO₂ levels allow plants to tolerate higher temperatures. For every 300ppm increase, 
                          you can raise temperature by 2-3°C.
                        </p>
                        <div className="neu-inset rounded-xl p-3">
                          <p className="text-sm font-medium text-neu-dark">
                            💡 Pro Tip: Never exceed 30°C even with CO₂ enrichment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="humidity" className="mt-6">
              <Card className="neu-card p-8">
                <div className="flex items-start space-x-4">
                  <div className="neu-raised rounded-2xl p-4 bg-gradient-to-br from-blue-400 to-cyan-500">
                    <Droplets className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold neu-heading-primary mb-4">Humidity Control</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">Stage-Specific RH</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">Seedling:</span>
                            <span className="font-medium">65-70%</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">Vegetative:</span>
                            <span className="font-medium">50-60%</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">Flowering:</span>
                            <span className="font-medium">40-50%</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">VPD Optimization</h4>
                        <p className="text-sm text-neu-medium-dark mb-3">
                          Vapor Pressure Deficit (VPD) is crucial when using CO₂. Maintain VPD between 
                          0.8-1.2 kPa for optimal transpiration.
                        </p>
                        <div className="neu-inset rounded-xl p-3">
                          <p className="text-sm font-medium text-neu-dark">
                            ⚠️ High CO₂ + High RH = Increased disease risk
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="light" className="mt-6">
              <Card className="neu-card p-8">
                <div className="flex items-start space-x-4">
                  <div className="neu-raised rounded-2xl p-4 bg-gradient-to-br from-yellow-400 to-orange-500">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold neu-heading-primary mb-4">Light Intensity</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">PPFD Requirements</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">No CO₂:</span>
                            <span className="font-medium">600-800 μmol/m²/s</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">1000ppm:</span>
                            <span className="font-medium">800-1000 μmol/m²/s</span>
                          </li>
                          <li className="flex items-center">
                            <span className="w-24 text-sm text-neu-medium">1500ppm:</span>
                            <span className="font-medium">1000-1500 μmol/m²/s</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">Light & CO₂ Synergy</h4>
                        <p className="text-sm text-neu-medium-dark mb-3">
                          CO₂ enrichment only benefits plants under high light. Increase light intensity 
                          proportionally with CO₂ levels for maximum effect.
                        </p>
                        <div className="neu-inset rounded-xl p-3">
                          <p className="text-sm font-medium text-neu-dark">
                            🌟 Rule: 50% more light = 50% more CO₂ capacity
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="airflow" className="mt-6">
              <Card className="neu-card p-8">
                <div className="flex items-start space-x-4">
                  <div className="neu-raised rounded-2xl p-4 bg-gradient-to-br from-teal-400 to-green-500">
                    <Wind className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold neu-heading-primary mb-4">Air Circulation</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">Circulation Goals</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-neu-medium mr-2 mt-0.5" />
                            <span>Gentle leaf movement throughout canopy</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-neu-medium mr-2 mt-0.5" />
                            <span>No dead air pockets</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-neu-medium mr-2 mt-0.5" />
                            <span>Even CO₂ distribution</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-neu-medium mr-2 mt-0.5" />
                            <span>Temperature uniformity</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-neu-dark mb-2">CO₂ Distribution</h4>
                        <p className="text-sm text-neu-medium-dark mb-3">
                          CO₂ is heavier than air. Use oscillating fans to prevent stratification 
                          and ensure even distribution throughout the canopy.
                        </p>
                        <div className="neu-inset rounded-xl p-3">
                          <p className="text-sm font-medium text-neu-dark">
                            💨 Position fans to create circular airflow pattern
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <CheckCircle2 className="h-6 w-6 text-neu-dark" />
            </div>
            CO₂ Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="neu-card p-6">
              <h3 className="text-xl font-semibold neu-heading-primary mb-4 flex items-center">
                <Timer className="h-5 w-5 mr-2 text-neu-medium-dark" />
                Timing & Scheduling
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-neu-dark">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-neu-dark">Only during lights-on</p>
                    <p className="text-sm text-neu-medium">Plants don't use CO₂ in darkness</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-neu-dark">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-neu-dark">Start 30 min after lights</p>
                    <p className="text-sm text-neu-medium">Allow plants to warm up first</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-neu-dark">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-neu-dark">Stop 30 min before lights-off</p>
                    <p className="text-sm text-neu-medium">Conserve CO₂ and ensure safety</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="neu-card p-6">
              <h3 className="text-xl font-semibold neu-heading-primary mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-neu-medium-dark" />
                Common Mistakes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5 bg-red-100">
                    <span className="text-xs font-bold text-red-600">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-neu-dark">Over-enrichment</p>
                    <p className="text-sm text-neu-medium">More isn't always better - stick to recommendations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5 bg-red-100">
                    <span className="text-xs font-bold text-red-600">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-neu-dark">Poor ventilation</p>
                    <p className="text-sm text-neu-medium">CO₂ needs proper circulation to be effective</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5 bg-red-100">
                    <span className="text-xs font-bold text-red-600">✗</span>
                  </div>
                  <div>
                    <p className="font-medium text-neu-dark">Ignoring other factors</p>
                    <p className="text-sm text-neu-medium">Temperature, humidity, and nutrients must be optimal</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
}