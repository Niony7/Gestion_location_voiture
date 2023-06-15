import React, { Component } from 'react';
import {Container, Form, Toast, Col, Row, Image, Button, Modal} from 'react-bootstrap';
import axios from 'axios';import ImageGrid from './imageGrid';

class ModalModification extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show :false
        }
        this.Url = 'http://localhost:3001/voiture';
        //this.formRef = React.createRef(null);
        //this.ancienImageRef = React.createRef(null);
        //this.nouveauImageRef = React.createRef(null);
    }
    
   /* componentDidMount(){
        axios.get(this.UrlVoiture)
            .then(response => {
                this.setState({voitures : response.data})
            })
            .catch(e => console.log(e))
    }*/
    
  handleClose = () => {
    this.setState({show:false})
  }
  handleShow = () => {
    this.setState({show:true})
  }
  changeValue = (voiture) => {
    console.log('this.ancienImageRef')
    //this.formRef.current.changeValue(voiture);
    //this.ancienImageRef.current.changeValue(voiture.id_voiture);
}
setValue = (e, field) => {
  const { model } = this.state;
  model[field] = e.target.value;
  this.setState(model);
  console.log(this.state.model);
}
update = async () => {
    await this.props.modifier_voiture(this.nouveauImageRef.current.state.images, this.formRef.current.state.model, this.ancienImageRef.current.file_a_supprimer);
    this.handleClose();
}
  render = () => {
    return (
      <>
        <Modal size="xl" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container>
                <Row>
                <Col>
                    <FormModif ref = {this.formRef}></FormModif>
                </Col>
                <Col>
                    <Row>
                        <AncienImage ref={this.ancienImageRef}></AncienImage>
                    </Row>
                    <Row>
                        <ImageGrid ref={this.nouveauImageRef}></ImageGrid>
                    </Row>
                </Col>
                </Row>
                <Row>
                    <Col>
                    <button type="button" className="btn btn-secondary lg" data-dismiss="modal">Close</button>
                    </Col>
                    <Col>
                    <Button variant="primary" size="lg" onClick={this.modifier_voiture}>Sauvegarder</Button>
                    </Col>
                </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.update}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
class FormModif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
                id_voiture : "",
                immatriculation : "",
                couleur : "",
                puissance : 0,
                kilometrage : 0,
                nbPlaces : 0,
                prixLocation : 0,
                etat : "",
                categorie : "",
                commentaire : ""
            },
            categories : [],
        }
    }
    UrlCategorie = 'http://localhost:3001/categorie';
    componentDidMount(){
        axios.get(this.UrlCategorie)
            .then(response => {
                console.log(response.data);
                this.setState({categories : response.data})
            })
            .catch(e => console.log(e))
    }
    setValue = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState(model);
        console.log(this.state.model);
    }
    changeValue = (voiture) => {
        this.setState({model:voiture});
        console.log("form state");
        console.log(voiture);
    }
    render = () => {
        const {categories} = this.state;
        return (
            <Form>
                        <Form.Group controlId="voiture.id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="id de la voiture" value={this.state.model.id_voiture}
                            onChange={ e => this.setValue(e, 'id_voiture')}/>
                        </Form.Group>
                        <Form.Group controlId="voiture.immatriculation">
                            <Form.Label>Immatriculation</Form.Label>
                            <Form.Control type="text" placeholder="immatriculation de la voiture" value={this.state.model.immatriculation}
                            onChange = { e => this.setValue( e , 'immatriculation')}/>
                        </Form.Group>
                        <Form.Group controlId="voiture.couleur">
                            <Form.Label>Couleur</Form.Label>
                            <Form.Control type="text" placeholder=" la Couleur de la voiture" value={ this.state.model.couleur}
                            onChange={ e => this.setValue( e , 'couleur')}/>
                        </Form.Group>
                        <Form.Group controlId="voiture.puissance">
                            <Form.Label>Puissance</Form.Label>
                            <Form.Control type="number" placeholder=" la puissance de la voiture en Chv" value = { this.state.model.puissance}
                            onChange={ e => this.setValue( e , 'puissance')}/>
                        </Form.Group>
                        <Form.Group controlId="voiture.kilometrage">
                            <Form.Label>Kilometrage</Form.Label>
                            <Form.Control type="number" placeholder=" Le kilometrage fait par la voiture de la voiture" value = { this.state.model.kilometrage}
                            onChange = { e => this.setValue( e , 'kilometrage')}/>
                        </Form.Group>
                        <Form.Group controlId="voiture.nbPlace">
                            <Form.Label>Nombre de place</Form.Label>
                            <Form.Control type="number" placeholder=" le nombre des places de la voiture" value={ this.state.model.nbPlace}
                            onChange = { e => this.setValue( e, 'nbPlaces')}/>
                        </Form.Group>
                        <Form.Group controlId="voiture.prixLocation">
                            <Form.Label>Cout de la Location (par Jour)</Form.Label>
                            <Form.Control type="number" placeholder=" la cout de la location de la voiture" value = { this.state.model.prixLocation}
                            onChange = { e => this.setValue( e , 'prixLocation')} />
                        </Form.Group>
                        <Form.Group controlId="voiture.etat">
                            <Form.Label>Etat de la voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.etat } onChange = { e => this.setValue( e , 'etat')}>
                            <option>Bon</option>
                            <option>En Mauvais Etat</option>
                            <option>En reparation</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="voiture.groupe">
                            <Form.Label>Categorie</Form.Label>
                            <Form.Control as="select" value = { this.state.model.categorie} onChange = { e => this.setValue( e, 'categorie')}>
                            <option>----------</option>
                            {
                               categories.map( (categorie) => (
                                   <option key={categorie.numCategorie}>{categorie.nomCategorie}</option>
                               ))
                            }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="voiture.commentaire">
                            <Form.Label>Commentaire</Form.Label>
                            <Form.Control as="textarea" rows={3} value = { this.state.model.commentaire} onChange = { e => this.setValue( e, 'commentaire')} />
                        </Form.Group>
                    </Form>
        )
    }
  }
  class AncienImage extends Component {
    Url = 'http://localhost:3001/voiture';
    UrlImage =  'http://localhost:3001/image';
    constructor ( props ) {
        super ( props );
        this.state = {
            images : [],
            id_voiture : '',
        }
        this.images_a_supprimer=[]
    }
    fermerImage = async (image) => {
        const images = this.state.images;
        const index_suppr = images.indexOf(image);
        const supprimer=images.splice(index_suppr, 1);
        this.images_a_supprimer.push(supprimer[0]);
        this.setState({images});
    }
    changeValue = async (id_voiture) => {
        this.setState({id_voiture : id_voiture});
        axios.get(this.Url+"/"+id_voiture)
        .then( async (response) => {
            console.log(response)
            var images = [];
            response.data.images.forEach( async (image) => {
                images.push(image.id_image);
            });
            this.setState({images});
        })
        .catch( e => console.log(e))
    }
     
     render (){
        const {images} = this.state;
        return(
                <Container>
                    
                    <Row>
                        <h2>ancien des Voiture</h2>
                    </Row>
                    <Row>
                    { 
                        images.map((image) => {
                            return (
                                <Col key={image}>
                                <Toast>
                                    <Toast.Header>
                                        <Button  variant="primary" onClick={e => this.fermerImage(image)}>suppr</Button>
                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                        <strong className="mr-auto">{image}</strong>
                                        <small></small>
                                    </Toast.Header>
                                    <Toast.Body><Image src={this.UrlImage+"/"+image}  fluid></Image>.</Toast.Body>
                                </Toast>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
        )
    }
}
export default ModalModification;