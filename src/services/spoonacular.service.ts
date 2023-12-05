import { ofetch } from 'ofetch';

export class SpoonacularService {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your API key
        this.baseUrl = 'https://api.spoonacular.com';
    }

    async findRecipesByIngredients(ingredients: string[]): Promise<any> {
        try {
            const response = await ofetch(`${this.baseUrl}/recipes/findByIngredients`, {
                params: {
                    ingredients: ingredients.join(','),
                    apiKey: this.apiKey
                }
            });
            return response.json();
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }

    async getRecipeDetails(recipeId: number): Promise<any> {
        try {
            const response = await ofetch(`${this.baseUrl}/recipes/${recipeId}/information`, {
                params: {
                    apiKey: this.apiKey
                }
            });
            return response.json();
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }

    // Add more methods as needed for other Spoonacular API functionalities
}
