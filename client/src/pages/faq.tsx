import { Layout } from "@/components/layout/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Calculator, 
  Gauge, 
  ShieldAlert, 
  Settings,
  DollarSign,
  Zap,
  Leaf,
  TrendingUp
} from "lucide-react";

interface FAQCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  questions: {
    question: string;
    answer: string;
    tags?: string[];
  }[];
}

export default function FAQ() {
  const faqCategories: FAQCategory[] = [
    {
      name: "General CO₂ Questions",
      icon: <HelpCircle className="h-6 w-6" />,
      color: "from-blue-400 to-blue-600",
      questions: [
        {
          question: "Why do plants need CO₂ supplementation?",
          answer: "Plants use CO₂ for photosynthesis. While ambient air contains about 400 ppm CO₂, plants can utilize much higher levels (up to 1500 ppm) when other conditions are optimal. This increased CO₂ availability can boost growth rates by 20-30% and significantly improve yields.",
          tags: ["basics", "benefits"]
        },
        {
          question: "Is CO₂ supplementation worth the investment?",
          answer: "For serious growers, yes. Studies show yield increases of 20-30% with proper CO₂ supplementation. The return on investment typically occurs within 2-3 harvest cycles. However, CO₂ only benefits plants when temperature, humidity, nutrients, and especially light levels are already optimized.",
          tags: ["roi", "yield"]
        },
        {
          question: "Can I use CO₂ with any growing method?",
          answer: "CO₂ supplementation works with all growing methods (soil, hydro, aeroponics). However, it's most effective in controlled environments where you can maintain consistent levels. Sealed grow rooms or greenhouses with climate control systems see the best results.",
          tags: ["methods", "compatibility"]
        }
      ]
    },
    {
      name: "Calculator & Measurements",
      icon: <Calculator className="h-6 w-6" />,
      color: "from-green-400 to-green-600",
      questions: [
        {
          question: "How accurate is the CO₂ calculator?",
          answer: "Our calculator uses industry-standard formulas based on room volume and target PPM levels. The calculations account for typical air exchange rates and CO₂ absorption. Real-world usage may vary by ±10-15% depending on plant density, growth stage, and actual air exchange rates.",
          tags: ["accuracy", "calculator"]
        },
        {
          question: "Why does ventilation type affect CO₂ requirements?",
          answer: "Sealed rooms retain CO₂ better, requiring less supplementation. Rooms with active exhaust lose CO₂ continuously, requiring 2-3x more to maintain target levels. The calculator doubles the requirement for exhausting systems to account for this loss.",
          tags: ["ventilation", "efficiency"]
        },
        {
          question: "What's the difference between g/hr and L/min?",
          answer: "Grams per hour (g/hr) measures CO₂ by weight, while liters per minute (L/min) measures by volume. At standard conditions, 1g of CO₂ ≈ 0.51L. Some regulators display flow in g/hr, others in L/min. Our calculator shows both for convenience.",
          tags: ["units", "conversion"]
        }
      ]
    },
    {
      name: "Equipment & Setup",
      icon: <Settings className="h-6 w-6" />,
      color: "from-purple-400 to-purple-600",
      questions: [
        {
          question: "What equipment do I need for CO₂ supplementation?",
          answer: "Essential equipment includes: 1) CO₂ cylinder (6kg, 10kg, or 20kg), 2) Pressure regulator with solenoid valve, 3) Timer or controller, 4) Distribution tubing, 5) CO₂ monitor. Optional but recommended: pH controller for automated systems, check valve to prevent backflow.",
          tags: ["equipment", "setup"]
        },
        {
          question: "How do I set my regulator flow rate?",
          answer: "Use the calculator's flow rate result (in g/hr or L/min) as your starting point. Begin at 80% of calculated rate and adjust based on actual CO₂ readings. Fine-tune over several days, as plant uptake varies with growth stage and environmental conditions.",
          tags: ["regulator", "calibration"]
        },
        {
          question: "Should I use a controller or timer?",
          answer: "Controllers maintain precise CO₂ levels by turning supplementation on/off based on actual readings - ideal for efficiency and safety. Timers are simpler and cheaper but may over or under-supplement. For rooms over 100 sq ft, controllers are strongly recommended.",
          tags: ["automation", "control"]
        }
      ]
    },
    {
      name: "Safety Concerns",
      icon: <ShieldAlert className="h-6 w-6" />,
      color: "from-red-400 to-red-600",
      questions: [
        {
          question: "Is CO₂ supplementation safe?",
          answer: "When properly managed, yes. CO₂ becomes concerning above 5000 ppm and dangerous above 40,000 ppm. Growing levels (800-1500 ppm) are safe for short exposures. Always use monitors, ensure adequate ventilation, and never sleep in CO₂-enriched rooms.",
          tags: ["safety", "health"]
        },
        {
          question: "What safety equipment is essential?",
          answer: "Mandatory: CO₂ monitor with alarm (set at 5000 ppm), adequate ventilation system, warning signs at entry points. Recommended: Emergency exhaust fan, automatic shut-off at dangerous levels, leak detection system for cylinder connections.",
          tags: ["safety", "equipment"]
        },
        {
          question: "Can CO₂ leak from cylinders?",
          answer: "Properly maintained equipment rarely leaks. Check connections monthly with soapy water (bubbles indicate leaks). Always close cylinder valves when not in use. Store cylinders upright in ventilated areas. Replace worn washers and fittings immediately.",
          tags: ["maintenance", "leaks"]
        }
      ]
    },
    {
      name: "Optimization & Efficiency",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-orange-400 to-orange-600",
      questions: [
        {
          question: "When should I run CO₂ supplementation?",
          answer: "Only during lights-on periods - plants don't use CO₂ in darkness. Start 30 minutes after lights-on and stop 30 minutes before lights-off. This saves CO₂ and prevents unnecessary accumulation. Never run CO₂ 24/7.",
          tags: ["timing", "efficiency"]
        },
        {
          question: "What's the optimal CO₂ level for different growth stages?",
          answer: "Seedlings: 400-600 ppm (ambient), Vegetative: 800-1000 ppm, Flowering: 1200-1500 ppm, Late flowering: 1000-1200 ppm. Higher levels require proportionally higher light intensity, temperature, and nutrient availability to be effective.",
          tags: ["optimization", "stages"]
        },
        {
          question: "How can I reduce CO₂ waste?",
          answer: "1) Seal your grow room to minimize leaks, 2) Use a controller instead of timer, 3) Distribute CO₂ above plants (it sinks), 4) Ensure proper air circulation, 5) Match CO₂ levels to light intensity, 6) Reduce levels during late flowering.",
          tags: ["efficiency", "cost"]
        }
      ]
    },
    {
      name: "Costs & Refills",
      icon: <DollarSign className="h-6 w-6" />,
      color: "from-yellow-400 to-yellow-600",
      questions: [
        {
          question: "How much does CO₂ supplementation cost?",
          answer: "Initial setup: £200-500 for basic system, £500-1000 for automated. Running costs: £20-40/month for refills (varies by room size and runtime). Most growers report the increased yield value far exceeds the operating costs.",
          tags: ["cost", "budget"]
        },
        {
          question: "How often will I need cylinder refills?",
          answer: "Depends on room size, runtime, and cylinder size. Our calculator estimates cylinder duration. Typical example: 10kg cylinder in 4x4m room running 12hrs/day lasts 4-6 weeks. Larger cylinders offer better value per kg of CO₂.",
          tags: ["refills", "planning"]
        },
        {
          question: "Where can I refill CO₂ cylinders?",
          answer: "Hydroponics shops, welding suppliers, beverage gas suppliers, and some brewing shops offer refills. Prices range from £15-25 for 6kg to £30-40 for 20kg. Some suppliers offer cylinder exchange programs for convenience.",
          tags: ["suppliers", "refills"]
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="neu-floating rounded-3xl p-10 mb-12 text-center bg-gradient-to-br from-neu-light via-neu-medium-light to-neu-light">
          <div className="inline-flex neu-raised rounded-full p-6 mb-6">
            <HelpCircle className="h-12 w-12 text-neu-dark" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold neu-heading-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-xl neu-text-secondary max-w-3xl mx-auto">
            Everything you need to know about CO₂ supplementation for hydroponics
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="neu-card p-6 text-center">
            <div className="neu-raised rounded-2xl p-3 inline-flex mb-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-neu-dark">20-30%</div>
            <div className="text-sm text-neu-medium">Yield Increase</div>
          </Card>
          
          <Card className="neu-card p-6 text-center">
            <div className="neu-raised rounded-2xl p-3 inline-flex mb-3">
              <Gauge className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-neu-dark">1200 ppm</div>
            <div className="text-sm text-neu-medium">Optimal Level</div>
          </Card>
          
          <Card className="neu-card p-6 text-center">
            <div className="neu-raised rounded-2xl p-3 inline-flex mb-3">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-neu-dark">2-3 cycles</div>
            <div className="text-sm text-neu-medium">ROI Period</div>
          </Card>
          
          <Card className="neu-card p-6 text-center">
            <div className="neu-raised rounded-2xl p-3 inline-flex mb-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-neu-dark">£20-40</div>
            <div className="text-sm text-neu-medium">Monthly Cost</div>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category) => (
            <Card key={category.name} className="neu-card p-8">
              <div className="flex items-center mb-6">
                <div className={`neu-raised rounded-2xl p-3 mr-4 bg-gradient-to-br ${category.color} text-white`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold neu-heading-primary">{category.name}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${category.name}-${index}`}
                    className="neu-inset rounded-2xl px-6 data-[state=open]:neu-raised"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-neu-darkest">{item.question}</h3>
                        {item.tags && (
                          <div className="flex gap-2 mt-2">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-neu-medium-dark leading-relaxed">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="neu-card p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold neu-heading-primary mb-4">Still Have Questions?</h2>
          <p className="text-neu-medium-dark mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our growing experts are here to help with your specific CO₂ supplementation needs.
          </p>
          <a 
            href="mailto:support@co2forplants.co.uk" 
            className="neu-button inline-flex items-center px-8 py-4 rounded-2xl font-medium text-neu-darkest hover:scale-105 transition-transform"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Contact Support
          </a>
        </Card>
      </div>
    </Layout>
  );
}