import { sql } from "../config/db.js";

export const createTransaction = async (req, res) => {
  try {
    const { amount, title, category, user_id } = req.body;

    if (amount === undefined || !title || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await sql`INSERT INTO transactions(
    user_id, amount, title, category)
    VALUES(${user_id}, ${amount}, ${title}, ${category})
    RETURNING *
    `;
    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactionsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC`;

    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error getting the transactions", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
