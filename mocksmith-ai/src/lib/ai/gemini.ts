import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface APIEndpoint {
  method: string;
  path: string;
  description: string;
  responseSchema: any;
}

export interface APIResource {
  name: string;
  endpoints: APIEndpoint[];
}

export interface GeneratedAPI {
  apiName: string;
  description: string;
  resources: APIResource[];
}

const GENERATION_PROMPT = `You are an API design expert. Generate a complete REST API structure based on the user's description.

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "apiName": "string",
  "description": "string",
  "resources": [
    {
      "name": "string (singular, lowercase)",
      "endpoints": [
        {
          "method": "GET|POST|PUT|DELETE",
          "path": "/resource or /resource/:id",
          "description": "string",
          "responseSchema": {
            "type": "object or array",
            "properties": {
              "fieldName": "string|number|boolean"
            }
          }
        }
      ]
    }
  ]
}

Rules:
- Create 3-5 resources
- Each resource should have 3-5 endpoints (GET all, GET one, POST, PUT, DELETE)
- Use realistic field names based on the domain
- Include 5-10 fields per resource
- Make paths RESTful (e.g., /users, /users/:id)
- Response schema should match the domain context

User description: `;

export async function generateAPIStructure(description: string): Promise<GeneratedAPI> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });
    
    const result = await model.generateContent(GENERATION_PROMPT + description);
    const text = result.response.text();
    
    // Try to extract JSON from markdown code blocks
    let jsonText = text.trim();
    const jsonMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    const parsed = JSON.parse(jsonText);
    return parsed as GeneratedAPI;
  } catch (error) {
    console.error('AI generation failed:', error);
    // Fallback to template-based generation
    return generateTemplateAPI(description);
  }
}

// Fallback template generator
function generateTemplateAPI(description: string): GeneratedAPI {
  const lowerDesc = description.toLowerCase();
  
  // Detect common patterns
  if (lowerDesc.includes('ecommerce') || lowerDesc.includes('e-commerce') || lowerDesc.includes('shop')) {
    return getEcommerceTemplate();
  } else if (lowerDesc.includes('social') || lowerDesc.includes('media')) {
    return getSocialMediaTemplate();
  } else if (lowerDesc.includes('food') || lowerDesc.includes('restaurant') || lowerDesc.includes('delivery')) {
    return getFoodDeliveryTemplate();
  }
  
  // Generic template
  return getGenericTemplate(description);
}

function getEcommerceTemplate(): GeneratedAPI {
  return {
    apiName: "E-Commerce API",
    description: "Complete e-commerce platform API",
    resources: [
      {
        name: "products",
        endpoints: [
          { method: "GET", path: "/products", description: "Get all products", responseSchema: { type: "array" } },
          { method: "GET", path: "/products/:id", description: "Get product by ID", responseSchema: { type: "object" } },
          { method: "POST", path: "/products", description: "Create product", responseSchema: { type: "object" } },
          { method: "PUT", path: "/products/:id", description: "Update product", responseSchema: { type: "object" } },
          { method: "DELETE", path: "/products/:id", description: "Delete product", responseSchema: { type: "object" } }
        ]
      },
      {
        name: "users",
        endpoints: [
          { method: "GET", path: "/users", description: "Get all users", responseSchema: { type: "array" } },
          { method: "GET", path: "/users/:id", description: "Get user by ID", responseSchema: { type: "object" } },
          { method: "POST", path: "/users", description: "Create user", responseSchema: { type: "object" } },
          { method: "PUT", path: "/users/:id", description: "Update user", responseSchema: { type: "object" } }
        ]
      },
      {
        name: "orders",
        endpoints: [
          { method: "GET", path: "/orders", description: "Get all orders", responseSchema: { type: "array" } },
          { method: "GET", path: "/orders/:id", description: "Get order by ID", responseSchema: { type: "object" } },
          { method: "POST", path: "/orders", description: "Create order", responseSchema: { type: "object" } },
          { method: "PUT", path: "/orders/:id", description: "Update order status", responseSchema: { type: "object" } }
        ]
      }
    ]
  };
}

function getSocialMediaTemplate(): GeneratedAPI {
  return {
    apiName: "Social Media API",
    description: "Social networking platform API",
    resources: [
      {
        name: "users",
        endpoints: [
          { method: "GET", path: "/users", description: "Get all users", responseSchema: { type: "array" } },
          { method: "GET", path: "/users/:id", description: "Get user profile", responseSchema: { type: "object" } },
          { method: "POST", path: "/users", description: "Create user", responseSchema: { type: "object" } },
          { method: "PUT", path: "/users/:id", description: "Update profile", responseSchema: { type: "object" } }
        ]
      },
      {
        name: "posts",
        endpoints: [
          { method: "GET", path: "/posts", description: "Get all posts", responseSchema: { type: "array" } },
          { method: "GET", path: "/posts/:id", description: "Get post by ID", responseSchema: { type: "object" } },
          { method: "POST", path: "/posts", description: "Create post", responseSchema: { type: "object" } },
          { method: "DELETE", path: "/posts/:id", description: "Delete post", responseSchema: { type: "object" } }
        ]
      },
      {
        name: "comments",
        endpoints: [
          { method: "GET", path: "/comments", description: "Get all comments", responseSchema: { type: "array" } },
          { method: "POST", path: "/comments", description: "Create comment", responseSchema: { type: "object" } },
          { method: "DELETE", path: "/comments/:id", description: "Delete comment", responseSchema: { type: "object" } }
        ]
      }
    ]
  };
}

function getFoodDeliveryTemplate(): GeneratedAPI {
  return {
    apiName: "Food Delivery API",
    description: "Food delivery platform API",
    resources: [
      {
        name: "restaurants",
        endpoints: [
          { method: "GET", path: "/restaurants", description: "Get all restaurants", responseSchema: { type: "array" } },
          { method: "GET", path: "/restaurants/:id", description: "Get restaurant details", responseSchema: { type: "object" } },
          { method: "POST", path: "/restaurants", description: "Add restaurant", responseSchema: { type: "object" } }
        ]
      },
      {
        name: "menus",
        endpoints: [
          { method: "GET", path: "/menus", description: "Get all menu items", responseSchema: { type: "array" } },
          { method: "GET", path: "/menus/:id", description: "Get menu item", responseSchema: { type: "object" } },
          { method: "POST", path: "/menus", description: "Add menu item", responseSchema: { type: "object" } }
        ]
      },
      {
        name: "orders",
        endpoints: [
          { method: "GET", path: "/orders", description: "Get all orders", responseSchema: { type: "array" } },
          { method: "GET", path: "/orders/:id", description: "Get order details", responseSchema: { type: "object" } },
          { method: "POST", path: "/orders", description: "Place order", responseSchema: { type: "object" } },
          { method: "PUT", path: "/orders/:id", description: "Update order status", responseSchema: { type: "object" } }
        ]
      }
    ]
  };
}

function getGenericTemplate(description: string): GeneratedAPI {
  return {
    apiName: "Custom API",
    description: description,
    resources: [
      {
        name: "items",
        endpoints: [
          { method: "GET", path: "/items", description: "Get all items", responseSchema: { type: "array" } },
          { method: "GET", path: "/items/:id", description: "Get item by ID", responseSchema: { type: "object" } },
          { method: "POST", path: "/items", description: "Create item", responseSchema: { type: "object" } },
          { method: "PUT", path: "/items/:id", description: "Update item", responseSchema: { type: "object" } },
          { method: "DELETE", path: "/items/:id", description: "Delete item", responseSchema: { type: "object" } }
        ]
      }
    ]
  };
}
