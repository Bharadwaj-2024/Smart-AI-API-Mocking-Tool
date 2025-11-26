import { faker } from '@faker-js/faker';

export interface MockDataConfig {
    resourceName: string;
    count?: number;
}

export function generateMockData(resourceName: string, count: number = 15): any[] {
    const items: any[] = [];

    for (let i = 0; i < count; i++) {
        items.push(generateResourceItem(resourceName, i));
    }

    return items;
}

function generateResourceItem(resourceName: string, index: number): any {
    const lowerResource = resourceName.toLowerCase();

    // Products
    if (lowerResource.includes('product')) {
        return {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
            category: faker.commerce.department(),
            inStock: faker.datatype.boolean(),
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            imageUrl: faker.image.url(),
            createdAt: faker.date.recent({ days: 30 }).toISOString()
        };
    }

    // Users
    if (lowerResource.includes('user')) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return {
            id: faker.string.uuid(),
            username: faker.internet.username({ firstName, lastName }),
            email: faker.internet.email({ firstName, lastName }),
            name: `${firstName} ${lastName}`,
            avatar: faker.image.avatar(),
            bio: faker.person.bio(),
            location: faker.location.city(),
            joinedAt: faker.date.past({ years: 2 }).toISOString()
        };
    }

    // Restaurants
    if (lowerResource.includes('restaurant')) {
        const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'Thai', 'American', 'French', 'Mediterranean'];
        const suffixes = ['Kitchen', 'Bistro', 'Grill', 'Cafe', 'House', 'Palace', 'Corner', 'Express'];
        return {
            id: faker.string.uuid(),
            name: `${faker.company.name()} ${faker.helpers.arrayElement(suffixes)}`,
            cuisine: faker.helpers.arrayElement(cuisines),
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
            deliveryTime: `${faker.number.int({ min: 20, max: 50 })}-${faker.number.int({ min: 30, max: 60 })} min`,
            minimumOrder: faker.number.int({ min: 10, max: 30 }),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            imageUrl: faker.image.url(),
            isOpen: faker.datatype.boolean()
        };
    }

    // Menu items
    if (lowerResource.includes('menu')) {
        const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Sides'];
        return {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            price: parseFloat(faker.commerce.price({ min: 5, max: 30 })),
            category: faker.helpers.arrayElement(categories),
            isVegetarian: faker.datatype.boolean(),
            isSpicy: faker.datatype.boolean(),
            imageUrl: faker.image.url(),
            calories: faker.number.int({ min: 200, max: 1200 })
        };
    }

    // Orders
    if (lowerResource.includes('order')) {
        const statuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
        return {
            id: faker.string.uuid(),
            orderNumber: `ORD-${faker.number.int({ min: 10000, max: 99999 })}`,
            userId: faker.string.uuid(),
            total: parseFloat(faker.commerce.price({ min: 20, max: 150 })),
            status: faker.helpers.arrayElement(statuses),
            items: faker.number.int({ min: 1, max: 5 }),
            deliveryAddress: faker.location.streetAddress(),
            createdAt: faker.date.recent({ days: 7 }).toISOString(),
            estimatedDelivery: faker.date.soon({ days: 1 }).toISOString()
        };
    }

    // Posts
    if (lowerResource.includes('post')) {
        return {
            id: faker.string.uuid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(2),
            authorId: faker.string.uuid(),
            authorName: faker.person.fullName(),
            likes: faker.number.int({ min: 0, max: 1000 }),
            comments: faker.number.int({ min: 0, max: 100 }),
            imageUrl: faker.image.url(),
            createdAt: faker.date.recent({ days: 30 }).toISOString()
        };
    }

    // Comments
    if (lowerResource.includes('comment')) {
        return {
            id: faker.string.uuid(),
            postId: faker.string.uuid(),
            userId: faker.string.uuid(),
            userName: faker.person.fullName(),
            content: faker.lorem.paragraph(),
            likes: faker.number.int({ min: 0, max: 50 }),
            createdAt: faker.date.recent({ days: 7 }).toISOString()
        };
    }

    // Generic fallback
    return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        value: faker.number.int({ min: 1, max: 100 }),
        status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
        createdAt: faker.date.recent({ days: 30 }).toISOString()
    };
}

// Generate data for all resources in an API
export function generateAllMockData(resources: { name: string }[]): Record<string, any[]> {
    const data: Record<string, any[]> = {};

    for (const resource of resources) {
        data[resource.name] = generateMockData(resource.name);
    }

    return data;
}
