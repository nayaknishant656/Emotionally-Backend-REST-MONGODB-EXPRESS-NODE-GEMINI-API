# Emotionally API Technical Documentation

Emotionally is an AI-powered wellness backend integrating **Gemini AI**, **Express.js**, and **MongoDB** to analyze user emotional patterns via REST APIs.

## 🚀 Tech Stack
AI (Gemini), REST API, Express.js, MongoDB, LLM Integration, Next.js.

## 🌐 Hosted Base URL
`https://emotionally-backend-rest-gemini.vercel.app`

---

## � Full Endpoint URL List

### 🧘‍♂️ System & Health
- **Root API:** `https://emotionally-backend-rest-gemini.vercel.app/`
- **Health Check:** `https://emotionally-backend-rest-gemini.vercel.app/health`
- **v1 Entry Point:** `https://emotionally-backend-rest-gemini.vercel.app/api/v1`

### 📝 Journal Endpoints
- **Get All Journals:** `GET` `https://emotionally-backend-rest-gemini.vercel.app/api/v1/journals`
- **Create New Journal:** `POST` `https://emotionally-backend-rest-gemini.vercel.app/api/v1/journals`
- **Get User's Journals:** `GET` `https://emotionally-backend-rest-gemini.vercel.app/api/v1/journals/user/{userId}`
- **Get Single Journal by ID:** `GET` `https://emotionally-backend-rest-gemini.vercel.app/api/v1/journals/{journalId}`

### 📊 AI Analysis Endpoints
- **Submit New Analysis:** `POST` `https://emotionally-backend-rest-gemini.vercel.app/api/v1/journals/analysis`
- **Get User's AI Insights:** `GET` `https://emotionally-backend-rest-gemini.vercel.app/api/v1/journals/analysis/user/{userId}`

---

## �🛠 Routes & Core Functionality

### 1. System & Health
| Route | Method | Function | Description |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | `app.get('/')` | Validates API entry and checks live MongoDB connection status. |
| `/health` | `GET` | `app.get('/health')` | Returns server health metrics, environment data, and current timestamps. |
| `/api/v1` | `GET` | `router.get('/')` | Confirms version 1 of the REST API is operational. |

### 2. Journal Management (Base: `/api/v1/journals`)
| Route | Method | Function | Description |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | `getAllJournals` | Retrieves every journal entry stored in the global database. |
| `/` | `POST` | `createJournal` | Saves new user journal text and ambience metadata to MongoDB. |
| `/user/:userId`| `GET` | `getJournalsByUserId`| Fetches all personal journal entries for a specific User ID. |
| `/:id` | `GET` | `getJournalsByUserId`| Alternative route retrieving specific journal records using ID parameters. |

### 3. AI Analysis & Insights (Base: `/api/v1/journals/analysis`)
| Route | Method | Function | Description |
| :--- | :--- | :--- | :--- |
| `/:userId` | `GET` | `getAnalysesByUserId`| Retrieves historical Gemini AI emotional insights for a single user. |
| `/` | `POST`| `createJournalAnalysis`| Stores structured LLM analysis including sentiment, intensity, and wellbeing advice. |

---
*Built for the Emotionally Mental Wellness Ecosystem.*
