const createError = require("../../helpers/createError");
const eCollectionService = require("./e-collection.service");
const fs = require("fs");

const collectUserData = async (req, res, next) => {
  const dataObject = req.body;
  const avatarFile = req.file; // Multer lets this happen. Quite some heavy lifting if I must say.

  if (!avatarFile) {
    return next(
      createError(422, [
        {
          status: 422,
          title: "Invalid resource",
          detail: "Attached file is not an image",
        },
      ])
    );
  } // Image must be present

  if (avatarFile.size > 1000000) {
    fs.unlink(avatarFile.path, (err) => {
      if (err) {
        return next(err);
      }
    });
    return next(
      createError(422, [
        {
          status: 422,
          title: "Image too large",
          detail: "Sorry, image cannot exceed 1MB",
        },
      ])
    );
  }

  const avatarUrl = "/images/" + avatarFile.filename;

  try {
    const collectedData = await eCollectionService.collectData({
      ...dataObject,
      avatar: avatarUrl,
    });

    if (collectedData) {
      return res.status(201).json({
        status: true,
        message: "Your info has been submitted successfully",
        data: collectedData,
      });
    } else {
      return next(
        createError(422, [
          {
            status: 422,
            title: "Failed Operation",
            detail: "Sorry, this request could not be processed at the moment",
          },
        ])
      );
    }
  } catch (err) {
    console.log(err);
    next(
      createError.InternalServerError(
        "An error occurred while processing this request"
      )
    );
  }
};

module.exports = {
  collectUserData,
};
