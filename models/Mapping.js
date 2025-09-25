const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mapping = sequelize.define('Mapping', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

module.exports = Mapping;