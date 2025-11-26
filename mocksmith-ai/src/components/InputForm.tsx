'use client';

import { useState } from 'react';

interface Template {
    name: string;
    description: string;
    icon: string;
}

const templates: Template[] = [
    {
        name: 'E-Commerce',
        description: 'e-commerce API with products, users, orders, and shopping cart',
        icon: '🛒'
    },
    {
        name: 'Social Media',
        description: 'social media API with users, posts, comments, and likes',
        icon: '📱'
    },
    {
        name: 'Food Delivery',
        description: 'food delivery API with restaurants, menus, orders, and delivery tracking',
        icon: '🍔'
    }
];

interface InputFormProps {
    onGenerate: (description: string) => void;
    loading: boolean;
}

export default function InputForm({ onGenerate, loading }: InputFormProps) {
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim()) {
            onGenerate(description.trim());
        }
    };

    const handleTemplateClick = (template: Template) => {
        setDescription(template.description);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-200">Quick Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {templates.map((template) => (
                        <button
                            key={template.name}
                            onClick={() => handleTemplateClick(template)}
                            disabled={loading}
                            className="bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-200 text-left hover:border-cyan-500 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-3xl">{template.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                        Describe Your API
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Example: social media API with users, posts, likes, and comments"
                        className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none w-full h-32"
                        disabled={loading}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Be specific about the resources and features you need
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading || !description.trim()}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-cyan-500 hover:bg-cyan-600 text-gray-900 w-full md:w-auto px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <span>✨</span>
                            Generate Mock API
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
