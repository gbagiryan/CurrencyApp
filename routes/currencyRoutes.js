import express from "express";
import currencyController from "../controllers/currencyController.js";

const router = express.Router();

router.get('/', currencyController.getCurrencyRates);

export default router;