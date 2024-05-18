import React from 'react';
import VideoPlayer from './VideoPlayer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const VideoLib = ({ videoSources }) => {
  return (
    videoSources.reduce((result, value, index) => {
        (index % 2 === 0) ? result.push([value]) : result[result.length - 1].push(value);
        return result;
        }, [])
        .map((item, index)=>{
        return(
            <Row key={index}>
                {
                    item.map((val, idx)=>{
                        return(
                            <Col key={idx} xs={6} className='p-3 border justify-content-md-center'>
                                <VideoPlayer videoSource={val} />
                            </Col>
                        )
                    })
                }
            </Row>
        )
        })
  )
}

export default VideoLib