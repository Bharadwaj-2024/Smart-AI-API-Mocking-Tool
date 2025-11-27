'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import Dashboard from '@/components/Dashboard';

interface GeneratedAPI {
  apiId: string;
  apiName: string;
  description: string;
  baseUrl: string;
  endpoints: any[];
  resources: string[];
}

export default function Home() {
  const [generatedAPI, setGeneratedAPI] = useState<GeneratedAPI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (description: string) => {
    setLoading(true);
    setError(null);
    setGeneratedAPI(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        throw new Error('Failed to generate API');
      }

      const data = await response.json();
      setGeneratedAPI(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate API');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedAPI(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold gradient-text">MockSmith AI</h1>
              <p className="text-sm text-gray-400 mt-1">
                Transform plain English into working mock APIs
              </p>
            </div>
            {generatedAPI && (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 border-2 border-cyan-500 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 text-sm"
              >
                ← New API
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!generatedAPI ? (
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-100 mb-4">
                Describe your API in plain English
              </h2>
              <p className="text-gray-400">
                Our AI will generate a complete REST API with realistic mock data in seconds
              </p>
            </div>

            <InputForm onGenerate={handleGenerate} loading={loading} />

            {error && (
              <div className="mt-6 bg-gradient-to-br from-red-900/20 to-pink-900/20 border-2 border-red-500/40 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-red-400">Generation Failed</h3>
                    <p className="text-sm text-gray-400 mt-1">{error}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Try using one of the templates or simplify your description
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-500/30 rounded-xl p-6 transition-all duration-300 hover:border-cyan-400/50 hover-lift">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-200 mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-400">
                  Generate complete APIs in under 10 seconds
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-500/30 rounded-xl p-6 transition-all duration-300 hover:border-purple-400/50 hover-lift">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-200 mb-1">Realistic Data</h3>
                <p className="text-sm text-gray-400">
                  Context-aware mock data that looks real
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-pink-500/30 rounded-xl p-6 transition-all duration-300 hover:border-pink-400/50 hover-lift">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-semibold text-gray-200 mb-1">Instant Deploy</h3>
                <p className="text-sm text-gray-400">
                  Working endpoints ready to use immediately
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard
            apiId={generatedAPI.apiId}
            apiName={generatedAPI.apiName}
            description={generatedAPI.description}
            baseUrl={generatedAPI.baseUrl}
            endpoints={generatedAPI.endpoints}
            resources={generatedAPI.resources}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>Built with Next.js, Google Gemini AI, and Faker.js</p>
        </div>
      </footer>
    </main>
  );
}
