import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  AlertTriangle, 
  Heart,
  Brain,
  Wind,
  Gauge,
  Phone,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  AlertOctagon,
  Info
} from "lucide-react";

interface SafetyLevel {
  ppm: string;
  level: string;
  effects: string[];
  color: string;
  severity: "safe" | "caution" | "warning" | "danger";
}

export default function Safety() {
  const safetyLevels: SafetyLevel[] = [
    {
      ppm: "400-600",
      level: "Normal Air",
      effects: ["Typical outdoor levels", "No health effects", "Safe for all activities"],
      color: "bg-green-500",
      severity: "safe"
    },
    {
      ppm: "600-1000",
      level: "Good Indoor Air",
      effects: ["Acceptable indoor air quality", "No significant health effects", "Some sensitive individuals may notice stuffiness"],
      color: "bg-green-400",
      severity: "safe"
    },
    {
      ppm: "1000-2000",
      level: "Stuffiness",
      effects: ["Complaints of drowsiness", "Reduced attention span", "Increased heart rate"],
      color: "bg-yellow-500",
      severity: "caution"
    },
    {
      ppm: "2000-5000",
      level: "Poor Air Quality",
      effects: ["Headaches", "Sleepiness", "Stagnant, stuffy air", "Increased respiratory rate"],
      color: "bg-orange-500",
      severity: "warning"
    },
    {
      ppm: "5000+",
      level: "Dangerous",
      effects: ["Workplace exposure limit", "Nausea and dizziness", "Oxygen deprivation symptoms", "Immediate ventilation required"],
      color: "bg-red-600",
      severity: "danger"
    },
    {
      ppm: "40000+",
      level: "Life Threatening",
      effects: ["Immediately dangerous", "Loss of consciousness", "Convulsions", "Death possible"],
      color: "bg-red-900",
      severity: "danger"
    }
  ];

  const emergencySteps = [
    "Immediately evacuate the area",
    "Move to fresh air",
    "Call emergency services if symptoms persist",
    "Do not re-enter until CO₂ levels are confirmed safe",
    "Seek medical attention for any persistent symptoms"
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="neu-floating rounded-3xl p-10 mb-12 bg-gradient-to-br from-red-50 via-neu-light to-neu-light">
          <div className="text-center">
            <div className="inline-flex neu-raised rounded-full p-6 mb-6">
              <ShieldAlert className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold neu-heading-primary mb-4">CO₂ Safety Guidelines</h1>
            <p className="text-xl neu-text-secondary max-w-3xl mx-auto">
              Understanding and preventing CO₂ exposure risks in your growing environment
            </p>
          </div>
        </div>

        {/* Critical Safety Alert */}
        <Alert className="mb-12 neu-raised border-2 border-red-500 bg-gradient-to-r from-red-50 to-neu-light">
          <AlertOctagon className="h-6 w-6 text-red-600" />
          <AlertDescription className="text-lg">
            <strong className="text-red-600">Critical Safety Warning:</strong> CO₂ is colorless, odorless, and heavier than air. 
            It can accumulate in low areas and enclosed spaces. Always use proper monitoring and ventilation systems.
          </AlertDescription>
        </Alert>

        {/* CO₂ Levels Chart */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <Gauge className="h-6 w-6 text-neu-dark" />
            </div>
            CO₂ Concentration Levels & Effects
          </h2>

          <div className="space-y-4">
            {safetyLevels.map((level) => (
              <Card key={level.ppm} className={`neu-card p-6 ${
                level.severity === "danger" ? "border-2 border-red-500" : ""
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-2xl ${level.color} flex items-center justify-center text-white font-bold neu-raised`}>
                    {level.severity === "safe" && <CheckCircle className="h-8 w-8" />}
                    {level.severity === "caution" && <Info className="h-8 w-8" />}
                    {level.severity === "warning" && <AlertTriangle className="h-8 w-8" />}
                    {level.severity === "danger" && <XCircle className="h-8 w-8" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{level.level}</h3>
                      <Badge className={`${level.color} text-white`}>{level.ppm} ppm</Badge>
                    </div>
                    
                    <ul className="space-y-1">
                      {level.effects.map((effect, i) => (
                        <li key={i} className="flex items-center text-neu-medium-dark">
                          <span className="w-2 h-2 bg-neu-medium rounded-full mr-2"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Symptoms & First Aid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <Heart className="h-6 w-6 text-neu-dark" />
            </div>
            Symptoms & First Aid
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="neu-card p-8">
              <h3 className="text-2xl font-semibold neu-heading-primary mb-6 flex items-center">
                <Activity className="h-6 w-6 mr-3 text-red-500" />
                Exposure Symptoms
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neu-dark mb-2">Mild Exposure (1000-2000 ppm)</h4>
                  <ul className="space-y-1 text-sm text-neu-medium-dark">
                    <li className="flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Drowsiness and fatigue
                    </li>
                    <li className="flex items-center">
                      <Wind className="h-4 w-4 mr-2" />
                      Stuffy feeling
                    </li>
                    <li className="flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Difficulty concentrating
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-neu-dark mb-2">Moderate Exposure (2000-5000 ppm)</h4>
                  <ul className="space-y-1 text-sm text-neu-medium-dark">
                    <li className="flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Headaches
                    </li>
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Increased heart rate
                    </li>
                    <li className="flex items-center">
                      <Wind className="h-4 w-4 mr-2" />
                      Shortness of breath
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Nausea
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-neu-dark mb-2">Severe Exposure (5000+ ppm)</h4>
                  <ul className="space-y-1 text-sm text-neu-medium-dark">
                    <li className="flex items-center">
                      <AlertOctagon className="h-4 w-4 mr-2 text-red-500" />
                      Rapid breathing
                    </li>
                    <li className="flex items-center">
                      <AlertOctagon className="h-4 w-4 mr-2 text-red-500" />
                      Confusion
                    </li>
                    <li className="flex items-center">
                      <AlertOctagon className="h-4 w-4 mr-2 text-red-500" />
                      Loss of consciousness
                    </li>
                    <li className="flex items-center">
                      <AlertOctagon className="h-4 w-4 mr-2 text-red-500" />
                      Convulsions
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="neu-card p-8">
              <h3 className="text-2xl font-semibold neu-heading-primary mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-green-500" />
                Emergency Response
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-neu-dark mb-3">Immediate Actions</h4>
                  <ol className="space-y-2">
                    {emergencySteps.map((step, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-6 h-6 neu-raised rounded-full flex items-center justify-center mr-3 mt-0.5 bg-gradient-to-br from-green-400 to-green-600">
                          <span className="text-xs font-bold text-white">{i + 1}</span>
                        </div>
                        <span className="text-sm text-neu-medium-dark">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="neu-inset rounded-2xl p-4 bg-gradient-to-br from-red-50 to-neu-light">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold text-neu-darkest">Emergency Contact</p>
                      <p className="text-lg font-bold text-red-600">999 / 112</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Safety Equipment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <ShieldAlert className="h-6 w-6 text-neu-dark" />
            </div>
            Essential Safety Equipment
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="neu-card p-6">
              <div className="neu-raised rounded-2xl p-4 mb-4 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <Gauge className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold neu-heading-primary mb-2">CO₂ Monitor</h3>
              <p className="text-neu-medium-dark mb-4">
                Essential for continuous monitoring. Choose models with audible alarms at 5000 ppm.
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  NDIR sensor technology
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Data logging capability
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Battery backup
                </li>
              </ul>
            </Card>

            <Card className="neu-card p-6">
              <div className="neu-raised rounded-2xl p-4 mb-4 bg-gradient-to-br from-green-400 to-green-600 text-white">
                <Wind className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold neu-heading-primary mb-2">Ventilation System</h3>
              <p className="text-neu-medium-dark mb-4">
                Automated exhaust fans triggered by CO₂ levels ensure safety and efficiency.
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Controller integration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Emergency override
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Adequate CFM rating
                </li>
              </ul>
            </Card>

            <Card className="neu-card p-6">
              <div className="neu-raised rounded-2xl p-4 mb-4 bg-gradient-to-br from-red-400 to-red-600 text-white">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold neu-heading-primary mb-2">Safety Signage</h3>
              <p className="text-neu-medium-dark mb-4">
                Clear warnings at all entry points to CO₂ enriched areas are mandatory.
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  "CO₂ in use" signs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Emergency procedures
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Contact information
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-3xl font-bold neu-heading-secondary mb-8 flex items-center">
            <div className="neu-raised rounded-2xl p-3 mr-4">
              <CheckCircle className="h-6 w-6 text-neu-dark" />
            </div>
            Safety Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="neu-card p-6">
              <h3 className="text-xl font-semibold neu-heading-primary mb-4">Installation Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-neu-dark">Never place CO₂ outlets at ground level</p>
                    <p className="text-sm text-neu-medium">CO₂ sinks - keep outlets above plant canopy</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-neu-dark">Install monitors at breathing height</p>
                    <p className="text-sm text-neu-medium">Place at 4-5 feet for accurate readings</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-neu-dark">Ensure adequate ventilation</p>
                    <p className="text-sm text-neu-medium">Emergency exhaust capable of 1 air change/minute</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="neu-card p-6">
              <h3 className="text-xl font-semibold neu-heading-primary mb-4">Daily Safety Checks</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-neu-dark">Test CO₂ monitor alarms</p>
                    <p className="text-sm text-neu-medium">Verify audible and visual alerts function</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-neu-dark">Check cylinder connections</p>
                    <p className="text-sm text-neu-medium">Inspect for leaks with soapy water</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <div>
                    <p className="font-medium text-neu-dark">Verify ventilation operation</p>
                    <p className="text-sm text-neu-medium">Test emergency exhaust systems</p>
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