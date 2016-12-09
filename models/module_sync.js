/**!
 * cnpmjs.org - models/module.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

/*
CREATE TABLE IF NOT EXISTS `module_sync` (
  `id` INTEGER NOT NULL auto_increment ,
  `name` VARCHAR(100) NOT NULL,
  `finished` INTEGER UNSIGNED NOT NULL DEFAULT 0,
  `last_sync_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
)
COMMENT 'module sync info' ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE UNIQUE INDEX `name` ON `module_sync` (`name`);
*/

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ModuleSync', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'module name'
    },
    finished: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'sync has finished'
    },
    last_sync_time: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
    }
  }, {
    tableName: 'module_sync',
    comment: 'module sync info',
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
    classMethods: {
      getModuleSyncStatus: function* (name) {
        return yield this.find({
          where: { name: name }
        });
      }
    }
  });
};
