module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'VideoCategories',
			[
				{
					name: 'Videos',
					viewOrder: '1',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'News',
					viewOrder: '2',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Definitions',
					viewOrder: '3',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Predictions',
					viewOrder: '4',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Films',
					viewOrder: '5',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Classes',
					viewOrder: '6',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('VideoCategories', null, {});
	}
};
