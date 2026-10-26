# Digital Divide Navigator

## Overview
**Digital Divide Navigator** is a privacy-focused web application designed to bridge the gap between complex administrative requirements and users who may find formal documentation intimidating. 

Instead of forcing users to navigate complex, multi-field forms, the application allows users to describe their situation in plain, natural language (a paragraph). The application then utilizes a **Local Large Language Model (LLM)** to interpret that narrative and automatically map the information into the structured data required by specific forms (e.g., scholarships, job applications, or government grants).

## Key Features
- **Narrative-to-Data Extraction:** Converts unstructured human stories into structured JSON data.
- **Privacy-First Architecture:** Uses local AI (Ollama) to ensure that sensitive personal information never leaves the local network.
- **User-Centric Design:** Minimalist interface built with React and Tailwind CSS to reduce cognitive load for non-technical users.
- **Dynamic Schema Mapping:** Easily expandable to support different types of forms by updating backend schemas.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide-React (Icons)
- **Backend:** Node.js, Express.js
- **AI Engine:** Ollama (running Llama 3 or Mistral)
- **Communication:** Axios (REST API)

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [Ollama](https://ollama.com/) installed and running
- A model downloaded via Ollama (e.g., `ollama run llama3`)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/TrxviZ/digital-divide-navigator.git
cd digital-divide-navigator
