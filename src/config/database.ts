import { Sequelize } from 'sequelize';
import config from './index';

const sequelize = new Sequelize(config.database_url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
