import { NextRequest, NextResponse } from 'next/server';
import { generateAPIStructure } from '@/lib/ai/gemini';
import { generateAllMockData } from '@/lib/generator/dataGenerator';
import { apiStore } from '@/lib/storage/apiStore';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { description } = body;

        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                { error: 'Description is required' },
                { status: 400 }
            );
        }

        // Generate API structure using AI
        console.log('Generating API structure for:', description);
        const apiStructure = await generateAPIStructure(description);

        // Generate mock data for all resources
        console.log('Generating mock data...');
        const mockData = generateAllMockData(apiStructure.resources);

        // Store in memory
        const apiId = apiStore.createAPI(apiStructure, mockData);

        // Get base URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
            `${request.nextUrl.protocol}//${request.nextUrl.host}`;

        // Flatten endpoints for response
        const endpoints = apiStore.getFlatEndpoints(apiId);

        return NextResponse.json({
            apiId,
            baseUrl: `${baseUrl}/api/mock/${apiId}`,
            apiName: apiStructure.apiName,
            description: apiStructure.description,
            endpoints: endpoints.map(ep => ({
                method: ep.method,
                path: ep.path,
                description: ep.description,
                fullUrl: `${baseUrl}/api/mock/${apiId}${ep.path.replace(':id', '{id}')}`
            })),
            resources: apiStructure.resources.map(r => r.name),
            createdAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate API', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
