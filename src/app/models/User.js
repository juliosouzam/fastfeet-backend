import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init() {
    super.init({
      name: Sequelize.STRING,
    });

    return this;
  }
}

export default User;
