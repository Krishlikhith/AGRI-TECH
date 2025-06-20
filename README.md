# Kisan Mitra

## Empowering Indian Farmers through Technology

Kisan Mitra is a comprehensive platform designed to empower Indian farmers by providing access to cutting-edge agricultural technology, knowledge sharing, marketplace solutions, and employment opportunities. The platform addresses multiple challenges faced by the farming community in India and offers data-driven solutions to improve agricultural productivity and sustainability.

## Problem Statement

Indian agriculture faces several challenges, including:

- Limited access to modern agricultural knowledge and technologies
- Difficulty in connecting with buyers and finding fair prices for produce
- Lack of reliable weather and crop advisory information
- Inefficient agricultural input selection (seeds, fertilizers) for specific soil conditions
- Fragmented employment opportunities in the agricultural sector
- Language barriers in accessing agricultural information

Kisan Mitra aims to solve these problems through a unified platform that leverages technology to bridge the gap between farmers, buyers, agricultural experts, and service providers.

## Tech Stack

### Frontend
- **React 18** with TypeScript for building the user interface
- **React Router** for navigation
- **TailwindCSS** for responsive and customized styling
- **i18next** for internationalization (supporting multiple Indian languages)
- **Lucide React** for icons and visual elements

### Backend
- **Node.js** with Express for the web server
- **MongoDB** with Mongoose for database operations
- **JWT** for secure authentication
- **bcrypt.js** for password encryption
- **Express Validator** for input validation

### Machine Learning Services
- **Python** with FastAPI for ML model serving
- **scikit-learn** for machine learning algorithms
- **Pandas & NumPy** for data manipulation

## Core Features

### 1. Intelligent Crop Recommendation System
Our machine learning model analyzes soil parameters (N, P, K), climate conditions (temperature, humidity), and rainfall data to recommend the most suitable crops for a farmer's specific field conditions.

### 2. Fertilizer Recommendation Engine
Based on soil type, crop type, and environmental factors, the system recommends the optimal fertilizers to maximize yield while minimizing environmental impact.

### 3. Agricultural Marketplace
A digital platform where farmers can:
- List agricultural products for sale
- Find fair prices for seeds, fertilizers, equipment, and tools
- Connect directly with buyers, eliminating middlemen
- Access product reviews and ratings

### 4. Knowledge Sharing Community
A forum where farmers can:
- Share best practices and traditional farming knowledge
- Get advice from agricultural experts
- Discuss challenges and solutions
- Access educational content in multiple languages

### 5. Agricultural Employment Hub
Platform for:
- Posting and finding agricultural jobs and labor opportunities
- Land leasing and sharing arrangements
- Skilled agricultural workers to find employment
- Tracking applications and communications with potential employers/employees

### 6. Weather Forecasting & Advisory
- Real-time weather data and forecasts customized for agricultural needs
- Crop-specific advisory based on weather conditions
- Alerts for extreme weather events

### 7. Multi-lingual Support
The platform supports multiple Indian languages including:
- Hindi
- Tamil
- Telugu
- Kannada
- English

## Machine Learning Models

### 1. Crop Recommendation System
- **Algorithm**: Random Forest Classifier
- **Accuracy**: 99% on test data
- **Features**: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall
- **Output**: Top crop recommendations with confidence scores

### 2. Fertilizer Recommendation System
- **Algorithm**: Random Forest Classifier
- **Accuracy**: 97% on test data
- **Features**: Temperature, Humidity, Moisture, Soil Type, Crop Type, NPK values
- **Output**: Optimal fertilizer recommendation

## Getting Started

### Prerequisites
- Node.js v18+ and npm
- Python 3.11+
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kisan-mitra.git
cd kisan-mitra
```

2. Install frontend dependencies
```bash
cd "Kisan Mitra"
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Set up Python environment for ML services
```bash
cd ../../services
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

5. Start the development servers
```bash
cd ../Kisan\ Mitra
npm run dev:all
```

## Future Enhancements

- Mobile application for better accessibility
- Integration with IoT devices for real-time field monitoring
- Voice-based interaction for farmers with limited literacy
- Integration with government agricultural schemes and subsidies
- Expansion of machine learning models to include pest detection and crop disease diagnosis

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for Indian Farmers
