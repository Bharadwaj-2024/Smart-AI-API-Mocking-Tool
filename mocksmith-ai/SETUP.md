# SETUP INSTRUCTIONS

## ⚡ Quick Start (Do This First!)

### 1. Get Your Gemini API Key

Visit: https://makersuite.google.com/app/apikey

Click "Create API Key" and copy it.

### 2. Create .env.local File

In the `mocksmith-ai` directory, create a file named `.env.local` with:

```
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you copied.

### 3. Start the Server

The server should already be running. If not:

```bash
cd /Users/kishan/projects/Smart-AI-API-Mocking-Tool/mocksmith-ai
npm run dev
```

### 4. Open Your Browser

Navigate to: http://localhost:3000

## 🎯 Test It Works

1. Click the "Food Delivery" template button
2. Click "Generate Mock API"
3. Wait 5-10 seconds
4. You should see a dashboard with endpoints!

## ⚠️ If Something Breaks

**"Generation Failed" error**:
- Make sure you created `.env.local` with your Gemini API key
- Restart the server (Ctrl+C, then `npm run dev`)

**Templates work but custom descriptions don't**:
- That's okay! Templates use fallback logic
- For the demo, stick with templates

**Port 3000 in use**:
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

## 🎬 Ready to Demo!

Your app is working at http://localhost:3000

Use the templates for the most reliable demo experience.
