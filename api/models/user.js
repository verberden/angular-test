module.exports = ({ dbs: { mainDb: mainDb, Sequelize } }) => {
  const User = mainDb.define(
    'User',
    {
      login: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: false,
    },
  );

  return User;
};
