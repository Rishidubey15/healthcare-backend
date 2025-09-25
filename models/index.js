const sequelize = require('../config/db');
const User = require('./User');
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Mapping = require('./Mapping');

User.hasMany(Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'userId' });


Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: 'patientId' });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: 'doctorId' });

const db = {
  sequelize,
  User,
  Patient,
  Doctor,
  Mapping,
};

module.exports = db;