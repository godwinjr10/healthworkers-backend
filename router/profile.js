import express from "express";
import { Profile, PerformanceMetrics } from "../models/associations.js";

const router = express.Router();

// GET all profiles with performance records
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [{ model: PerformanceMetrics, as: "performance_records" }],
    });
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET profile by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: [{ model: PerformanceMetrics, as: "performance_records" }],
    });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST new profile
router.post("/", async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update profile
router.put("/:id", async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    await profile.update(req.body);
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE profile
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Profile.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
