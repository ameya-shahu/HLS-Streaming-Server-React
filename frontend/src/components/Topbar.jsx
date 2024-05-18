import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Topbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand className="text-center">
            <h2>HLS Video Streaming</h2>
            <h4>with adaptive bitrate</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Topbar