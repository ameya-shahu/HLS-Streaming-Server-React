import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from 'fs';
import { exec } from "child_process";



const app = express();
app.use(cors({origin: ['localhost:5173']}));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "http://localhost:5173");
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads")); // serve static files



const linkFilePath = './videoLinks.txt';

const storelink = (videoLink) => {

    const newLinkLine = `${videoLink}\n`

    fs.appendFileSync(linkFilePath, newLinkLine, 'utf-8');
    console.log('[INFO] video URL stored successfully.')
}

const readLinks = () => {
    const data  = fs.readFileSync(linkFilePath, 'utf-8');

    const links = data.trim().split('\n');
    return links;
}

// multer middleware
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname))
    }
})


// multer configuration
const upload = multer({storage: storage})


app.get('/ping', (req, res)=>{
    res.json({"message": "server is working..!!"})
})

app.post("/upload", upload.single('file'), (req, res)=>{
    console.log("[INFO] File uploaded.");

    const videoId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/hls-videos/${videoId}`
    const hlsPath = `${outputPath}/playlist.m3u8` // HLS is a unstiched video file and index.m3u8 work as index for video chunks

    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath, {recursive: true})
    }
    
    // Command ref --- https://medium.com/@peer5/creating-a-production-ready-multi-bitrate-hls-vod-stream-dff1e2f1612c

    const ffmpegCommand = `ffmpeg -hide_banner -y -i ${videoPath} \
    -vf scale=w=640:h=360:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod  -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -hls_segment_filename ${outputPath}/360p_%03d.ts ${outputPath}/360p.m3u8 \
    -vf scale=w=842:h=480:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename ${outputPath}/480p_%03d.ts ${outputPath}/480p.m3u8 \
    -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k -hls_segment_filename ${outputPath}/720p_%03d.ts ${outputPath}/720p.m3u8 \
    -vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 5000k -maxrate 5350k -bufsize 7500k -b:a 192k -hls_segment_filename ${outputPath}/1080p_%03d.ts ${outputPath}/1080p.m3u8`

    // This is converter code and can be design in distributed way
    exec(ffmpegCommand, (error, stdout, stderr) =>{
        if(error){
            console.error(`[ERROR] exec error: ${error}`)
            res.json({"error": "Error while processing your file. Please try again."});
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        fs.copyFileSync('./playlist.m3u8', `${outputPath}/playlist.m3u8`);

        const videoUrl = `http://localhost:8000/uploads/hls-videos/${videoId}/playlist.m3u8`

        try{
            storelink(videoUrl);
        } catch(error){
            console.error(`[ERROR] error while storing video URL: ${error}`);
            res.json({"error": "Error while processing your file. Please try again."})
        }

        res.json({"message": "File uploaded successfully.", videoUrl: videoUrl, videoId: videoId})
    })

    
});

app.get("/videos", (req, res)=>{
    res.json({
        "videoUrls": readLinks()
    })
})


app.listen(8000, ()=>{
    console.log("[INFO] App is running at port 8000")
})