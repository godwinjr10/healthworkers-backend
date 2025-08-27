import express from "express";
import { DrugsAdministered, PerformanceMetrics } from "../models/associations.js";

const router = express.Router();

// GET all drugs administered
router.get("/", async (req, res) => {
  try {
    const drugs = await DrugsAdministered.findAll({
      include: [{ model: PerformanceMetrics, as: "performance" }],
    });
    res.json(drugs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST new drugs administered
router.post("/", async (req, res) => {
  try {
    const drug = await DrugsAdministered.create(req.body);
    res.status(201).json(drug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
