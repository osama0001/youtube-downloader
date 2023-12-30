const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

// Set the path to the FFmpeg binary
ffmpeg.setFfmpegPath(
  "C:/Users/osama/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-6.1-full_build/bin/ffmpeg"
);

const videoUrl = "https://www.youtube.com/watch?v=1UqGCGrj_pY";

// Set up the options for ytdl-core
const options = {
  quality: "highestaudio",
  filter: "audioonly",
};

// Download the video using ytdl-core
const stream = ytdl(videoUrl, options);

// Create a writable stream to save the MP3 file
const outputPath = "output.mp3";
const outputStream = fs.createWriteStream(outputPath);

// Use fluent-ffmpeg to convert the video stream to MP3
ffmpeg()
  .input(stream)
  .audioCodec("libmp3lame")
  .audioBitrate(192)
  .toFormat("mp3")
  .on("end", function () {
    console.log("Conversion finished successfully!");
  })
  .on("error", function (err) {
    console.error("Error during conversion:", err);
  })
  .pipe(outputStream, { end: true });
