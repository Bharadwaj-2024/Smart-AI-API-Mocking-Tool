import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/lib/storage/apiStore';

// GET /api/mock/[apiId]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ apiId: string }> }
) {
    const { apiId } = await params;

    // Check if API exists
    const api = apiStore.getAPI(apiId);
    if (!api) {
        return NextResponse.json(
            { error: 'API not found' },
            { status: 404 }
        );
    }

    // Return API info
    return NextResponse.json({
        apiId: api.id,
        name: api.name,
        description: api.description,
        resources: api.resources.map(r => r.name),
        endpoints: apiStore.getFlatEndpoints(apiId)
    });
}
