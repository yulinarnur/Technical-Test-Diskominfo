import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import ProductRoutes from './routes/ProductRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v3/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(ProductRoutes);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
