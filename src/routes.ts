import { Router } from "express";
import type { Request, Response } from "express";


const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.json({
    message: "Bonjour le mondedd avec Express et TypeScript!"
  });
});



export { router };