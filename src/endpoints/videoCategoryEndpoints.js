const { VideoCategory, Video } = require("../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getOnlyVideoCategoriesThatHaveVideosWithoutTheirVideos = async (
   req,
   res
) => {
   try {
      const videoCategories = await VideoCategory.findAll({
         // attributes: [ Sequelize.fn('DISTINCT', Sequelize.col('VideoCategory.name')) ],
         include: [
            {
               model: Video,
               required: true,
            },
         ],
         order: [["viewOrder", "ASC"]],
      });
      return res.status(200).json({ videoCategories });
   } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
   }
};

const getAllVideoCategoriesIncludingVideos = async (req, res) => {
   try {
      const videoCategories = await VideoCategory.findAll({
         include: [{ model: Video }],
         order: [["viewOrder", "ASC"]],
      });
      return res.status(200).json({ videoCategories });
   } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
   }
};

const getAllVideoCategoriesWithoutTheirVideos = async (req, res) => {
   try {
      const videoCategories = await VideoCategory.findAll({
         order: [["viewOrder", "ASC"]],
      });
      return res.status(200).json({ videoCategories });
   } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
   }
};

const checkReceivedData = (videoCategoryName, viewOrder) => {
   if (videoCategoryName.length === 0)
      return "a video category must have a name";
   else if (typeof viewOrder === "undefined")
      return "a category must have a view order";
   else if (isNaN(parseInt(viewOrder))) return "view order is not a number";
   else return "";
};

const getLastViewOrder = async () => {
   const maxValue = await VideoCategory.findAll({
      attributes: [
         [Sequelize.fn("max", Sequelize.col("viewOrder")), "maxViewOrder"],
      ],
      raw: true,
   });
   if (maxValue) return maxValue[0].maxViewOrder;
   else return 0;
};

const addVideoCategory = async (req, res) => {
   const { categoryName } = req.body;
   let newViewOrder = (await getLastViewOrder()) + 1;

   const videoCategory = await VideoCategory.findOne({
      where: { name: categoryName },
   });

   if (!videoCategory) {
      const videoCategory = await VideoCategory.create({
         name: categoryName,
         viewOrder: newViewOrder,
      });
      return res.status(200).send("Video Category successfully updated");
   } else res.status(501).send(`Video Category ${categoryName} already exists`);
};

const consultIfCategoryHasVideos = async (req, res) => {
   const categoryName = req.params.categoryName;

   const videoCategory = await VideoCategory.findOne({
      where: { name: categoryName },
      include: [{ model: Video }],
   });

   if (videoCategory && videoCategory.Videos.length > 0) {
      res.status(200).send("Video Category has related videos");
   } else {
      res.status(501).send(
         `Video Category doesn't exist or doesn't have related videos`
      );
   }
};

const deleteVideoCategory = async (req, res) => {
   const categoryName = req.params.categoryName;

   const videoCategory = await VideoCategory.findOne({
      where: { name: categoryName },
      include: [{ model: Video }],
   });

   if (videoCategory) {
      let currentViewOrder = videoCategory.viewOrder;

      await VideoCategory.update(
         { viewOrder: Sequelize.literal('"VideoCategories"."viewOrder" - 1') },
         { where: { viewOrder: { [Op.gte]: currentViewOrder } } }
      );
      await videoCategory.destroy();
      return res.status(200).send("Video Category successfully deleted");
   } else
      return res
         .status(404)
         .send(`Video Category named "${categoryName}" doesn't exist`);
};

const updateVideoCategoryName = async (req, res) => {
   let oldName = req.params.oldName;
   const { newName } = req.body;
   oldName = oldName.trim();
   newName = newName.trim();

   if (!newName) {
      res.status(501).send("New title was not specified");
   }

   try {
      const videoCategory = await VideoCategory.findOne({
         where: { title: oldName },
      });
      if (videoCategory) {
         videoCategory.name = newName;
         await videoCategory.save();
         return res.status(200).send("Video Category successfully updated");
      } else
         return res
            .status(404)
            .send(`Video Category named ${oldName} doesn't exist`);
   } catch (error) {
      return res.status(500).send(error.message);
   }
};

const moveVideoCategoryUpOneLevel = async (req, res) => {
   let name = req.params.categoryName;

   const videoCategory = await VideoCategory.findOne({ where: { name } });

   if (videoCategory) {
      const oldViewOrder = videoCategory.viewOrder;
      let newViewOrder = oldViewOrder - 1;
      if (!(newViewOrder < oldViewOrder))
         res.status(501).send(
            `${newViewOrder} is not less than ${oldViewOrder}`
         );
      await VideoCategory.update(
         { viewOrder: Sequelize.literal('"VideoCategories"."viewOrder" + 1') },
         {
            where: {
               viewOrder: {
                  [Op.between]: [newViewOrder, oldViewOrder],
               },
            },
         }
      );
      videoCategory.viewOrder = newViewOrder;
      await videoCategory.save();
      return res
         .status(200)
         .send(
            `Video Category successfully moved up to viewOrder ${newViewOrder}`
         );
   } else res.status(501).send(`Video Category ${name} doesn't exist`);
};

const moveVideoCategoryDownOneLevel = async (req, res) => {
   let name = req.params.categoryName;

   const videoCategory = await VideoCategory.findOne({ where: { name } });

   if (videoCategory) {
      const oldViewOrder = videoCategory.viewOrder;
      let newViewOrder = oldViewOrder + 1;
      if (!(oldViewOrder < newViewOrder))
         res.status(501).send(
            `${oldViewOrder} is not less than ${newViewOrder}`
         );
      await VideoCategory.update(
         { viewOrder: Sequelize.literal('"VideoCategories"."viewOrder" - 1') },
         {
            where: {
               viewOrder: {
                  [Op.between]: [oldViewOrder, newViewOrder],
               },
            },
         }
      );
      videoCategory.viewOrder = newViewOrder;
      await videoCategory.save();
      return res
         .status(200)
         .send(
            `Video Category successfully moved down to viewOrder ${newViewOrder}`
         );
   } else res.status(501).send(`Video Category ${name} doesn't exist`);
};

module.exports = {
   getAllVideoCategoriesIncludingVideos,
   getAllVideoCategoriesWithoutTheirVideos,
   updateVideoCategoryName,
   addVideoCategory,
   updateVideoCategoryName,
   deleteVideoCategory,
   moveVideoCategoryUpOneLevel,
   moveVideoCategoryDownOneLevel,
   getOnlyVideoCategoriesThatHaveVideosWithoutTheirVideos,
   consultIfCategoryHasVideos,
};
