// 'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Videos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			origin: {
				type: Sequelize.STRING
			},
			author: {
				type: Sequelize.STRING
			},
			uploadDate: {
				type: Sequelize.DATE
			},
			url: {
				type: Sequelize.STRING,
				unique: true,
				validate: {
					isUrl: true
				}
			},
			excerpt: {
				type: Sequelize.TEXT
			},
			videoCategoryId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'VideoCategories',
					key: 'id',
					as: 'videoCategoryId'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Videos');
	}
};
