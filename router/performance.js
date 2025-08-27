import express from "express";
import { PerformanceMetrics, DrugsAdministered, Profile } from "../models/associations.js";

const router = express.Router();

// GET all performance metrics with profiles and drugs
router.get("/", async (req, res) => {
  try {
    const performances = await PerformanceMetrics.findAll({
      include: [
        { model: Profile, as: "profile" },
        { model: DrugsAdministered, as: "drugs_records" },
      ],
    });
    res.json(performances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST new performance record (flexible for different professions)
router.post("/", async (req, res) => {
  try {
    // Only include fields present in req.body
    const data = req.body;

    const performance = await PerformanceMetrics.create(data);
    res.status(201).json(performance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
