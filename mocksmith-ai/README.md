# MockSmith AI

AI-powered mock API generator that transforms plain English descriptions into working REST APIs with realistic data.

## Quick Start

1. **Get a Gemini API Key** (free):
   - Visit https://makersuite.google.com/app/apikey
   - Create a new API key
   - Copy the key

2. **Set up environment**:
   ```bash
   cd mocksmith-ai
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - Navigate to http://localhost:3000
   - Describe your API or use a template
   - Click "Generate Mock API"
   - Start using your endpoints!

## Features

- ⚡ **AI-Powered Generation**: Uses Google Gemini to create API structures
- 🎯 **Realistic Mock Data**: Context-aware data using Faker.js
- 🚀 **Instant Deployment**: Working endpoints in seconds
- 📋 **Full CRUD Support**: GET, POST, PUT, DELETE operations
- 🎨 **Dark Developer UI**: VS Code-inspired interface
- 📝 **Copy & Test**: One-click copy and in-browser testing

## How It Works

1. **Describe**: Tell the AI what kind of API you need
2. **Generate**: AI creates endpoints and realistic data
3. **Use**: Call your mock API endpoints immediately

## Example Usage

```bash
# Generate an e-commerce API
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"description": "e-commerce API with products and orders"}'

# Use the generated API
curl http://localhost:3000/api/mock/{apiId}/products
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: Google Gemini Pro
- **Data**: Faker.js
- **Storage**: In-memory (perfect for demos)

## Project Structure

```
mocksmith-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/       # AI generation endpoint
│   │   │   └── mock/           # Dynamic mock API routes
│   │   ├── page.tsx            # Main UI
│   │   └── layout.tsx
│   ├── components/
│   │   ├── InputForm.tsx       # API description input
│   │   └── Dashboard.tsx       # Generated API display
│   └── lib/
│       ├── ai/
│       │   └── gemini.ts       # AI integration
│       ├── generator/
│       │   └── dataGenerator.ts # Mock data generation
│       └── storage/
│           └── apiStore.ts     # In-memory storage
```

## Demo Tips

1. **Use Templates**: Quick start with pre-built examples
2. **Test in Browser**: Click "Test API" to see live responses
3. **Copy URLs**: One-click copy for curl commands
4. **Realistic Data**: Notice context-aware mock data

## Troubleshooting

**API Generation Fails**:
- Check your Gemini API key in `.env.local`
- Try using a template instead
- Simplify your description

**Port Already in Use**:
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

## License

MIT
