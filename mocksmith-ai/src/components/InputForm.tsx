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
        <div className="space-y-8 animate-slide-up">
            <div>
                <h2 className="text-2xl font-bold mb-4 gradient-text">⚡ Quick Start Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {templates.map((template) => (
                        <button
                            key={template.name}
                            onClick={() => handleTemplateClick(template)}
                            disabled={loading}
                            className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 rounded-xl p-5 transition-all duration-300 text-left hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 hover-lift group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-3xl">{template.icon}</span>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-100 group-hover:text-cyan-400 transition-colors">
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
                    <label htmlFor="description" className="block text-base font-semibold text-gray-200 mb-3">
                        Describe Your API
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Example: social media API with users, posts, likes, and comments"
                        className="bg-gray-900/50 border-2 border-gray-700 rounded-xl px-5 py-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none w-full h-36 backdrop-blur-sm"
                        disabled={loading}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Be specific about the resources and features you need
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading || !description.trim()}
                    className="relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-gray-900 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1"
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
