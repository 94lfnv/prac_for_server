const express = require("express");
const router = express.Router();
// const { Video } = require("../models/Video");

//=================================
//             Video
//=================================

const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
    // 어디에 파일을 저장할지 보여주는 곳
    // 가장 상위 부분에 uplaods 폴더가 있어야 함
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  // 비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  // 썸네일 생성 및 비디오 러닝 타임 등 정보 가져오기

  let filePath = "";
  let fileDuration = "";

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    console.dir(metadata);
    console.log(metadata, "meatadata");
    // console.log(metadata.format, duration);
    // fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", (filenames) => {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", () => {
      console.log("Screenshots taken");
      return res
        .json({
          success: true,
          filePath,
          fileDuration,
        })
        .on("error", (err) => {
          console.log(err);
          return res.json({ success: false, err });
        })
        .screenshots({
          count: 3,
          folder: "uploads/thumbnails",
          size: "320x240",
          filename: "thumbnail-%b.png",
        });
    });
});

module.exports = router;
