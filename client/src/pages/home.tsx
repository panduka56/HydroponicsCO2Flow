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
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Sprout className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CO₂ Flow Estimator</h1>
                <p className="text-sm text-muted-foreground">co2forplants.co.uk</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground font-medium">Professional Hydroponics Calculator</span>
              <Button onClick={handleExport} className="bg-gradient-secondary text-white hover:opacity-90 shadow-lg">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Intro Section */}
        <div className="mb-8">
          <div className="bg-gradient-primary text-white rounded-xl p-8 mb-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-3">Calculate Your CO₂ Requirements</h2>
            <p className="text-white/90 text-lg leading-relaxed">Determine optimal CO₂ levels, flow rates, and cylinder requirements for your grow room with our professional calculator.</p>
          </div>
          
          {/* Safety Alert */}
          <Alert className="bg-warning-bg border-l-4 border-accent-orange shadow-md">
            <TriangleAlert className="h-5 w-5 text-accent-orange" />
            <AlertDescription className="text-neutral-charcoal">
              <span className="font-semibold text-accent-coral">Safety First:</span> Always use a CO₂ monitor and ensure proper ventilation. Levels above 1500 ppm can be dangerous.
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-card rounded-xl shadow-xl p-6 card-hover border border-border">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
              <Calculator className="text-primary-emerald mr-3" />
              Room Parameters & Settings
            </h3>
            
            <div className="space-y-6">
              {/* Room Dimensions */}
              <Card className="bg-primary-mint border-primary-emerald/20">
                <CardContent className="p-4">
                  <h4 className="font-medium text-primary-forest mb-4 flex items-center">
                    <Box className="text-primary-emerald mr-2" />
                    Room Dimensions
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="roomLength" className="text-sm font-medium text-primary-forest mb-2">Length (m)</Label>
                      <Input
                        id="roomLength"
                        type="number"
                        placeholder="4.0"
                        step="0.1"
                        min="0.1"
                        max="50"
                        value={state.roomDimensions.length}
                        onChange={(e) => updateDimension('length', e.target.value)}
                        className={errors.length ? "border-danger-red" : "border-primary-emerald/30 focus:border-primary-emerald"}
                      />
                      {errors.length && <p className="text-xs text-danger-red mt-1">{errors.length}</p>}
                    </div>
                    <div>
                      <Label htmlFor="roomWidth" className="text-sm font-medium text-primary-forest mb-2">Width (m)</Label>
                      <Input
                        id="roomWidth"
                        type="number"
                        placeholder="3.0"
                        step="0.1"
                        min="0.1"
                        max="50"
                        value={state.roomDimensions.width}
                        onChange={(e) => updateDimension('width', e.target.value)}
                        className={errors.width ? "border-danger-red" : "border-primary-emerald/30 focus:border-primary-emerald"}
                      />
                      {errors.width && <p className="text-xs text-danger-red mt-1">{errors.width}</p>}
                    </div>
                    <div>
                      <Label htmlFor="roomHeight" className="text-sm font-medium text-primary-forest mb-2">Height (m)</Label>
                      <Input
                        id="roomHeight"
                        type="number"
                        placeholder="2.5"
                        step="0.1"
                        min="0.1"
                        max="10"
                        value={state.roomDimensions.height}
                        onChange={(e) => updateDimension('height', e.target.value)}
                        className={errors.height ? "border-danger-red" : "border-primary-emerald/30 focus:border-primary-emerald"}
                      />
                      {errors.height && <p className="text-xs text-danger-red mt-1">{errors.height}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CO2 Settings */}
              <Card className="bg-secondary-sky border-secondary-blue/20">
                <CardContent className="p-4">
                  <h4 className="font-medium text-secondary-navy mb-4 flex items-center">
                    <Wind className="text-secondary-blue mr-2" />
                    CO₂ Configuration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Label className="text-sm font-medium text-secondary-navy">Target CO₂ Level (ppm)</Label>
                        <div className="group relative">
                          <HelpCircle className="h-4 w-4 text-secondary-blue cursor-help" />
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-charcoal text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-64">
                            Enrichment from ambient 400ppm. 800ppm for vegetative growth, 1200-1500ppm for flowering.
                          </div>
                        </div>
                      </div>
                      <Select value={state.settings.targetCO2.toString()} onValueChange={(value) => updateSetting('targetCO2', parseInt(value))}>
                        <SelectTrigger className="border-secondary-blue/30 focus:border-secondary-blue">
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
                      <Label className="text-sm font-medium text-secondary-navy mb-2">Ventilation Type</Label>
                      <Select value={state.settings.ventilationType} onValueChange={(value: 'sealed' | 'exhausting') => updateSetting('ventilationType', value)}>
                        <SelectTrigger className="border-secondary-blue/30 focus:border-secondary-blue">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sealed">Sealed Room</SelectItem>
                          <SelectItem value="exhausting">Active Exhaust</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Schedule */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="text-primary mr-2" />
                    Usage Schedule
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hoursPerDay" className="text-sm font-medium text-gray-700 mb-2">Hours per Day</Label>
                      <Input
                        id="hoursPerDay"
                        type="number"
                        placeholder="12"
                        min="1"
                        max="24"
                        value={state.schedule.hoursPerDay}
                        onChange={(e) => updateSchedule('hoursPerDay', e.target.value)}
                        className={errors.hoursPerDay ? "border-red-500" : ""}
                      />
                      <p className="text-xs text-gray-500 mt-1">Typically matches light cycle</p>
                      {errors.hoursPerDay && <p className="text-xs text-red-500 mt-1">{errors.hoursPerDay}</p>}
                    </div>
                    <div>
                      <Label htmlFor="daysPerWeek" className="text-sm font-medium text-gray-700 mb-2">Days per Week</Label>
                      <Input
                        id="daysPerWeek"
                        type="number"
                        placeholder="7"
                        min="1"
                        max="7"
                        value={state.schedule.daysPerWeek}
                        onChange={(e) => updateSchedule('daysPerWeek', e.target.value)}
                        className={errors.daysPerWeek ? "border-red-500" : ""}
                      />
                      {errors.daysPerWeek && <p className="text-xs text-red-500 mt-1">{errors.daysPerWeek}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cylinder Selection */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Gauge className="text-primary mr-2" />
                    Cylinder Specification
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {['6kg', '10kg', '20kg'].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSetting('cylinderType', size as '6kg' | '10kg' | '20kg')}
                        className={`flex flex-col items-center p-4 border-2 rounded-lg transition-colors cursor-pointer ${
                          state.settings.cylinderType === size
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        <Gauge className={`text-2xl mb-2 ${state.settings.cylinderType === size ? 'text-primary' : 'text-gray-400'}`} />
                        <span className="font-medium">{size}</span>
                        <span className="text-sm text-gray-500">
                          ~{size === '6kg' ? '3000' : size === '10kg' ? '5000' : '10000'}L CO₂
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Volume & Requirements */}
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center text-foreground">
                    <BarChart3 className="text-primary-emerald mr-3" />
                    Calculated Requirements
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLiterUnits(!showLiterUnits)}
                    className="border-primary-emerald/30 text-primary-emerald hover:bg-primary-mint"
                  >
                    {showLiterUnits ? <ToggleRight className="mr-2 h-4 w-4" /> : <ToggleLeft className="mr-2 h-4 w-4" />}
                    {showLiterUnits ? 'L/min' : 'g/hr'}
                  </Button>
                </div>

                {/* Calculation Explanation */}
                <Alert className="bg-secondary-sky border-l-4 border-secondary-blue mb-6">
                  <Info className="h-4 w-4 text-secondary-blue" />
                  <AlertDescription className="text-secondary-navy text-sm">
                    <span className="font-semibold">Calculation Note:</span> CO₂ enrichment calculated from ambient 400ppm to target level. 
                    Accounts for {state.settings.ventilationType === 'exhausting' ? 'active exhaust air changes' : 'sealed room retention'}.
                  </AlertDescription>
                </Alert>
                
                {!hasValidInputs ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Please correct input errors to see calculations</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-secondary-sky p-4 rounded-lg text-center border border-secondary-blue/20">
                        <div className="text-2xl font-bold text-secondary-blue">{calculations.roomVolume().toFixed(1)}</div>
                        <div className="text-sm text-secondary-navy">Room Volume (m³)</div>
                      </div>
                      <div className="bg-primary-mint p-4 rounded-lg text-center border border-primary-emerald/20">
                        <div className="text-2xl font-bold text-primary-emerald">{Math.round(calculations.dailyCO2Grams())}</div>
                        <div className="text-sm text-primary-forest">Daily CO₂ (grams)</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Daily CO₂ Volume:</span>
                        <span className="font-bold text-primary">{calculations.dailyCO2Liters().toFixed(1)} L</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Weekly Usage:</span>
                        <span className="font-bold text-primary">{Math.round(calculations.weeklyCO2())} g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Monthly Usage:</span>
                        <span className="font-bold text-primary">{(calculations.monthlyCO2() / 1000).toFixed(2)} kg</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Regulator Settings */}
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings className="text-primary mr-3" />
                  Regulator Settings
                </h3>
                
                {!hasValidInputs ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Calculations unavailable</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Recommended Flow Rate:</span>
                        <span className="text-xl font-bold text-primary">{calculations.flowRateGramsPerHour().toFixed(1)} g/hr</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-800">{calculations.flowRateLintersPerMinute().toFixed(1)}</div>
                        <div className="text-sm text-gray-600">L/min equivalent</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-800">{(calculations.flowRateLintersPerMinute() * 0.55).toFixed(1)}</div>
                        <div className="text-sm text-gray-600">Bubbles/second*</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">*Approximate, varies by diffuser type</p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Cylinder Duration */}
            <Card className="bg-card shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Timer className="text-primary mr-3" />
                  Cylinder Duration
                </h3>
                
                {!hasValidInputs ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Calculations unavailable</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {['6kg', '10kg', '20kg'].map((size) => (
                      <div 
                        key={size}
                        className={`flex justify-between items-center p-3 border rounded-lg ${
                          state.settings.cylinderType === size ? 'border-2 border-primary bg-primary/5' : 'border'
                        }`}
                      >
                        <div className="flex items-center">
                          <Gauge className={`mr-2 ${state.settings.cylinderType === size ? 'text-primary' : 'text-gray-400'}`} />
                          <span className={state.settings.cylinderType === size ? 'font-medium' : ''}>{size} Cylinder</span>
                        </div>
                        <span className={`font-bold ${state.settings.cylinderType === size ? 'text-primary' : 'text-gray-700'}`}>
                          {calculations.cylinderDuration(size).toFixed(1)} weeks
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* High PPM Warning */}
            {isHighPPM && (
              <Alert className="bg-red-50 border-l-4 border-danger">
                <AlertCircle className="h-4 w-4 text-danger" />
                <AlertDescription>
                  <span className="font-semibold text-red-800">High CO₂ Warning:</span>
                  <span className="text-red-700 ml-1">Levels above 1500 ppm can be dangerous. Ensure proper ventilation and monitoring.</span>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Safety Section */}
        <div className="mt-12">
          <Card className="bg-card shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <ShieldAlert className="text-danger mr-3" />
                Safety Guidelines & Best Practices
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-success flex items-center">
                    <CheckCircle className="mr-2" />
                    DO - Safety Best Practices
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Install a CO₂ monitor with audible alarm",
                      "Ensure adequate ventilation at all times",
                      "Secure cylinders upright with chains/straps",
                      "Check for leaks regularly with soapy water",
                      "Use only during light periods for optimal plant uptake"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-success mr-2 mt-1 text-xs flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-danger flex items-center">
                    <XCircle className="mr-2" />
                    DON'T - Safety Warnings
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Never exceed 1500 ppm in occupied spaces",
                      "Don't enter grow room during high CO₂ periods",
                      "Avoid smoking or open flames near CO₂ equipment",
                      "Don't store cylinders in living spaces or basements",
                      "Never modify or tamper with cylinder valves"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="text-danger mr-2 mt-1 text-xs flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Alert className="mt-6 bg-blue-50">
                <Info className="h-4 w-4 text-info" />
                <AlertDescription>
                  <span className="font-semibold text-info">Recommended Equipment:</span>
                  <span className="text-blue-800 ml-1">
                    Always use a dedicated CO₂ monitor, quality regulator, and timer system. 
                    Consider professional installation for larger systems.
                  </span>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 bg-gray-800 text-white rounded-xl p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Sprout className="mr-2" />
                CO₂ for Plants
              </h4>
              <p className="text-gray-300 text-sm">Professional hydroponics CO₂ calculator for optimal plant growth and safety.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">CO₂ Equipment Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Local Suppliers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Growing Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <p className="text-gray-300 text-sm mb-2">Questions about CO₂ for your grow room?</p>
              <Button className="bg-primary text-white hover:bg-primary-dark">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
          <Separator className="my-6 bg-gray-700" />
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 co2forplants.co.uk - Professional Hydroponics Calculations</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
