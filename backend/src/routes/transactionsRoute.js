import express from "express";
import { createTransaction, deleteTransactions, getSummaryByUserId, getTransactionsByUserId } from "../controllers/transactionsController.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/:userId", getTransactionsByUserId);
router.delete("/:id", deleteTransactions);
router.get("/summary/:userId", getSummaryByUserId);

export default router;
