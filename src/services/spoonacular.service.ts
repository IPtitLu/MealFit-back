import { Console } from 'console';
import { ofetch } from 'ofetch';
import { RecipeQueryFilter } from '../types';
import { CacheService } from './cache.service.js';

class SpoonacularService {
    protected apiKey: string;
    protected baseUrl: string;
    protected client: any;
    private cacheService: CacheService;
    constructor() {
        this.apiKey = process.env.API_KEY; // Replace with your API key
        this.baseUrl = process.env.API_HOST;
        this.cacheService = new CacheService();
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
            const cacheKey = `findRecipesByIngredients:${ingredients}`;
            const cachedResponse = await this.cacheService.getFromCache(cacheKey);
            if (cachedResponse) {
                return JSON.parse(cachedResponse);
            }
            const response = await this.client(`/recipes/findByIngredients`, {
                query: {
                    ingredients: ingredients.join(','),
                    number: 6,
                    ignorePantry: 'true',
                    ranking: '1'
                },
            });
            this.cacheService.saveToCache(cacheKey, JSON.stringify(response));
            return response;
        } catch (error) {
            console.error(error)
            // Handle errors appropriately
            throw error;
        }
    }

    async getRecipeDetails(recipeId: number): Promise<any> {
        try {
            const cacheKey = `getRecipeDetails:${recipeId}`;
            const cachedResponse = await this.cacheService.getFromCache(cacheKey);
            if (cachedResponse) {
                return JSON.parse(cachedResponse);
            }
            const response = await this.client(`/recipes/${recipeId}/information`, {
            });
            this.cacheService.saveToCache(cacheKey, JSON.stringify(response));
            return response;
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }

    async findIngredientsByName(ingredientName: string): Promise<any> {
        try {
            const cacheKey = `findIngredientsByName:${ingredientName}`;
            const cachedResponse = await this.cacheService.getFromCache(cacheKey);
            if (cachedResponse) {
                return JSON.parse(cachedResponse);
            }

            const response = await this.client(`/food/ingredients/autocomplete`, {
                params: {
                    query: ingredientName,

                }
            });

            this.cacheService.saveToCache(cacheKey, JSON.stringify(response));
            return response;
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }

    async findRecipesByQuery(filter: RecipeQueryFilter): Promise<any> {
        try {
            const cacheKey = `findRecipesByQuery:${JSON.stringify(filter)}`;
            const cachedResponse = await this.cacheService.getFromCache(cacheKey);
            if (cachedResponse) {
                return JSON.parse(cachedResponse);
            }
            const response = await this.client(`/recipes/complexSearch`, {
                params: {
                    ...filter,
                }
            });
            this.cacheService.saveToCache(cacheKey, JSON.stringify(response));
            return response;
        } catch (error) {
            // Handle errors appropriately
            throw error;
        }
    }
}


export default SpoonacularService;