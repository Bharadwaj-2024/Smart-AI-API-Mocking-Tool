import { nanoid } from 'nanoid';
import type { GeneratedAPI, APIResource } from '../ai/gemini';

export interface MockAPI {
    id: string;
    name: string;
    description: string;
    resources: APIResource[];
    data: Record<string, any[]>;
    createdAt: Date;
}

export interface FlatEndpoint {
    method: string;
    path: string;
    description: string;
    resourceName: string;
}

class APIStore {
    private apis: Map<string, MockAPI> = new Map();

    createAPI(apiStructure: GeneratedAPI, mockData: Record<string, any[]>): string {
        const apiId = nanoid(10);

        const api: MockAPI = {
            id: apiId,
            name: apiStructure.apiName,
            description: apiStructure.description,
            resources: apiStructure.resources,
            data: mockData,
            createdAt: new Date()
        };

        this.apis.set(apiId, api);
        console.log(`Created API: ${apiId} with ${Object.keys(mockData).length} resources`);
        return apiId;
    }

    getAPI(apiId: string): MockAPI | undefined {
        return this.apis.get(apiId);
    }

    getData(apiId: string, resourceName: string): any[] | undefined {
        const api = this.apis.get(apiId);
        return api?.data[resourceName];
    }

    getItem(apiId: string, resourceName: string, itemId: string): any | undefined {
        const data = this.getData(apiId, resourceName);
        return data?.find(item => item.id === itemId);
    }

    createItem(apiId: string, resourceName: string, item: any): any {
        const api = this.apis.get(apiId);
        if (!api || !api.data[resourceName]) {
            return null;
        }

        const newItem = { id: nanoid(10), ...item, createdAt: new Date().toISOString() };
        api.data[resourceName].push(newItem);
        return newItem;
    }

    updateItem(apiId: string, resourceName: string, itemId: string, updates: any): any | undefined {
        const api = this.apis.get(apiId);
        if (!api || !api.data[resourceName]) {
            return undefined;
        }

        const index = api.data[resourceName].findIndex(item => item.id === itemId);
        if (index === -1) {
            return undefined;
        }

        api.data[resourceName][index] = { ...api.data[resourceName][index], ...updates };
        return api.data[resourceName][index];
    }

    deleteItem(apiId: string, resourceName: string, itemId: string): boolean {
        const api = this.apis.get(apiId);
        if (!api || !api.data[resourceName]) {
            return false;
        }

        const index = api.data[resourceName].findIndex(item => item.id === itemId);
        if (index === -1) {
            return false;
        }

        api.data[resourceName].splice(index, 1);
        return true;
    }

    getFlatEndpoints(apiId: string): FlatEndpoint[] {
        const api = this.apis.get(apiId);
        if (!api) {
            return [];
        }

        const endpoints: FlatEndpoint[] = [];
        for (const resource of api.resources) {
            for (const endpoint of resource.endpoints) {
                endpoints.push({
                    ...endpoint,
                    resourceName: resource.name
                });
            }
        }

        return endpoints;
    }
}

// Singleton instance with global caching for development mode
// This prevents the store from being reset on hot module replacement
const globalForApiStore = globalThis as unknown as {
    apiStore: APIStore | undefined;
};

export const apiStore = globalForApiStore.apiStore ?? new APIStore();

if (process.env.NODE_ENV !== 'production') {
    globalForApiStore.apiStore = apiStore;
}
