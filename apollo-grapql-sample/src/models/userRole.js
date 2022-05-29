module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
    }, {
      timestamps: true,
      freezeTableName: false,
    });

    UserRole.associate = function (models) {
        UserRole.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            as: 'User'
        });
        UserRole.belongsTo(models.Role, {
            foreignKey: {
                name: 'roleId',
                allowNull: false
            },
            as: 'Role'
        });
    };
    return UserRole;
  };
