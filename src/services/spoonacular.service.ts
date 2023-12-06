import { Console } from 'console';
import { ofetch } from 'ofetch';

class SpoonacularService {
    protected apiKey: string;
    protected baseUrl: string;
    protected client: any;
    constructor() {
        this.apiKey = process.env.API_KEY; // Replace with your API key
        this.baseUrl = process.env.API_HOST;
        this.client = ofetch.create({
            baseURL: this.baseUrl,
            query: {
                apiKey: this.apiKey,
            },
            headers: {
                Accept: "application/json",
            }

        });
    }

    async findRecipesByIngredients(ingredients: string[]): Promise<any> {

        try {
            const response = await this.client(`/recipes/findByIngredients`, {
                query: {
                    ingredients: ingredients.join(','),
                    number: 6,
                    ignorePantry: 'true',
                    ranking: '1'
                },
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': this.baseUrl
                }
            });
            console.log(response)
            return response;
        } catch (error) {
            console.error(error)
            // Handle errors appropriately
            throw error;
        }
    }

    async getRecipeDetails(recipeId: number): Promise<any> {
        try {
            const response = await this.client(`/recipes/${recipeId}/information`, {
            });
            return response.json();
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }

    async findIngredientsByName(ingredientName: string): Promise<any> {
        try {
            const response = await this.client(`/food/ingredients/autocomplete`, {
                params: {
                    query: ingredientName,

                }
            });
            return response.json();
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }
}


export default SpoonacularService;