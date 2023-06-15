import { Component } from 'react';
import {Form, Table, Col, Row, Image, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
class MyModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show : false,
            model : {
                idVoiture : "",
                immatriculation : "",
                couleur : "",
                puissance : 0,
                kilotrage : 0,
                nombrebPlace : 0,
                prixLocation : 0,
                etat : "",
                categorie : "",
                commentaire : ""
            },
            filesName : [],
            images : []
        }
        this.Url = 'http://localhost:3001/voiture';
        this.UrlImage = 'http://localhost:3001/image';
    }
  
    handleClose = () => {
        this.setState({show:false})
    }
    handleShow = () => {
        this.setState({show:true})
    }
    changeValue = async (voiture) => {
        this.setState({model : voiture});
        axios.get(this.Url+"/"+voiture.idVoiture)
        .then( async (response) => {
            console.log(response)
            var images = [];
            response.data.images.forEach( async (image) => {
                images.push(image.idImage);
            });
            this.setState({images});
        })
        .catch( e => console.log(e))
    }
    render = () => {
        const voiture = this.state.model;
        const {images} = this.state;
    return (
      <>
  
        <Modal size="lg" show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Information </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row>
                  <Col>
                  <Form>
                  <Table>
                      <tbody>
                        <tr>
                            <td>Immatriculation</td>
                            <td>{voiture.immatriculation}</td>
                        </tr>
                        <tr>
                            <td>Coleur</td>
                            <td>{voiture.couleur}</td>
                        </tr>
                        <tr>
                            <td>puissance</td>
                            <td>{voiture.puissance}</td>
                        </tr>
                        <tr>
                            <td>Nombre de place</td>
                            <td>{voiture.nombrePlace}</td>
                        </tr>
                        <tr>
                            <td>Source Energie</td>
                            <td>{voiture.sourceEnergie}</td>
                        </tr>
                        <tr>
                            <td>Boite Vitesse</td>
                            <td>{voiture.boiteVitesse}</td>
                        </tr>
                        <tr>
                            <td>Prix Location</td>
                            <td>{voiture.prixLocation}</td>
                        </tr>
                        <tr>
                            <td>Etat</td>
                            <td>{voiture.etat}</td>
                        </tr>
                        <tr>
                            <td>Categorie</td>
                            <td>{voiture.nomCategorie}</td>
                        </tr>
                        <tr>
                            <td>Commentaire</td>
                            <td>{voiture.commentaire}</td>
                        </tr>
                        </tbody>
                  </Table>
            </Form>
                  </Col>
                  <Col>
                 
                  <Row>
                        {
                            images.map( (image)=> { 
                                return(
                                    <Col key={image}>
                                        <Image src={this.UrlImage+"/"+image}  fluid />
                                    </Col>
                                )
                            })
                        }
                  </Row>
                 
                  </Col>
              </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    }
  }

  export default MyModal;