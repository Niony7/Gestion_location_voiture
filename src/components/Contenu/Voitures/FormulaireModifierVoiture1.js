import React, { Component} from 'react';
import {Form, Col, Row, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';
import FormulaireImage from './FormulaireImage_modifier';

function ModifierVoiture () {
    let {idVoiture} = useParams();

    return(
        <>
         <div className="container-fluid">
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Voiture</h4>
                </div>
                <div className="col-md-7 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Gestion de Location</a></li>
                           <li className="breadcrumb-item active">Modifier Voiture</li>
                        </ol>
        
                    </div>
                </div>
            </div>
            <Row>
                <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <FormulaireModification idVoiture={idVoiture}/>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
        </>
    )
}
class FormulaireModification extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            show :false,
            redirection : ''
        }
        this.Url = 'http://localhost:3001/voiture';
        this.formRef = React.createRef(null);
        this.imageRef = React.createRef(null);
    }
    
    /*componentDidMount(){
        axios.get(this.UrlVoiture)
            .then(response => {
                if(response.data.message){
                    alert('message');
                }else{
                    this.setState({voitures : response.data})
                    console.log(response.data)
                }   
            })
            .catch(e => console.log(e))
    }*/


update = () => {
    const valideeImagePrincipale = this.imageRef.current.validation();
    const valideeFormulaire = this.formRef.current.validation();
    if(valideeImagePrincipale && valideeFormulaire){
    const formData = new FormData();
    this.imageRef.current.state.nouveauImages.forEach( (image) => {
        formData.append('image', image)
    })
    const requestInfo = {
        url : this.Url,
        method : 'PUT',
        data : formData,
        params :  {'model' : this.formRef.current.state.model, 
                    'images_a_supprimer' : this.imageRef.current.images_a_supprimer,
                    'image_principale' : this.imageRef.current.state.imagePrincipale}, 
        headers: new Headers({  'Content-type' : 'multipart/form-data' })
    }
    console.log(requestInfo);
    axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message);
            }else{
                this.setState({redirection:'/voiture'})
            }
        })
        .catch( e => console.log(e))
    }
}
  render = () => {
      if(this.state.redirection){
          return(
        <Redirect to={this.state.redirection}/>
          )
      }else{
    return (
      <>
                <Row>
                <Col>
                    
                    <FormModif ref = {this.formRef} idVoiture={this.props.idVoiture}></FormModif>
                    
                </Col>
                <Col>
                    <FormulaireImage ref={this.imageRef} idVoiture={this.props.idVoiture}/>
                </Col>
                </Row>
                <Row>
                    <Col>
                    <Button variant="primary" size="lg" onClick={this.update}>Sauvegarder</Button>
                    </Col>
                </Row>
      </>
    );
  }
  }
}
class FormModif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model : {
                idVoiture : '',
                marque : '',
                modele : '',
                immatriculation : "",
                couleur : "",
                puissance : 0,
                nombrePlace : 0,
                prixLocation : 0,
                boiteVitesse : 'Manuel',
                sourceEnergie : 'Essence',
                etat : "Bon",
                idCategorie : "",
                commentaire : ""
            },
            erreur : {
                idVoiture : '',
                marque : '',
                modele : '',
                immatriculation : "",
                couleur : "",
                puissance : '',
                nombrePlace : '',
                prixLocation : '',
                boiteVitesse : '',
                sourceEnergie : '',
                etat : "",
                idCategorie : "",
                commentaire : ""
            },
            categories : [],
        }
    }
    UrlCategorie = 'http://localhost:3001/categorie';
    UrlVoiture = 'http://localhost:3001/voiture/';
    componentDidMount(){
        axios.get(this.UrlCategorie)
            .then(response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    this.setState({categories : response.data})
                }       
            })
            .catch(e => console.log(e))
        axios.get('http://localhost:3001/voiture/information/'+this.props.idVoiture)
            .then( async (response) => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const model = {
                        idVoiture : response.data.idVoiture,
                        marque : response.data.marque,
                        modele : response.data.model,
                        immatriculation : response.data.immatriculation,
                        couleur : response.data.couleur,
                        puissance : response.data.puissance,
                        nombrePlace : response.data.nombrePlace,
                        prixLocation : response.data.prixLocation,
                        boiteVitesse : response.data.boiteVitesse,
                        sourceEnergie : response.data.sourceEnergie,
                        etat : response.data.etat,
                        idCategorie : response.data.idCategorie,
                        commentaire : response.data.commentaire
                    };
                   this.setState({model})
                }   
            })
            .catch(e => console.log(e))
    }
    setValue = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState(model);
        if(this.state.erreur[field]){
            const {erreur} = this.state;
            erreur[field]='';
            this.setState({erreur});
        }
    }
    validation = () => {
        let erreur = {
            marque : '',
            modele : '',
            immatriculation : "",
            couleur : "",
            puissance : '',
            nombrePlace : '',
            prixLocation : '',
            boiteVitesse : '',
            sourceEnergie : '',
            etat : "",
            idCategorie : "",
            commentaire : ""
        };
        const voiture = this.state.model;
        if(!voiture.marque){
            erreur.marque = 'la marque de la voiture est indispensable'
        }
        if(!voiture.modele){
            erreur.modele = 'le model de la voiture est indispensable'
        }
        if(!voiture.immatriculation){
            erreur.immatriculation = "l' immatriculation de la voiture est indispensable"
        }
        if(!voiture.couleur){
            erreur.couleur = "le couleur de la voiture est indispensable"
        }
        if(voiture.puissance <= 0 ){
            erreur.puissance = "la puissance de la voiture est invalide"
        }
        if(voiture.nombrePlace <= 0){
            erreur.nombrePlace = "le nombre de place de la voiture est invalide"
        }
        if(voiture.prixLocation <= 0){
            erreur.prixLocation = "le prix de location de la voiture doit etre supperieur a 0"
        }
        if(!voiture.boiteVitesse){
            erreur.boiteVitesse = "le type de la boite de vitesse de la voiture est indispensable"
        }
        if(!voiture.sourceEnergie){
            erreur.sourceEnergie = "le type de source d' energie de la voiture est indispensable"
        }
        if(!voiture.etat){
            erreur.etat = "l' etat de la voiture est indispensable"
        }
        if(!voiture.idCategorie){
            erreur.idCategorie = "la type categorie de la voiture est indispensable"
        }
        if(erreur.marque || erreur.modele || erreur.immatriculation || erreur.immatriculation || erreur.couleur || erreur.puissance
            || erreur.nombrePlace || erreur.prixLocation || erreur.boiteVitesse || erreur.sourceEnergie ||
            erreur.etat || erreur.idCategorie){
                this.setState({erreur})
                return false;
        }
        return true;

    }
    render = () => {
        const {categories} = this.state;
        const {erreur} = this.state;
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="voiture.marque">
                            <Form.Label>Marque</Form.Label>
                            <Form.Control type="text" placeholder="marque de la voiture" value={this.state.model.marque}
                            onChange = { e => this.setValue( e , 'marque')}/>
                            <Form.Text className="text-muted">
                                {erreur.marque}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="voiture.model">
                            <Form.Label>model</Form.Label>
                            <Form.Control type="text" placeholder="modele de la voiture" value={this.state.model.modele}
                            onChange = { e => this.setValue( e , 'modele')}/>
                            <Form.Text className="text-muted">
                                {erreur.modele}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="voiture.immatriculation">
                            <Form.Label>Immatriculation</Form.Label>
                            <Form.Control type="text" placeholder="immatriculation de la voiture" value={this.state.model.immatriculation}
                            onChange = { e => this.setValue( e , 'immatriculation')}/>
                            <Form.Text className="text-muted">
                                {erreur.immatriculation}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="voiture.couleur">
                            <Form.Label>Couleur</Form.Label>
                            <Form.Control type="text" placeholder=" la Couleur de la voiture" value={ this.state.model.couleur}
                                onChange={ e => this.setValue( e , 'couleur')}/>
                                <Form.Text className="text-muted">
                                {erreur.couleur}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="voiture.puissance">
                            <Form.Label>Puissance</Form.Label>
                            <Form.Control type="text" placeholder=" la puissance de la voiture en Chv" value = { this.state.model.puissance}
                                onChange={ e => this.setValue( e , 'puissance')}/>
                                <Form.Text className="text-muted">
                                {erreur.puissance}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="voiture.nombrePlace">
                            <Form.Label>Nombre de place</Form.Label>
                            <Form.Control type="number" placeholder=" le nombre des places de la voiture" value={ this.state.model.nombrePlace}
                                onChange = { e => this.setValue( e, 'nombrePlace')}/>
                            <Form.Text className="text-muted">
                                {erreur.nombrePlace}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="voiture.prixLocation">
                            <Form.Label>Cout de la Location (par Jour)</Form.Label>
                            <Form.Control type="text" placeholder=" la cout de la location de la voiture" value = { this.state.model.prixLocation}
                            onChange = { e => this.setValue( e , 'prixLocation')} />
                            <Form.Text className="text-muted">
                                {erreur.prixLocation}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="voiture.etat">
                            <Form.Label>Etat de la voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.etat } onChange = { e => this.setValue( e , 'etat')}>
                                <option>Bon</option>
                                <option>En Mauvais Etat</option>
                                <option>En reparation</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                {erreur.etat}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="voiture.boiteVitesse">
                            <Form.Label>Etat de la voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.boiteVitesse } onChange = { e => this.setValue( e , 'boiteVitesse')}>
                                <option>Manuel</option>
                                <option>Automatique</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="voiture.sourceEnergie">
                            <Form.Label>Source d' energie</Form.Label>
                            <Form.Control as="select" value = { this.state.model.sourceEnergie} onChange = { e => this.setValue( e , 'sourceEnergie')}>
                                <option>Essence</option>
                                <option>Gasoil</option>
                                <option>Electrique</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                {erreur.sourceEnergie}
                                </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="voiture.groupe">
                <Form.Label>Categorie</Form.Label>
                <Form.Control as="select" value = { this.state.model.idCategorie} onChange = { e => this.setValue( e, 'idCategorie')}>
                    <option>----------</option>
                    {
                        categories.map( (categorie) => (
                        <option key={categorie.numCategorie} value={categorie.idCategorie}>{categorie.nomCategorie}</option>
                        ))
                    }
                </Form.Control>
                <Form.Text className="text-muted">
                    {erreur.categorie}
                    </Form.Text>
            </Form.Group>
                <Form.Group controlId="voiture.commentaire">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control as="textarea" rows={3} value = { this.state.model.commentaire} onChange = { e => this.setValue( e, 'commentaire')} />
            </Form.Group>
            </Form>
        )
    }
  }
export default ModifierVoiture;