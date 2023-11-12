import express from 'express';
import productsRoutes from './productsRoutes.js';

const app = express();
const port = 3002;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(productsRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.post('/', (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(201).json({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
