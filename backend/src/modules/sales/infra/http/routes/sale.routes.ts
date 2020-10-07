import { Router } from 'express';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';


const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.get('/');

saleRoutes.post('/');

saleRoutes.get('/:id');

saleRoutes.put('/:id');
