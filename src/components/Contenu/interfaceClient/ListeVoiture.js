import { Component } from 'react';
import { Button, Container, Row, Col, Image} from 'react-bootstrap';

class ListeVoiture extends Component {
    UrlImage =  'http://localhost:3001/image';
    render = () => {
        const {voitures} = this.props;
        return (
            <>
            <Container>
                {
            voitures.map( (voiture) => (
                <Row>
                    <Col>
                    
                        <Image src={this.UrlImage+"/"+voiture.imagePrincipale}  fluid />
                    </Col>
                    <Col>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Nombre Place</td>
                                    <td>{voiture.nbPlaces}</td>
                                </tr>
                                <tr>
                                    <td>Couleur</td>
                                    <td>{voiture.couleur}</td>
                                </tr>
                                <tr>
                                    <td>puissance</td>
                                    <td>{voiture.puissance}</td>
                                </tr>
                                <tr>
                                    <td>Vitesse</td>
                                    <td>Manual</td>
                                </tr>
                                <tr>
                                    <td>Energie</td>
                                    <td>Essence</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col>
                    <Button variant="primary" size="lg" block>
                            Louer
                        </Button>
                        <Button variant="secondary" size="lg" block>
                            Detailler
                        </Button>
                    </Col>
                </Row>
            ))}
            </Container>
            </>
        )
    }
}

export default ListeVoiture;