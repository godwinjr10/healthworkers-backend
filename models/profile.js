import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Profile = sequelize.define(
  "profiles",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    nationalId: { type: DataTypes.STRING, allowNull: false },
    profession: { type: DataTypes.STRING, allowNull: false },
    licenseNumber: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING },
    qualifications: { type: DataTypes.TEXT, allowNull: false },
    yearsExperience: { type: DataTypes.INTEGER, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    district: { type: DataTypes.STRING, allowNull: false },
    facility: { type: DataTypes.STRING, allowNull: false },
    declaration: { type: DataTypes.BOOLEAN, allowNull: false },
    consent: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    tableName: "profiles",
    timestamps: false, // Sequelize won't manage timestamps
  }
);

export default Profile;
