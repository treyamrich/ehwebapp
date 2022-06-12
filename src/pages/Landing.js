import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import { Image, Button, Container, Row, Col } from 'react-bootstrap';
import "../styles/landing.css";

function Landing() {
	return(
		<div>
			<Helmet>
              <title>Engraving Hawaii</title>
              	<meta name="description" content="Volunteer discovery platform for the island of Oahu. Find volunteer opportunities all over the island for any type of community service. From beach cleanups to animal shelters you can find everything you need here!" />
              	<meta name="keywords" content="Volunteer, Hawaii, Compassion, Connection, Oahu" />
        	</Helmet>

        	<Container style={{paddingBottom:"50px", borderBottom:"1px solid #EFEFEF"}} className="container-spacing">
        		<Row>
        			<Col md={4}>
        				<h3>Our Founder</h3>
        				<p className="info">
        					Order a plaque.
						</p>
        			</Col>
        			<Col md={4}>
        				<h3>The Platform</h3>
        				<p className="info">
							Order a bottle.
						</p>
        			</Col>
        			<Col md={4}>
        				<h3> Mission </h3>
        				<p className="info">
							Order a gift.
						</p>
        			</Col>
        		</Row>
			</Container>
			<Container className="container-spacing">
				<Row>
					<Col className="col" md={8}>
				        <h3>Receive a Quote</h3>
				        <p> Enter ur info sir</p>
				        <Link to="/schedule"> <Button className ="schedule mb-5">Receive Quote </Button></Link>

				        <h3>Previous products</h3>
        				<p> 
        					View our previously completed products for our happy customers!
        				</p>
				        <Link to="/discover"> <Button className ="schedule mb-5">Product Catalog</Button></Link>
			        </Col>
        		</Row>
			</Container>
			<footer>
				<Container>
					<Row lg={6} md={4} xs={2} className="row-footer">
						<Col>
							<div className="footer">Social Media</div>
							<ul>
								<li><a href="/" className = "footer-link"> Instagram </a></li>
								<li><a href="/" className = "footer-link"> Twitter </a></li>
								<li><a href="/" className = "footer-link"> Tiktok </a></li>
							</ul>
						</Col>
	        			<Col>
					        <div className="footer">Donate</div>
					        <ul>
								<li><a href="https://cash.app/$compassionconnect" target="_blank" className = "footer-link"> Cash app </a></li>
								<li><a href="/" className = "footer-link"> Patreon </a></li>
							</ul>
	        			</Col>       		
	        		</Row>
	        	</Container>
			</footer>
		</div>
	);
}
 
export default Landing;