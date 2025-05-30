import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sprout, 
  Calculator, 
  Box, 
  Wind, 
  Clock, 
  Gauge, 
  BarChart3, 
  Settings, 
  Timer, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Info, 
  Mail,
  Download,
  TriangleAlert,
  AlertCircle,
  HelpCircle,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

interface CalculatorState {
  roomDimensions: {
    length: number;
    width: number;
    height: number;
  };
  settings: {
    targetCO2: number;
    ventilationType: 'sealed' | 'exhausting';
    cylinderType: '6kg' | '10kg' | '20kg';
  };
  schedule: {
    hoursPerDay: number;
    daysPerWeek: number;
  };
}

export default function Home() {
  const [state, setState] = useState<CalculatorState>({
    roomDimensions: { length: 4, width: 3, height: 2.5 },
    settings: { targetCO2: 1200, ventilationType: 'sealed', cylinderType: '10kg' },
    schedule: { hoursPerDay: 12, daysPerWeek: 7 }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLiterUnits, setShowLiterUnits] = useState(false);

  // Calculation functions
  const calculations = {
    roomVolume: () => {
      const { length, width, height } = state.roomDimensions;
      return length * width * height;
    },
    
    dailyCO2Grams: () => {
      const volume = calculations.roomVolume();
      const targetPPM = state.settings.targetCO2;
      const hoursPerDay = state.schedule.hoursPerDay;
      
      if (volume <= 0 || targetPPM <= 0 || hoursPerDay <= 0) return 0;
      
      // Corrected calculation: Volume (m³) × (Target PPM - 400 ambient) × 1.8 mg/m³/ppm
      // Converting from mg to grams: ÷ 1000
      const ambientCO2 = 400; // Typical outdoor CO2 level
      const enrichmentPPM = Math.max(0, targetPPM - ambientCO2);
      let co2Grams = (volume * enrichmentPPM * 1.8) / 1000;
      
      // Adjust for ventilation type
      if (state.settings.ventilationType === 'exhausting') {
        co2Grams *= 2.0; // Double for active exhaust due to air changes
      }
      
      // Adjust for hours of operation (assuming 24hr baseline)
      co2Grams = (co2Grams * hoursPerDay) / 24;
      
      return co2Grams;
    },
    
    dailyCO2Liters: () => {
      // 1 gram CO2 ≈ 0.51 liters at standard conditions
      return calculations.dailyCO2Grams() * 0.51;
    },
    
    weeklyCO2: () => {
      return calculations.dailyCO2Grams() * state.schedule.daysPerWeek;
    },
    
    monthlyCO2: () => {
      return calculations.weeklyCO2() * 4.33; // Average weeks per month
    },
    
    flowRateGramsPerHour: () => {
      const daily = calculations.dailyCO2Grams();
      return state.schedule.hoursPerDay > 0 ? daily / state.schedule.hoursPerDay : 0;
    },
    
    flowRateLintersPerMinute: () => {
      return (calculations.flowRateGramsPerHour() * 0.51) / 60;
    },
    
    cylinderDuration: (cylinderSize: string) => {
      const cylinderCapacities = { '6kg': 6000, '10kg': 10000, '20kg': 20000 };
      const weeklyUsage = calculations.weeklyCO2();
      return weeklyUsage > 0 ? cylinderCapacities[cylinderSize as keyof typeof cylinderCapacities] / weeklyUsage : 0;
    }
  };

  // Validation function
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    if (state.roomDimensions.length <= 0 || state.roomDimensions.length > 50) {
      newErrors.length = "Length must be between 0.1 and 50 meters";
    }
    if (state.roomDimensions.width <= 0 || state.roomDimensions.width > 50) {
      newErrors.width = "Width must be between 0.1 and 50 meters";
    }
    if (state.roomDimensions.height <= 0 || state.roomDimensions.height > 10) {
      newErrors.height = "Height must be between 0.1 and 10 meters";
    }
    if (state.schedule.hoursPerDay <= 0 || state.schedule.hoursPerDay > 24) {
      newErrors.hoursPerDay = "Hours per day must be between 1 and 24";
    }
    if (state.schedule.daysPerWeek <= 0 || state.schedule.daysPerWeek > 7) {
      newErrors.daysPerWeek = "Days per week must be between 1 and 7";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateInputs();
  }, [state]);

  const updateDimension = (dimension: keyof CalculatorState['roomDimensions'], value: string) => {
    const numValue = parseFloat(value) || 0;
    setState(prev => ({
      ...prev,
      roomDimensions: { ...prev.roomDimensions, [dimension]: numValue }
    }));
  };

  const updateSetting = <K extends keyof CalculatorState['settings']>(
    setting: K, 
    value: CalculatorState['settings'][K]
  ) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, [setting]: value }
    }));
  };

  const updateSchedule = (field: keyof CalculatorState['schedule'], value: string) => {
    const numValue = parseInt(value) || 0;
    setState(prev => ({
      ...prev,
      schedule: { ...prev.schedule, [field]: numValue }
    }));
  };

  const handleExport = () => {
    const results = {
      roomVolume: calculations.roomVolume().toFixed(1),
      dailyCO2Grams: Math.round(calculations.dailyCO2Grams()),
      dailyCO2Liters: calculations.dailyCO2Liters().toFixed(1),
      weeklyCO2: Math.round(calculations.weeklyCO2()),
      monthlyCO2: (calculations.monthlyCO2() / 1000).toFixed(2),
      flowRate: calculations.flowRateGramsPerHour().toFixed(1),
      flowRateML: calculations.flowRateLintersPerMinute().toFixed(1),
      bubblesPerSecond: (calculations.flowRateLintersPerMinute() * 0.55).toFixed(1),
      duration6kg: calculations.cylinderDuration('6kg').toFixed(1),
      duration10kg: calculations.cylinderDuration('10kg').toFixed(1),
      duration20kg: calculations.cylinderDuration('20kg').toFixed(1)
    };

    const exportData = `CO₂ Flow Estimator Results
Generated: ${new Date().toLocaleDateString()}

Room Specifications:
- Dimensions: ${state.roomDimensions.length}m × ${state.roomDimensions.width}m × ${state.roomDimensions.height}m
- Volume: ${results.roomVolume} m³
- Target CO₂: ${state.settings.targetCO2} ppm
- Ventilation: ${state.settings.ventilationType}
- Schedule: ${state.schedule.hoursPerDay}hrs/day, ${state.schedule.daysPerWeek} days/week

Calculated Requirements:
- Daily CO₂: ${results.dailyCO2Grams}g (${results.dailyCO2Liters}L)
- Weekly Usage: ${results.weeklyCO2}g
- Monthly Usage: ${results.monthlyCO2}kg
- Flow Rate: ${results.flowRate}g/hr (${results.flowRateML}L/min)

Cylinder Duration:
- 6kg Cylinder: ${results.duration6kg} weeks
- 10kg Cylinder: ${results.duration10kg} weeks
- 20kg Cylinder: ${results.duration20kg} weeks

Generated by co2forplants.co.uk`;

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `co2-calculator-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isHighPPM = state.settings.targetCO2 > 1500;
  const hasValidInputs = Object.keys(errors).length === 0 && calculations.roomVolume() > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Neumorphism Header */}
      <header className="neu-nav sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 neu-raised rounded-2xl flex items-center justify-center">
                <Sprout className="text-neu-dark text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neu-heading-primary">CO₂ Flow Estimator</h1>
                <p className="text-sm neu-text-secondary font-medium">co2forplants.co.uk</p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="neu-raised rounded-2xl p-1">
                <div className="flex space-x-1">
                  <button className="neu-nav-item px-6 py-3 text-sm font-medium neu-text-primary active">
                    Calculator
                  </button>
                  <button className="neu-nav-item px-6 py-3 text-sm font-medium neu-text-secondary">
                    Safety Guide
                  </button>
                  <button className="neu-nav-item px-6 py-3 text-sm font-medium neu-text-secondary">
                    Regulator Setup
                  </button>
                </div>
              </div>
              
              <Button onClick={handleExport} className="neu-button text-neu-darkest ml-4 px-6 py-3 rounded-2xl font-medium">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section with Neumorphism */}
        <div className="mb-12">
          <div className="neu-floating rounded-3xl p-10 mb-8 text-center">
            <h2 className="text-4xl font-bold neu-heading-primary mb-4">Calculate Your CO₂ Requirements</h2>
            <p className="text-xl neu-text-secondary leading-relaxed max-w-3xl mx-auto">
              Determine optimal CO₂ levels, flow rates, and cylinder requirements for your grow room with our professional calculator.
            </p>
          </div>
          
          {/* Safety Alert with Neumorphism */}
          <div className="neu-raised rounded-2xl p-6 border-l-4 border-neu-medium-dark">
            <div className="flex items-start space-x-4">
              <div className="neu-raised rounded-full p-3">
                <TriangleAlert className="h-6 w-6 text-neu-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-neu-darkest mb-2">Safety First</h3>
                <p className="neu-text-secondary">
                  Always use a CO₂ monitor and ensure proper ventilation. Levels above 1500 ppm can be dangerous.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="neu-card rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-8 flex items-center neu-heading-secondary">
                <div className="neu-raised rounded-2xl p-3 mr-4">
                  <Calculator className="text-neu-dark h-6 w-6" />
                </div>
                Room Parameters & Settings
              </h3>
              
              <div className="space-y-8">
                {/* Room Dimensions */}
                <div className="neu-inset rounded-2xl p-6">
                  <h4 className="font-medium text-neu-dark mb-6 flex items-center">
                    <div className="neu-raised rounded-xl p-2 mr-3">
                      <Box className="text-neu-medium-dark h-5 w-5" />
                    </div>
                    Room Dimensions
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="roomLength" className="text-sm font-medium neu-text-secondary mb-2 block">Length (m)</Label>
                      <Input
                        id="roomLength"
                        type="number"
                        placeholder="4.0"
                        step="0.1"
                        min="0.1"
                        max="50"
                        value={state.roomDimensions.length}
                        onChange={(e) => updateDimension('length', e.target.value)}
                        className={`neu-input ${errors.length ? "border-destructive" : ""}`}
                      />
                      {errors.length && <p className="text-xs text-destructive mt-1">{errors.length}</p>}
                    </div>
                    <div>
                      <Label htmlFor="roomWidth" className="text-sm font-medium neu-text-secondary mb-2 block">Width (m)</Label>
                      <Input
                        id="roomWidth"
                        type="number"
                        placeholder="3.0"
                        step="0.1"
                        min="0.1"
                        max="50"
                        value={state.roomDimensions.width}
                        onChange={(e) => updateDimension('width', e.target.value)}
                        className={`neu-input ${errors.width ? "border-destructive" : ""}`}
                      />
                      {errors.width && <p className="text-xs text-destructive mt-1">{errors.width}</p>}
                    </div>
                    <div>
                      <Label htmlFor="roomHeight" className="text-sm font-medium neu-text-secondary mb-2 block">Height (m)</Label>
                      <Input
                        id="roomHeight"
                        type="number"
                        placeholder="2.5"
                        step="0.1"
                        min="0.1"
                        max="10"
                        value={state.roomDimensions.height}
                        onChange={(e) => updateDimension('height', e.target.value)}
                        className={`neu-input ${errors.height ? "border-destructive" : ""}`}
                      />
                      {errors.height && <p className="text-xs text-destructive mt-1">{errors.height}</p>}
                    </div>
                  </div>
                </div>

                {/* CO2 Settings */}
                <div className="neu-inset rounded-2xl p-6">
                  <h4 className="font-medium text-neu-dark mb-6 flex items-center">
                    <div className="neu-raised rounded-xl p-2 mr-3">
                      <Wind className="text-neu-medium-dark h-5 w-5" />
                    </div>
                    CO₂ Configuration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm font-medium neu-text-secondary">Target CO₂ Level (ppm)</Label>
                        <div className="group relative">
                          <HelpCircle className="h-4 w-4 text-neu-medium cursor-help" />
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-neu-darkest text-neu-light text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-64">
                            Enrichment from ambient 400ppm. 800ppm for vegetative growth, 1200-1500ppm for flowering.
                          </div>
                        </div>
                      </div>
                      <Select value={state.settings.targetCO2.toString()} onValueChange={(value) => updateSetting('targetCO2', parseInt(value))}>
                        <SelectTrigger className="neu-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="800">800 ppm (Vegetative)</SelectItem>
                          <SelectItem value="1000">1000 ppm (Early Flower)</SelectItem>
                          <SelectItem value="1200">1200 ppm (Peak Flower)</SelectItem>
                          <SelectItem value="1500">1500 ppm (Maximum Safe)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium neu-text-secondary mb-2 block">Ventilation Type</Label>
                      <Select value={state.settings.ventilationType} onValueChange={(value: 'sealed' | 'exhausting') => updateSetting('ventilationType', value)}>
                        <SelectTrigger className="neu-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sealed">Sealed Room</SelectItem>
                          <SelectItem value="exhausting">Active Exhaust</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Usage Schedule */}
                <div className="neu-inset rounded-2xl p-6">
                  <h4 className="font-medium text-neu-dark mb-6 flex items-center">
                    <div className="neu-raised rounded-xl p-2 mr-3">
                      <Clock className="text-neu-medium-dark h-5 w-5" />
                    </div>
                    Usage Schedule
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hoursPerDay" className="text-sm font-medium neu-text-secondary mb-2 block">Hours per Day</Label>
                      <Input
                        id="hoursPerDay"
                        type="number"
                        placeholder="12"
                        min="1"
                        max="24"
                        value={state.schedule.hoursPerDay}
                        onChange={(e) => updateSchedule('hoursPerDay', e.target.value)}
                        className={`neu-input ${errors.hoursPerDay ? "border-destructive" : ""}`}
                      />
                      <p className="text-xs neu-text-muted mt-1">Typically matches light cycle</p>
                      {errors.hoursPerDay && <p className="text-xs text-destructive mt-1">{errors.hoursPerDay}</p>}
                    </div>
                    <div>
                      <Label htmlFor="daysPerWeek" className="text-sm font-medium neu-text-secondary mb-2 block">Days per Week</Label>
                      <Input
                        id="daysPerWeek"
                        type="number"
                        placeholder="7"
                        min="1"
                        max="7"
                        value={state.schedule.daysPerWeek}
                        onChange={(e) => updateSchedule('daysPerWeek', e.target.value)}
                        className={`neu-input ${errors.daysPerWeek ? "border-destructive" : ""}`}
                      />
                      <p className="text-xs neu-text-muted mt-1">Continuous operation recommended</p>
                      {errors.daysPerWeek && <p className="text-xs text-destructive mt-1">{errors.daysPerWeek}</p>}
                    </div>
                  </div>
                </div>

                {/* Cylinder Selection */}
                <div className="neu-inset rounded-2xl p-6">
                  <h4 className="font-medium text-neu-dark mb-6 flex items-center">
                    <div className="neu-raised rounded-xl p-2 mr-3">
                      <Gauge className="text-neu-medium-dark h-5 w-5" />
                    </div>
                    Cylinder Specification
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {['6kg', '10kg', '20kg'].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSetting('cylinderType', size as '6kg' | '10kg' | '20kg')}
                        className={`flex flex-col items-center p-4 rounded-xl transition-all cursor-pointer ${
                          state.settings.cylinderType === size
                            ? 'neu-pressed text-neu-darkest'
                            : 'neu-raised text-neu-medium-dark hover:neu-button'
                        }`}
                      >
                        <Gauge className={`text-2xl mb-2 ${state.settings.cylinderType === size ? 'text-neu-dark' : 'text-neu-medium'}`} />
                        <span className="font-medium">{size}</span>
                        <span className="text-sm neu-text-muted">
                          ~{size === '6kg' ? '3000' : size === '10kg' ? '5000' : '10000'}L CO₂
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Volume & Requirements */}
            <div className="neu-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center neu-heading-secondary">
                  <div className="neu-raised rounded-2xl p-3 mr-3">
                    <BarChart3 className="text-neu-dark h-5 w-5" />
                  </div>
                  Results
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLiterUnits(!showLiterUnits)}
                  className="neu-button text-neu-darkest"
                >
                  {showLiterUnits ? <ToggleRight className="mr-2 h-4 w-4" /> : <ToggleLeft className="mr-2 h-4 w-4" />}
                  {showLiterUnits ? 'L/min' : 'g/hr'}
                </Button>
              </div>

              {/* Calculation Explanation */}
              <div className="neu-inset rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-4 w-4 text-neu-medium-dark mt-0.5" />
                  <div className="text-sm neu-text-secondary">
                    <span className="font-semibold">Calculation Note:</span> CO₂ enrichment calculated from ambient 400ppm to target level. 
                    Accounts for {state.settings.ventilationType === 'exhausting' ? 'active exhaust air changes' : 'sealed room retention'}.
                  </div>
                </div>
              </div>
              
              {!hasValidInputs ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 neu-text-muted mx-auto mb-4" />
                  <p className="neu-text-muted">Please correct input errors to see calculations</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="neu-inset p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-neu-dark">{calculations.roomVolume().toFixed(1)}</div>
                      <div className="text-sm neu-text-secondary">Room Volume (m³)</div>
                    </div>
                    <div className="neu-inset p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-neu-dark">{Math.round(calculations.dailyCO2Grams())}</div>
                      <div className="text-sm neu-text-secondary">Daily CO₂ (grams)</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 neu-inset rounded-xl">
                      <span className="font-medium neu-text-primary">Daily CO₂ Volume:</span>
                      <span className="text-lg font-semibold text-neu-dark">{calculations.dailyCO2Liters().toFixed(1)} L</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 neu-inset rounded-xl">
                      <span className="font-medium neu-text-primary">Weekly Usage:</span>
                      <span className="text-lg font-semibold text-neu-dark">{Math.round(calculations.weeklyCO2())} g</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 neu-inset rounded-xl">
                      <span className="font-medium neu-text-primary">Monthly Usage:</span>
                      <span className="text-lg font-semibold text-neu-dark">{(calculations.monthlyCO2() / 1000).toFixed(2)} kg</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 neu-inset rounded-xl">
                      <span className="font-medium neu-text-primary">Flow Rate:</span>
                      <span className="text-lg font-semibold text-neu-dark">
                        {showLiterUnits 
                          ? `${calculations.flowRateLintersPerMinute().toFixed(1)} L/min`
                          : `${calculations.flowRateGramsPerHour().toFixed(1)} g/hr`
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 neu-inset rounded-xl">
                      <span className="font-medium neu-text-primary">Bubbles/Second:</span>
                      <span className="text-lg font-semibold text-neu-dark">
                        ~{(calculations.flowRateLintersPerMinute() * 0.55).toFixed(1)} bubbles/sec
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cylinder Duration */}
            <div className="neu-card rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center neu-heading-secondary">
                <div className="neu-raised rounded-2xl p-3 mr-3">
                  <Timer className="text-neu-dark h-5 w-5" />
                </div>
                Cylinder Duration
              </h3>
              
              {hasValidInputs && (
                <div className="space-y-4">
                  {['6kg', '10kg', '20kg'].map((size) => (
                    <div 
                      key={size}
                      className={`flex justify-between items-center p-4 rounded-xl ${
                        state.settings.cylinderType === size ? 'neu-pressed' : 'neu-inset'
                      }`}
                    >
                      <div className="flex items-center">
                        <Gauge className="text-neu-medium-dark mr-3" />
                        <span className="font-medium neu-text-primary">{size} Cylinder:</span>
                      </div>
                      <span className="text-lg font-semibold text-neu-dark">
                        {calculations.cylinderDuration(size).toFixed(1)} weeks
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Regulator Settings Section - Moved to Bottom */}
        <div className="mt-16">
          <div className="neu-card rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center neu-heading-secondary">
              <div className="neu-raised rounded-2xl p-3 mr-4">
                <Settings className="text-neu-dark h-6 w-6" />
              </div>
              Regulator Settings Guide
            </h3>
            
            <div className="neu-inset rounded-2xl p-6">
              <p className="neu-text-secondary mb-4">
                Regulator setup instructions and safety guidelines will be added in a future update. 
                This section is currently non-functional as requested.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="neu-inset rounded-xl p-4">
                  <h4 className="font-medium neu-text-primary mb-2">Flow Rate Setting</h4>
                  <p className="text-sm neu-text-muted">Based on your calculated requirements above</p>
                </div>
                <div className="neu-inset rounded-xl p-4">
                  <h4 className="font-medium neu-text-primary mb-2">Safety Guidelines</h4>
                  <p className="text-sm neu-text-muted">Always follow manufacturer instructions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}