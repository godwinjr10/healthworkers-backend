import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const PerformanceMetrics = sequelize.define(
  "performance_metrics",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    workerId: { type: DataTypes.INTEGER, allowNull: false },
    profession: { type: DataTypes.STRING, allowNull: false },
    reportPeriod: { type: DataTypes.STRING, allowNull: false },
    patientsSeen: { type: DataTypes.INTEGER, allowNull: false },
    diagnosesMade: { type: DataTypes.INTEGER, allowNull: false },
    prescriptionsMade: { type: DataTypes.INTEGER, allowNull: false },
    admissionsMade: { type: DataTypes.INTEGER, allowNull: false },
    dischargesDone: { type: DataTypes.INTEGER, allowNull: false },
    // Optional fields for other professions
    admissionsReceived: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    criticalPatients: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    drugsAdministered: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    patientEducationDone: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    vaccinesAdministered: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    pregnantWomenAttended: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    liveBabiesDelivered: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    totalBabiesDelivered: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }
  },
  {
    tableName: "performance_metrics",
    timestamps: false, // timestamps handled by DB triggers
  }
);

export default PerformanceMetrics;
