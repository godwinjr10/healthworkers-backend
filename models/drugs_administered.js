import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const DrugsAdministered = sequelize.define(
  "drugs_administered",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    performanceid: { type: DataTypes.INTEGER, allowNull: false }, // FK to performance_metrics.id
    drugname: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    unit: { type: DataTypes.STRING(20), allowNull: false },
    createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "drugs_administered",
    timestamps: false,
  }
);

export default DrugsAdministered;
