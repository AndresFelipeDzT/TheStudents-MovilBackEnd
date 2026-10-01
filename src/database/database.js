import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("TheStudents", "postgres", "1234", {
    port: 5432,
    host: "localhost",
    dialect: "postgres",
});