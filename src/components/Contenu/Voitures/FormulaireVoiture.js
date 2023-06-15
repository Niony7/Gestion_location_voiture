import React,{ Component } from 'react';
import {Form, Button, Row, Col,Card} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import ImageGrid from './FormulaireImage_ajout'
class FormulaireVoiture extends Component {
    constructor(props){
        super(props);
        this.state = {
            images : [],
            redirection : ''
        };
        this.formRef = React.createRef();
        this.imagesRef = React.createRef();
        this.Url = 'http://localhost:3001/voiture';
    }

    setValue = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState(model);
        console.log(this.state.model);
    }

    create = async () => {
        const valideeImagePrincipale = this.imagesRef.current.validation();
        const valideeFormulaire = this.formRef.current.validation();
       
        if(valideeFormulaire && valideeImagePrincipale){
            const formData = new FormData();
            this.imagesRef.current.state.images.forEach( (image) => {
                formData.append('image', image)
            })
            console.log('request post envoyer');
            const requestInfo = {
                url : this.Url,
                method : 'POST',
                data : formData,
                params :  {voiture:this.formRef.current.state.model, image_principale:this.imagesRef.current.state.imagePrincipale},
                headers: new Headers({  'Content-type' : 'multipart/form-data' })
            }
            console.log(requestInfo);
            axios.request(requestInfo)
                .then( response => {
                    if(response.data.message){

                        alert(response.data.message)
                    }else{
                        this.setState({redirection:'/voiture'})
                    }
                    
                })
                .catch( e => console.log(e))
        }
       
    }

  render = () => {
      if(this.state.redirection){
          return <Redirect to={this.state.redirection}/>
      }else{
    return (
      <>
        <div className="container-fluid">
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h4 className="text-themecolor">Voiture</h4>
                </div>
                <div className="col-md-7 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                           <li className="breadcrumb-item active">Ajout Voiture</li>
                        </ol>
                    </div>
                </div>
            </div>
            <Row>
                <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                <FormVoiture ref = { this.formRef}></FormVoiture>
                                </Col>
                                <Col>
                                    <ImageGrid ref = { this.imagesRef }></ImageGrid>
                                </Col>
                            </Row>
                            <Row><Button onClick={this.create}>Ajouter</Button></Row>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
      </>
    );
      }
  }
}
class FormVoiture extends Component {
    constructor ( props ) {
        super(props);
        this.state = {
            model : {
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
            erreur.idCategorie = "la categorie de la voiture est indispensable"
        }
        if(erreur.marque || erreur.modele || erreur.immatriculation || erreur.immatriculation || erreur.couleur || erreur.puissance
            || erreur.nombrePlace || erreur.prixLocation || erreur.boiteVitesse || erreur.sourceEnergie ||
            erreur.etat || erreur.idCategorie){
                this.setState({erreur})
                return false;
        }
        return true;

    }
    render () {
        const {categories} = this.state;
        const {erreur} = this.state
    return (
        <>
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
                        <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.idCategorie + ' - ' + categorie.nomCategorie}</option>
                        ))
                    }
                </Form.Control>
                <Form.Text className="text-muted">
                    {erreur.idCategorie}
                    </Form.Text>
            </Form.Group>
                <Form.Group controlId="voiture.commentaire">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control as="textarea" rows={3} value = { this.state.model.commentaire} onChange = { e => this.setValue( e, 'commentaire')} />
            </Form.Group>
        </Form>
        </>
    )
    }
}
export default FormulaireVoiture;