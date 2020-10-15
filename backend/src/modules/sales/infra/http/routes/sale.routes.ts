import { Router } from 'express';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';


const saleRoutes = Router();
const saleController = new SaleController();

saleRoutes.get('/', saleController.index);

saleRoutes.post('/new', saleController.createSaleNew);

saleRoutes.post('/used', saleController.createSaleUsed);

saleRoutes.get('/:id', saleController.show);

export default saleRoutes;
