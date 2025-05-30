# Hydroponics CO₂ Flow Estimator

A professional web application for calculating CO₂ supplementation requirements in hydroponic growing systems.

## Features

- **CO₂ Calculator**: Calculate precise CO₂ flow rates for your grow room
- **Room Configuration**: Input room dimensions and target CO₂ levels
- **Ventilation Support**: Handles both sealed and exhausting ventilation systems
- **Cylinder Duration**: Estimate how long your CO₂ cylinders will last
- **Export Results**: Download your calculations as a text file
- **Safety Guide**: CO₂ safety information for growers
- **Growing Guide**: Best practices for CO₂ supplementation
- **FAQ**: Common questions and answers

## Technology Stack

- **Frontend**: React + TypeScript with Vite
- **Styling**: Tailwind CSS with custom green theme
- **Icons**: React Icons (Font Awesome)
- **Routing**: Wouter
- **Backend**: Express.js with TypeScript
- **Database**: SQLite with Drizzle ORM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/panduka56/HydroponicsCO2Flow.git
cd HydroponicsCO2Flow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5001`

## Usage

1. **Configure Room**: Enter your grow room dimensions (length, width, height)
2. **Set CO₂ Target**: Choose your target CO₂ level (800-1500 ppm)
3. **Select Ventilation**: Choose between sealed or exhausting ventilation
4. **Set Schedule**: Configure hours per day and days per week
5. **Choose Cylinder**: Select your CO₂ cylinder size
6. **View Results**: See calculated flow rates and cylinder duration
7. **Export**: Download your results for reference

## Safety Information

- Always use a CO₂ monitor in your grow space
- CO₂ levels above 1500 ppm can be dangerous
- Ensure proper ventilation when working in CO₂ enriched environments
- Follow all local regulations for CO₂ storage and handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions, issues, or feature requests, please open an issue on GitHub.