module.exports = (sequelize, DataTypes) => {
	const Video = sequelize.define(
		'Video',
		{
			title: DataTypes.STRING,
			origin: DataTypes.STRING,
			author: DataTypes.STRING,
			uploadDate: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			url: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isUrl: true
				}
			},
			excerpt: DataTypes.STRING,
			videoCategoryId: DataTypes.INTEGER
		},
		{}
	);
	Video.associate = function(models) {
		Video.belongsTo(models.VideoCategory, {
			foreignKey: 'videoCategoryId',
			onDelete: 'CASCADE'
		});
	};
	return Video;
};
