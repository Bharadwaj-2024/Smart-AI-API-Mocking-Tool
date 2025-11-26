'use client';

import { useState } from 'react';

interface Endpoint {
    method: string;
    path: string;
    description: string;
    fullUrl: string;
}

interface DashboardProps {
    apiId: string;
    apiName: string;
    description: string;
    baseUrl: string;
    endpoints: Endpoint[];
    resources: string[];
}

export default function Dashboard({ apiId, apiName, description, baseUrl, endpoints, resources }: DashboardProps) {
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
    const [testResponse, setTestResponse] = useState<any>(null);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedUrl(label);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const testEndpoint = async (endpoint: Endpoint) => {
        setTestingEndpoint(endpoint.fullUrl);
        setTestResponse(null);

        try {
            const response = await fetch(endpoint.fullUrl);
            const data = await response.json();
            setTestResponse(data);
        } catch (error) {
            setTestResponse({ error: 'Failed to fetch' });
        } finally {
            setTestingEndpoint(null);
        }
    };

    const getMethodBadgeClass = (method: string) => {
        const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        const methodClasses: Record<string, string> = {
            GET: 'bg-green-500/10 text-green-400 border border-green-500/20',
            POST: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
            PUT: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
            DELETE: 'bg-red-500/10 text-red-400 border border-red-500/20'
        };
        return `${baseClass} ${methodClasses[method] || methodClasses.GET}`;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-200 border-cyan-500/30">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold gradient-text">{apiName}</h2>
                        <p className="text-gray-400 mt-1">{description}</p>
                        <div className="mt-4 flex items-center gap-2">
                            <code className="text-sm text-cyan-400 bg-gray-800 px-3 py-1 rounded">
                                {baseUrl}
                            </code>
                            <button
                                onClick={() => copyToClipboard(baseUrl, 'base')}
                                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm py-1"
                            >
                                {copiedUrl === 'base' ? '✓ Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">API ID</div>
                        <code className="text-xs text-gray-400">{apiId}</code>
                    </div>
                </div>
            </div>

            {/* Resources Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-200">
                <h3 className="font-semibold text-gray-200 mb-3">Resources</h3>
                <div className="flex flex-wrap gap-2">
                    {resources.map((resource) => (
                        <span key={resource} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            {resource}
                        </span>
                    ))}
                </div>
            </div>

            {/* Endpoints */}
            <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                    Endpoints ({endpoints.length})
                </h3>
                <div className="space-y-3">
                    {endpoints.map((endpoint, index) => (
                        <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-200 hover:border-gray-600">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={getMethodBadgeClass(endpoint.method)}>
                                            {endpoint.method}
                                        </span>
                                        <code className="text-sm text-gray-300 font-mono">
                                            {endpoint.path}
                                        </code>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">{endpoint.description}</p>
                                    <div className="flex items-center gap-2">
                                        <code className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded flex-1 overflow-x-auto">
                                            {endpoint.fullUrl}
                                        </code>
                                        <button
                                            onClick={() => copyToClipboard(endpoint.fullUrl, endpoint.fullUrl)}
                                            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-700 hover:bg-gray-600 text-gray-100 text-xs py-1 whitespace-nowrap"
                                        >
                                            {copiedUrl === endpoint.fullUrl ? '✓' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                                {endpoint.method === 'GET' && (
                                    <button
                                        onClick={() => testEndpoint(endpoint)}
                                        disabled={testingEndpoint === endpoint.fullUrl}
                                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-600 hover:border-cyan-500 hover:text-cyan-500 text-sm whitespace-nowrap disabled:opacity-50"
                                    >
                                        {testingEndpoint === endpoint.fullUrl ? 'Testing...' : 'Test API'}
                                    </button>
                                )}
                            </div>

                            {/* Test Response */}
                            {testResponse && testingEndpoint === null && (
                                <div className="mt-4 pt-4 border-t border-gray-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-300">Response</span>
                                        <button
                                            onClick={() => setTestResponse(null)}
                                            className="text-xs text-gray-500 hover:text-gray-300"
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <pre className="text-xs overflow-x-auto max-h-64 overflow-y-auto">
                                        {JSON.stringify(testResponse, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Usage Example */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-200 border-gray-700">
                <h3 className="font-semibold text-gray-200 mb-3">Quick Start</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-400 mb-2">Fetch data with curl:</p>
                        <pre className="text-xs">
                            {`curl ${baseUrl}/${resources[0] || 'resource'}`}
                        </pre>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-2">Or with JavaScript:</p>
                        <pre className="text-xs">
                            {`fetch('${baseUrl}/${resources[0] || 'resource'}')
  .then(res => res.json())
  .then(data => console.log(data));`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
