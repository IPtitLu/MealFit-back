import express, { Request, Response } from 'express';

const app: express.Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour le monde avec Express et TypeScript!');
});

const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
