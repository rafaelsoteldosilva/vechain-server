const { VideoCategory, Video } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAllVideos = async (req, res) => {
	try {
		const videos = await Video.findAll();
		if (!videos) return res.status(401).send('There are no videos');
		else return res.status(200).json({ videos });
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const getVideoById = async (req, res) => {
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(500).send('Please, specify a video id');
	try {
		const video = await Video.findOne({
			where: { id: videoId }
		});
		if (!video) return res.status(401).send(`the video ${videoId} doesn't exist`);
		else {
			return res.status(200).json({ video });
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const getVideoId = async (req, res) => {};

const checkReceivedData = (title, origin, author, uploadDate, url, videoCategoryId, excerpt) => {
	let message = '';
	let regExpressionForUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	if (title.length === 0) message = 'a video must have a title';
	else if (origin.length === 0) message = 'a video must have an origin';
	else if (author.length === 0) message = 'a video must have an author';
	else if (url.length === 0) message = 'a video must have a url';
	else if (typeof videoCategoryId === 'undefined') message = 'a video must have a video category';
	/* else if (excerpt.length === 0) message = 'a video must have an excerpt'; */

	return message;
};

const addVideo = async (req, res) => {
	let { title, origin, author, uploadDate, url, videoCategoryId, excerpt } = req.body;
	videoCategoryId = parseInt(videoCategoryId);
	// let videoObj = {
	// 	title,
	// 	origin,
	// 	author,
	// 	uploadDate
	// };
	// console.log(JSON.stringify(videoObj, null, 4));
	// if (isNaN(videoId)) return res.status(500).send('Please, specify a video id');
	let msg = checkReceivedData(title, origin, author, uploadDate, url, videoCategoryId, excerpt);

	if (msg.length !== 0) {
		return res.status(501).send(msg);
	} else {
		let newVideo = { title, origin, author, url, videoCategoryId, excerpt };
		// let video = await Video.findOne({ where: { url: newVideo.url } });
		let video = await Video.findOne({ where: { url: newVideo.url } });
		if (!video) {
			newVideo.uploadDate = uploadDate;
			video = await Video.create({ ...newVideo });
			if (video) return res.status(200).send('Video successfully created');
			else return res.status(501).send('Video not created');
		} else {
			return res.status(501).send(`video ${url} already exists`);
		}
	}
};

const deleteVideo = async (req, res) => {
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			await video.destroy();
			return res.status(200).send('Video successfully destroyed');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideoTitle = async (req, res) => {
	const { title } = req.body;
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			video.title = title;
			await video.save();
			return res.status(200).send('Video title successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideoOrigin = async (req, res) => {
	const { origin } = req.body;
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			video.origin = origin;
			await video.save();
			return res.status(200).send('Video origin successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideoUploadDate = async (req, res) => {
	const { uploadDate } = req.body;
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			video.uploadDate = uploadDate;
			await video.save();
			return res.status(200).send('Video uploadDate successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideoUrl = async (req, res) => {
	const { url } = req.body;
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			video.url = url;
			await video.save();
			return res.status(200).send('Video url successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideoVideoCategoryId = async (req, res) => {
	const { videoCategoryId } = req.body;
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			video.videoCategoryId = videoCategoryId;
			await video.save();
			return res.status(200).send('Video videoCategoryId successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideoExcerpt = async (req, res) => {
	const { excerpt } = req.body;
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			video.excerpt = excerpt;
			await video.save();
			return res.status(200).send('Video excerpt successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const updateVideo = async (req, res) => {
	const { title, origin, author, uploadDate, url, videoCategoryId, excerpt } = req.body;
	let newVideoObj = {
		title,
		origin,
		author,
		uploadDate,
		url,
		videoCategoryId,
		excerpt
	};
	const videoId = parseInt(req.params.id);
	if (isNaN(videoId)) return res.status(501).send('Please, specify a video id');
	else {
		const video = await Video.findOne({ where: { id: videoId } });
		if (video) {
			Object.entries(newVideoObj).forEach((entry) => {
				const [ key, value ] = entry;
				video[`${key}`] = value;
			});
			await video.save();
			return res.status(200).send('Video successfully updated');
		} else return res.status(501).send(`Video ${videoId} doesn't exist`);
	}
};

const getVideosWithStrInTitle = async (req, res) => {
	const str = req.query.str;

	if (!str) {
		res.status(501).send('The lookup substring was not specified');
	} else {
		const videos = await Video.findAll({
			where: {
				title: {
					[Op.like]: `%${str}%`
				}
			}
		});
		if (!videos) return res.status(401).send(`There are no videos that include ${str} in it's title`);
		else return res.status(200).json({ videos });
	}
};

module.exports = {
	getAllVideos,
	getVideoById,
	addVideo,
	deleteVideo,
	updateVideoTitle,
	updateVideoOrigin,
	updateVideoUploadDate,
	updateVideoUrl,
	updateVideoVideoCategoryId,
	updateVideoExcerpt,
	getVideosWithStrInTitle
};
