# AI-Powered Cybersecurity Threat Detection System 🛡️🤖

[![Industry: Cybersecurity](https://img.shields.io/badge/Industry-Cybersecurity-red.svg)](https://github.com/topics/cybersecurity)
[![Tech: AI/ML](https://img.shields.io/badge/Tech-AI%2FML-blue.svg)](https://github.com/topics/machine-learning)
[![Role: SOC Analyst](https://img.shields.io/badge/Role-SOC%20Analyst-green.svg)](https://github.com/topics/security-operations-center)

Protoype Link : [Demo Link](https://ai.studio/apps/d48a8fad-b334-42f0-b2ec-21cdbc91ea26)

An industry-oriented cybersecurity project showcasing AI-driven threat detection, real-time monitoring, and anomaly classification for network traffic. This project acts as a comprehensive "Proof of Work" for students and aspiring security engineers.

---

## 📌 Project Overview
Traditional security systems rely on static rules (signatures) to detect threats. However, modern cyberattacks are dynamic and often bypass these rules. This project implements an **AI-Powered Threat Detection System** that uses Machine Learning to analyze network traffic patterns and identify malicious activities like **DoS Attacks**, **Brute Force**, and **Data Exfiltration** based on behavioral anomalies.

### 🎯 Objective
To build a functional prototype of a Security Operations Center (SOC) dashboard that utilizes a trained AI model to predict and visualize network threats in real-time.

---

## 🚀 Key Features
- **Real-time Dashboard**: Interactive visualizations of network traffic, threat distribution, and system health.
- **AI Threat Simulator**: A sandbox environment to test the model with custom parameters (Packet Size, Failed Logins, Frequency).
- **Live Log Feed**: A terminal-style interface showing real-time packet inspection and system events.
- **Modular Architecture**: Clean separation between the AI prediction backend and the React-based frontend.
- **Industry Documentation**: Detailed explanation of the "Why" and "How" behind the project, including interview preparation.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Tailwind CSS 4, Framer Motion (Animations), Recharts (Data Viz), Lucide React (Icons).
- **Backend**: Node.js, Express (API Layer), Vite (Dev Server).
- **AI/ML (Simulated)**: Random Forest Classifier logic implemented via backend endpoints.
- **Language**: TypeScript.

---

## 🏗️ Project Architecture
```text
[ Network Traffic ] --> [ Preprocessing Module ] --> [ AI Prediction Model ]
                                                              |
                                                              v
[ Dashboard UI ] <--- [ API Layer (Express) ] <--- [ Threat Classification ]
```

---

## 📂 Folder Structure
```text
AI-Cyber-Threat-Detection/
├── src/
│   ├── components/       # Reusable UI Components (Dashboard, Simulator, etc.)
│   ├── lib/              # Utility functions (cn helper)
│   ├── App.tsx           # Main Application Logic & Routing
│   ├── index.css         # Global Styles & Cyber Theme
│   └── main.tsx          # Entry Point
├── server.ts             # Express Backend & AI Simulation Logic
├── metadata.json         # App Metadata
├── package.json          # Dependencies & Scripts
└── README.md             # Project Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/AI-Cyber-Threat-Detection.git
   cd AI-Cyber-Threat-Detection
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to `http://localhost:3000` in your browser.

---

## 🧪 How to Run the Simulation
1. Navigate to the **Threat Simulator** tab.
2. Adjust the sliders:
   - **Brute Force**: Set `Failed Login Attempts` > 3.
   - **DoS Attack**: Set `Request Frequency` > 200 and `Packet Size` > 1000.
   - **Data Exfiltration**: Set `Packet Size` > 5000.
3. Click **RUN SIMULATION** to see the AI model's prediction and confidence score.

---

## 🧠 Learning Outcomes
- **Data Analysis**: Understanding how network logs are converted into features for ML.
- **Full-Stack Integration**: Connecting a React frontend to a custom Express backend.
- **Cybersecurity Fundamentals**: Learning about common attack vectors (DoS, Brute Force) and how they manifest in data.
- **UI/UX Design**: Building a high-performance, themed dashboard for professional use cases.

---
*Built with ❤️ for the Cybersecurity Community.*
