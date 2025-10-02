import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  planned: { type: Number, default: 0 },
  actual: { type: Number, default: 0 },
});

const BudgetSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // store session.user.id
  month: { type: String, required: true }, // "2025-09" format
  categories: { type: [CategorySchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
