# KalaKart AI — Virtual Business Manager & Multi-Product Smart Cataloger (SIH26090)

> **Smart India Hackathon 2026 Problem Statement SIH26090**  
> **Ministry:** Ministry of Social Justice and Empowerment (MoSJE)  
> **Department:** Department of Social Justice and Empowerment  
> **Category:** Software | **Theme:** Miscellaneous / Social Justice & Micro-Economy  

---

## 📌 Overview

**KalaKart AI** is a voice-first, AI-driven Virtual Business Manager and Smart Cataloging mobile/web application designed to empower marginalized artisans (SC/ST communities, rural weavers, traditional craftspeople) and any micro-seller to digitize inventory, isolate multi-product snapshots, create professional e-commerce catalog listings, and connect directly to buyers via the Open Network for Digital Commerce (**ONDC**) without requiring digital or English literacy.

---

## 🌟 Core Features & Innovation Vectors

### 1. 🔍 Multi-Product Segmentation AI (Custom SIH26090 Vector)
* **Single Snapshot Multi-Item Detection**: Upload a photo containing multiple items on a display table or workshop.
* **Auto-Bounding Box Isolation**: AI automatically detects individual objects (e.g., Terracotta Clay Pot, Handwoven Silk Scarf, Antique Brass Diya) and crops them into independent high-resolution product listings.

### 2. 🎨 Generative AI Photo Studio
* **Background Removal**: Cleans background clutter from raw phone snapshots.
* **Studio Lighting Presets**: Switch backdrop atmospheres:
  * 🌟 *Warm Studio* (Earthy tone for handicrafts)
  * 🪵 *Rustic Wood* (Authentic craft aesthetic)
  * ⚪ *Clean White* (Amazon & ONDC standard)
  * 🌌 *Dark Luxury* (Premium showcase)
* **AI Soft Shadow Generator**: Renders realistic drop shadows for professional e-commerce visuals.

### 3. 🗣️ Multilingual Voice-First Auto-Cataloger (Bhashini Engine)
* **Zero-Literacy Voice Input**: Artisans record 30-second voice notes in Indic regional languages (*Hindi, Tamil, Bengali, Telugu, Gujarati, Marathi, English*).
* **AI Multilingual Copywriting**: Auto-translates voice instructions into 3 languages, generating SEO titles, descriptions, bullet points, care instructions, and ONDC taxonomy categories (`home-and-kitchen/pottery/terracotta-ware`).
* **Text-To-Speech (TTS)**: Reads out listing details to users who cannot read text.

### 4. 📊 Dynamic AI Pricing Assistant
* **Cost Input Sliders**: Calculates material costs, artisan labor duration (hours @ rate/hr), and eco-packaging.
* **Artisan Margin Protection**: Guarantees **75%+ profit retained by the artisan**, bypassing traditional 60-70% middleman commission cuts.
* **Market Benchmark Radar**: Compares suggested ONDC price against live market benchmarks (*ONDC DigiHaat vs Meesho vs Amazon vs GeM*).

### 5. 🚀 1-Click ONDC Beckn Protocol Publishing Engine
* **Beckn Protocol Compliant**: Automatically formats product catalog into `beckn.org/catalog/v1.1.0` JSON payloads.
* **Multi-Marketplace Sync**: Direct 1-click publishing to ONDC Sandbox, DigiHaat, GeM (Government e-Marketplace), and private platforms.
* **Live Buyer View & QR Code**: Generates instant buyer-facing storefront cards and scannable UPI QR codes for physical exhibition sales.

### 6. 🎙️ Voice-Navigated Virtual Business Manager Dashboard
* **Performance Center**: Track total buyer impressions, orders fulfilled, net revenue, and Jan Dhan bank payouts.
* **Hands-Free Assistant ("KalaKart")**: Tap the mic or speak queries (*"Mera kitna bikri hua?"*, *"Naya product add karo"*) for instant spoken feedback.

---

## 📁 Repository Directory Structure

```text
kalakart/
├── public/
│   └── images/
│       ├── demo1.png               # Preset multi-product photo 1 (Pot, Scarf, Diya)
│       ├── demo2.png               # Preset multi-product photo 2 (Bamboo container, Tote bag)
│       └── demo3.png               # Preset multi-product photo 3 (Leather journal, Mug)
├── src/
│   ├── components/
│   │   ├── BusinessDashboard.tsx    # Virtual Business Manager sales analytics & payouts
│   │   ├── MultiProductStudio.tsx   # Multi-product bounding box isolation & studio backdrop
│   │   ├── Navbar.tsx               # Header, ONDC sandbox badge, language selector
│   │   ├── OndcPublisher.tsx        # Beckn JSON payload viewer & 1-click publisher
│   │   ├── PricingAssistant.tsx     # Dynamic price calculator & market benchmark radar
│   │   ├── SimulationWalkthroughModal.tsx # Guided 5-phase SIH architecture modal
│   │   ├── VoiceAssistantModal.tsx  # Hands-free voice assistant ("KalaKart AI")
│   │   └── VoiceCataloger.tsx       # Bhashini STT, translation & audio playback
│   ├── data/
│   │   └── mockData.ts              # Preset multi-item bounding box coordinates & audio samples
│   ├── services/
│   │   └── aiService.ts             # Object detector, Bhashini translator, Beckn JSON generator
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces for products, boxes, pricing, ONDC
│   ├── App.tsx                      # Main interactive workspace state & step wizard
│   ├── index.css                    # Tailwind CSS styling & glow animations
│   ├── main.tsx                     # React root entry point
│   └── vite-env.d.ts
├── index.html                       # HTML container with metadata
├── package.json                     # React 18, Vite, Tailwind CSS, Lucide icons, Canvas-Confetti
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts                   # Vite bundler with Tailwind CSS plugin
├── README.md                        # Project documentation & GitHub pitch
└── .gitignore                       # Excludes node_modules, dist, logs
```

---

## 🛠️ Technology Stack

| Component | Technology Used |
| :--- | :--- |
| **Frontend UI/UX** | React 18, TypeScript, Tailwind CSS, Lucide Icons |
| **AI Studio Processing** | HTML5 Canvas API, Image Bounding-Box Cropping, Drop Shadows |
| **Voice & NLP Engine** | Web Speech API (STT & TTS), Bhashini API Simulator |
| **Marketplace Protocol** | ONDC Beckn Protocol Schema (`beckn.org/catalog/v1.1.0`) |
| **Build & Dev Tools** | Vite 8, Node.js v24 |

---

## ⚡ Quick Start & Local Installation

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/kalakart-ai.git
   cd kalakart-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Local Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173/`

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Sample ONDC Beckn Protocol JSON Output

```json
{
  "context": {
    "domain": "nic2004:52110",
    "action": "on_search",
    "country": "IND",
    "bpp_id": "kalakart-artisan-gateway.ondc.gov.in"
  },
  "message": {
    "catalog": {
      "bpp/descriptor": {
        "name": "KalaKart MoSJE Artisan Collective",
        "short_desc": "Direct Marketplace for SC/ST, Rural Artisans & Micro-Sellers"
      },
      "bpp/providers": [
        {
          "id": "artisan-provider-090",
          "items": [
            {
              "id": "item-101",
              "descriptor": {
                "name": "Handpainted Terracotta Clay Pot",
                "short_desc": "Authentic eco-friendly terracotta clay water pot hand-painted with traditional folk motifs."
              },
              "price": {
                "currency": "INR",
                "value": "480.00"
              },
              "category_id": "home-and-kitchen/pottery/terracotta-ware"
            }
          ]
        }
      ]
    }
  }
}
```

---

## 🏆 SIH26090 Hackathon Alignment Summary

* **Ministry:** Ministry of Social Justice and Empowerment (MoSJE)
* **Target Audience:** SC/ST artisans, rural women weavers, tribal producers, and general sellers.
* **Impact Target:** Eliminates 70% middleman profit loss, enables year-round digital ONDC sales, and provides zero-literacy voice navigation connected to Jan Dhan accounts.
