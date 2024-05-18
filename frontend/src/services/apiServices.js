import axios from 'axios';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try{
        const response = await axios.post("http://localhost:8000/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        if (response.status === 200) {
            alert('File uploaded successfully!');
          } else {
            alert('File upload failed!');
        } 

    } catch(error){
        console.error('Error uploading video file: ', error);
        alert('File upload failed!');
    }

}

export const getVideosSourceList = async (file) => {
    const availableVideos = ['/test-video-1/playlist.m3u8']
    try{
        const response = await axios.get("http://localhost:8000/videos")

        if (response.status === 200) {
            return availableVideos.concat(response.data.videoUrls);
          } else {
            return availableVideos;
        } 

    } catch(error){
        console.error('Error uploading video file: ', error);
        return availableVideos;
    }

}