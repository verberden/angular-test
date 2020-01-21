module.exports = ({ dbs: { mainDb: mainDb, Sequelize } }) => {
  const File = mainDb.define(
    'File',
    {
      user_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      data: Sequelize.STRING,
      mime_type: Sequelize.STRING,
    },
    {
      tableName: 'files',
      createdAt: 'created_at',
      updatedAt: false,
    },
  );

  return File;
};