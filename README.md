# HLS Streaming Server with React Frontend

This project sets up a server for HTTP Live Streaming (HLS) and a frontend interface to upload and stream videos. The backend is built with Node.js and Express, and the frontend is developed using React with Vite. The system requires `ffmpeg` installed on your machine for video processing. 


## Prerequisites

- `ffmpeg` must be installed on your system. You can download it from [FFmpeg official website](https://ffmpeg.org/download.html). Follow [this article](https://www.hostinger.com/tutorials/how-to-install-ffmpeg) to install `ffmpeg` depending on you operating system.
- **Node.js**: Ensure you have the latest version of Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

## Project Structure

- **root folder**: Contains `index.js`, the main server file.
- **frontend folder**: Contains the React code developed using Vite.
- **test-videos folder**: Contains sample videos for testing.

## Getting Started

### Cloning the Repository

```bash
git clone https://github.com/ameya-shahu/HLS-Streaming-Server-React.git
cd HLS-Streaming-Server-React
```
### Installing Dependencies

#### Backend

```bash
npm install
```
#### Frontend

```bash
cd frontend
npm install
```

### Running the Application
To start the server and the frontend, run the following commands:

```bash
# From the root folder
npm run dev
```
This will start the frontend on [localhost:5173](http://localhost:5173).

### Using the Application

1. **Upload a Video**: In the UI, select a video file. It's recommended to use a video with 1080p quality or use the sample videos provided in the test-videos folder. After successful upload, the backend will convert the video into HLS format with multiple qualities. The HLS segments can be viewed inside the `/uploads/hls-videos` folder.
2. **Stream the Video**: After successful upload, you can stream the uploaded video or the default video included in the frontend code. The streaming supports multiple qualities: 360p, 480p, 720p, and 1080p. Selecting 'auto' will automatically adjust the quality based on your network speed.

### Sample Videos for Testing
The test-videos folder contains sample videos you can use to test the application.
#### Video Credits
1. [Kids Playing Kite in an Open Field by PNW Production](https://www.pexels.com/video/kids-playing-kite-in-an-open-field-8577673/)
2. [Distorted Reflections of a Lake Surrounding on Its Water Surface by Ambient_Nature_Atmosphere](https://www.pexels.com/video/distorted-reflections-of-a-lake-surrounding-on-its-water-surface-3230808/)


## License

This project is licensed under the [MIT License](LICENSE).

For details, see the [LICENSE](LICENSE) file.