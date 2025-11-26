import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/lib/storage/apiStore';

// GET /api/mock/[apiId]/[...path]
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ apiId: string; path: string[] }> }
) {
    const { apiId, path } = await params;

    // Check if API exists
    const api = apiStore.getAPI(apiId);
    if (!api) {
        return NextResponse.json(
            { error: 'API not found' },
            { status: 404 }
        );
    }

    // No path means root endpoint - return API info
    if (!path || path.length === 0) {
        return NextResponse.json({
            apiId: api.id,
            name: api.name,
            description: api.description,
            resources: api.resources.map(r => r.name),
            endpoints: apiStore.getFlatEndpoints(apiId)
        });
    }

    // Extract resource name and optional ID
    const resourceName = path[0];
    const itemId = path.length > 1 ? path[1] : null;

    // Get data for resource
    const data = apiStore.getData(apiId, resourceName);

    if (!data) {
        return NextResponse.json(
            { error: `Resource '${resourceName}' not found` },
            { status: 404 }
        );
    }

    // If ID provided, return single item
    if (itemId) {
        const item = apiStore.getItem(apiId, resourceName, itemId);

        if (!item) {
            return NextResponse.json(
                { error: `Item with id '${itemId}' not found` },
                { status: 404 }
            );
        }

        return NextResponse.json(item);
    }

    // Return all items
    return NextResponse.json(data);
}

// POST /api/mock/[apiId]/[...path]
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ apiId: string; path: string[] }> }
) {
    const { apiId, path } = await params;

    const api = apiStore.getAPI(apiId);
    if (!api) {
        return NextResponse.json(
            { error: 'API not found' },
            { status: 404 }
        );
    }

    if (!path || path.length === 0) {
        return NextResponse.json(
            { error: 'Resource name required' },
            { status: 400 }
        );
    }

    const resourceName = path[0];
    const body = await request.json();

    const newItem = apiStore.createItem(apiId, resourceName, body);

    if (!newItem) {
        return NextResponse.json(
            { error: `Resource '${resourceName}' not found` },
            { status: 404 }
        );
    }

    return NextResponse.json(newItem, { status: 201 });
}

// PUT /api/mock/[apiId]/[...path]
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ apiId: string; path: string[] }> }
) {
    const { apiId, path } = await params;

    const api = apiStore.getAPI(apiId);
    if (!api) {
        return NextResponse.json(
            { error: 'API not found' },
            { status: 404 }
        );
    }

    if (!path || path.length < 2) {
        return NextResponse.json(
            { error: 'Resource name and ID required' },
            { status: 400 }
        );
    }

    const resourceName = path[0];
    const itemId = path[1];
    const body = await request.json();

    const updatedItem = apiStore.updateItem(apiId, resourceName, itemId, body);

    if (!updatedItem) {
        return NextResponse.json(
            { error: `Item with id '${itemId}' not found` },
            { status: 404 }
        );
    }

    return NextResponse.json(updatedItem);
}

// DELETE /api/mock/[apiId]/[...path]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ apiId: string; path: string[] }> }
) {
    const { apiId, path } = await params;

    const api = apiStore.getAPI(apiId);
    if (!api) {
        return NextResponse.json(
            { error: 'API not found' },
            { status: 404 }
        );
    }

    if (!path || path.length < 2) {
        return NextResponse.json(
            { error: 'Resource name and ID required' },
            { status: 400 }
        );
    }

    const resourceName = path[0];
    const itemId = path[1];

    const deleted = apiStore.deleteItem(apiId, resourceName, itemId);

    if (!deleted) {
        return NextResponse.json(
            { error: `Item with id '${itemId}' not found` },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, message: 'Item deleted' });
}
