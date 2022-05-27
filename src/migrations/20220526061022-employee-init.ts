"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";
import DEPARTMENT from "../models/department";

module.exports = {
  async up(migration: QueryInterface, Sequelize: Sequelize) {
    return migration.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: { type: DataTypes.STRING },
      salary: { type: DataTypes.INTEGER },
      department: { type: DataTypes.ENUM(DEPARTMENT.HR, DEPARTMENT.PS) },
    });
  },

  async down(migration: QueryInterface, Sequelize: Sequelize) {
    return migration.dropTable("employees");
  },
};
