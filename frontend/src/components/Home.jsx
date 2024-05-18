import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoUploadForm from './VideoUploadForm';
import Topbar from './Topbar';
import { getVideosSourceList } from '../services/apiServices'
import VideoLib from './VideoLib';

const Home = () => {

    const [videoSources, setVideoSources] = useState([]);

    useEffect(() =>{
        fetchVideoSources();
    }, [])
    
    const fetchVideoSources = async() =>{
        const response = await getVideosSourceList();
        setVideoSources(response);
    }

  return (
    <>
        <Topbar />
        <Container className='mt-5'>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                <p className='text-center text-danger'>Note: This UI preview is hosted on Vercel. File upload needs a backend server. See the <a href='https://github.com/ameya-shahu/HLS-Streaming-Server-React'>GitHub Repo</a> to set up a local HLS server.</p>
                <VideoUploadForm /></Col>
            </Row>
            <Row>
                <Col><hr></hr></Col>
            </Row>
            <Row className="justify-content-md-center mb-5">
                <Col className="text-center text-primary"><h3>Available Videos Library</h3></Col>
            </Row>
            <VideoLib videoSources={videoSources}/>
        </Container>
    </>
  )
}

export default Home