const express = require("express");
const videoEndpoints = require("../endpoints/videoEndpoints");
const router = express.Router();

router.route("/title/:id").put(videoEndpoints.updateVideoTitle);
router.route("/origin/:id").put(videoEndpoints.updateVideoOrigin);
router.route("/creationDate/:id").put(videoEndpoints.updateVideoUploadDate);
router.route("/url/:id").put(videoEndpoints.updateVideoUrl);
router
   .route("/videoCategory/:id")
   .put(videoEndpoints.updateVideoVideoCategoryId);
router.route("/excerpt/:id").put(videoEndpoints.updateVideoExcerpt);

router.route("/strInTitle").get(videoEndpoints.getVideosWithStrInTitle);

router.route("/add").post(videoEndpoints.addVideo);
router.route("/delete/:categoryName").delete(videoEndpoints.deleteVideo);

router
   .route("/:id")
   .get(videoEndpoints.getVideoById)
   .put(videoEndpoints.updateVideoTitle);

router.route("/").get(videoEndpoints.getAllVideos);

module.exports = router;
