module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('files', ['user_id'], {
    type: 'foreign key',
    name: 'fk_files_user_id_users_id',
    references: {
      table: 'users',
      field: 'id',
    },
    onUpdate: 'RESTRICT',
    onDelete: 'CASCADE',
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('files', 'fk_files_user_id_users_id'),
};
