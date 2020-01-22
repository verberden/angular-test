const crypto = require('crypto');

module.exports = ({ dbs: { mainDb: mainDb, Sequelize } }) => {
  const File = mainDb.define(
    'File',
    {
      user_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      data: Sequelize.STRING,
      mime_type: Sequelize.STRING,
      hash: Sequelize.STRING,
    },
    {
      tableName: 'files',
      createdAt: 'created_at',
      updatedAt: false,
    },
  );
  File.makeHash = function makeHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }
  return File;
};