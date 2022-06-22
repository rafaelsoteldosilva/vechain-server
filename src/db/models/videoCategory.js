module.exports = (sequelize, DataTypes) => {
	const VideoCategory = sequelize.define(
		'VideoCategory',
		{
			name: DataTypes.STRING,
			viewOrder: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{}
	);
	VideoCategory.associate = function(models) {
		VideoCategory.hasMany(models.Video, {
			foreignKey: 'videoCategoryId'
		});
	};
	return VideoCategory;
};
