import React,{ Component } from 'react';
import { Row, Card, Form} from 'react-bootstrap';
import ListeVoiture from './ListeVoiture';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {ExportCSV} from '../export-excel';
class VoitureBox extends Component {
    Url = "http://localhost:3001/voiture";
    constructor(props){
        super(props);
        this.state = {
            voitures : [],
            recherche : '',
            radioValue : 'tout',
            fileName : 'listeVoiture'
        }
        this.refModalAjout = React.createRef(null)
    }
    
    componentDidMount() {
       this.syncroniseEtat();
    }
    syncroniseEtat = () =>{
        axios.get(this.Url)
        .then( (response) => {
            if(response.data.message){
                alert(response.data.message)
            }else{
                this.setState({ voitures : response.data})
            }  
        })
        .catch( e => console.log(e))
    }

    
   /* update = (images, voiture, images_a_supprimer) => {
        const formData = new FormData();
        images.forEach( (image) => {
            formData.append('image', image)
        })
        console.log('request post envoyer');
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            data : formData,
            params :  {'model' : voiture, 'images_a_supprimer' : images_a_supprimer}, 
            headers: new Headers({  'Content-type' : 'multipart/form-data' })
        }
        console.log(requestInfo);
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }
            })
            .catch( e => console.log(e))
    }*/
    delete = (idVoiture) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idVoiture : idVoiture},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.date.message)
                }else{
                    const voitures = this.state.voitures.filter( voiture => voiture.idVoiture !== idVoiture);
                    this.setState({ voitures });
                }
            })
    }
    afficheModalAjout = () => {
        this.refModalAjout.current.handleShow();
    }
    setValue = (e) => {
        this.setState({recherche:e.target.value});
    }
    radioChange = (e) => {
        this.setState({radioValue:e.target.value})
    }
    render () {
        var value = this.state.radioValue;
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
                            <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                           <li className="breadcrumb-item active">Voiture</li>
                        </ol>
                        <ExportCSV csvData={this.state.voitures} fileName={this.state.fileName} />
                    </div>
                </div>
            </div>
                <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Row>
                            <Link className="btn btn-primary" to="/voiture/ajout"> Ajouter</Link>
                                
                            </Row>
                               
                            <Card.Title>Liste des Voiture</Card.Title>
                            <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                    value={this.state.recherche} onChange={ e => this.setValue(e)}/>
                                    
                                    <Form.Check inline label="2" type="radio" id="tout" label="Tout" value="tout"
                                    checked={value==='tout'} onChange={ e => this.radioChange(e)}/>
                                    <Form.Check inline label="2" type="radio" id="disponible" label="Disponible" value="disponible"
                                    checked={value==='disponible'} onChange={ e => this.radioChange(e)}/>
                                    <Form.Check inline label="2" type="radio" id="nonDisponible" label="Non Disponible" value="nonDisponible"
                                    checked={value==='nonDisponible'} onChange={ e => this.radioChange(e)}/>
                                </form>
                            <div className="table-responsive">
                                <ListeVoiture voitures={this.state.voitures} supprimerVoiture={this.delete} recherche={this.state.recherche} radioValue={this.state.radioValue}/>
                            </div>
                            
                        </Card.Body>
                    </Card>
                    </div>
                </Row>
            </div>
                
            </>
        )
    }
}

export default VoitureBox;