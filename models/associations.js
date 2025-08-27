import Profile from "./profile.js";
import PerformanceMetrics from "./performance_metrics.js";
import DrugsAdministered from "./drugs_administered.js";

// Profile -> PerformanceMetrics
Profile.hasMany(PerformanceMetrics, { foreignKey: "workerId", as: "performance_records" });
PerformanceMetrics.belongsTo(Profile, { foreignKey: "workerId", as: "profile" });

// PerformanceMetrics -> DrugsAdministered
PerformanceMetrics.hasMany(DrugsAdministered, { foreignKey: "performanceid", as: "drugs_records" });
DrugsAdministered.belongsTo(PerformanceMetrics, { foreignKey: "performanceid", as: "performance" });

export { Profile, PerformanceMetrics, DrugsAdministered };
