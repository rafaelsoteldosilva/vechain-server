const express = require("express");
const videoCategoryEndpoints = require("../endpoints/videoCategoryEndpoints");
const router = express.Router();

router.route("/add").post(videoCategoryEndpoints.addVideoCategory);

router
   .route("/name/:oldName")
   .put(videoCategoryEndpoints.updateVideoCategoryName);

router
   .route("/videos")
   .get(videoCategoryEndpoints.getAllVideoCategoriesIncludingVideos);

router
   .route("/noVideos")
   .get(videoCategoryEndpoints.getAllVideoCategoriesWithoutTheirVideos);

router
   .route("/del/:categoryName")
   .delete(videoCategoryEndpoints.deleteVideoCategory);

router
   .route("/hasVideos/:categoryName")
   .get(videoCategoryEndpoints.consultIfCategoryHasVideos);

router
   .route("/up/:categoryName")
   .put(videoCategoryEndpoints.moveVideoCategoryUpOneLevel);

router
   .route("/down/:categoryName")
   .put(videoCategoryEndpoints.moveVideoCategoryDownOneLevel);

module.exports = router;
