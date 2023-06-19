import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

 function App() {
     	//image URLs from AWS
const images = [
    'https://s3://storingaigoraphotos/cittaVecchia.jpg',
    'https://s3://storingaigoraphotos/unTigreDiaoulo.jpeg',
    'https://s3://storingaigoraphotos/animeProtag.jpeg',
    'https://s3://storingaigoraphotos/degas.jpg',
    'https://s3://storingaigoraphotos/elVagabondoPecador.jpg',
    'https://s3://storingaigoraphotos/greekIcon.jpg',
    'https://s3://storingaigoraphotos/Dali.jpg',
    'https://s3://storingaigoraphotos/Faro.jpg',
    'https://s3://storingaigoraphotos/SorElena.jpg',
    'https://s3://storingaigoraphotos/Rembrandt.jpg',
    'https://s3://storingaigoraphotos/Africa.jpg',
    'https://s3://storingaigoraphotos/OVNI.jpeg',
    'https://s3://storingaigoraphotos/ZhongGuo.jpg',
    'https://s3://storingaigoraphotos/sentientUniverse.jpg',
    'https://s3://storingaigoraphotos/compasion.jpg',
    'https://s3://storingaigoraphotos/laRagazzaDiSoffrenza.jpg',
	];
  
  return (
 	  <Container>
 		{images.map((image, idx) => (
 		  <Row key={idx}>
 			<Col xs={12} md={6} lg={4}>
 			  <img src={image} className="img-fluid" alt="Responsive" />
 			</Col>
 		  </Row>
 		))}
 	  </Container>
 	);
  }
  
  export default App;

