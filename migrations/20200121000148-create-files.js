module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('files', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    mime_type: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    hash: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    data: {
      allowNull: false,
      type: Sequelize.BLOB('long'),
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('files'),
};
