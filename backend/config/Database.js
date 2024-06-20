import {Sequelize} from "sequelize";

const db = new Sequelize('users','root','Capstone123',{
    host: "34.50.77.31",
    dialect: "mysql"
});

export default db;