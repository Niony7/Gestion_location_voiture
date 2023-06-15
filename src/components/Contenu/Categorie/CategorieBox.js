import { Component } from 'react';
import Formulaire from './formulaireCategorie';
import Liste from './listeCategorie';
import axios from 'axios';
import {Row, Col, Card} from 'react-bootstrap';
import {ExportCSV} from '../export-excel';
export default class CategoriesBox extends Component {
    Url = 'http://localhost:3001/categorie';

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            recherche : '',
            fileName : 'liste categorie'
        }
    }
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    this.setState({ categories : response.data})
                }  
            })
            .catch( e => console.log(e))
    }
    create = (categorie) => {
        console.log("tonga eto");
        console.log(this.Url);
        const requestInfo = {
            url : this.Url,
            method : 'POST',
            data : categorie,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message);
                }else{
                    const categories  = [ ...this.state.categories, response.data];
                    this.setState({ categories : categories});
                }
               
            })
            .catch( e => console.log(e))
    }

    delete = (idCategorie) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idCategorie : idCategorie},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if( response.status === 200) {
                    const categories = this.state.categories.filter( categorie => categorie.idCategorie !== idCategorie);
                    this.setState({ categories });
                }
            })
    }

    update = (categorie) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : categorie.idCategorie,
            data : categorie,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            console.log("update vita");
            this.setState({ categories : response.data})
        })
        .catch( e => console.log(e))
    }
    setValue = (e) => {
        this.setState({recherche:e.target.value});
    }
    render () {
        return (
            <>
            <div className="container-fluid">
                <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                        <h4 className="text-themecolor">Categorie</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Categorie</li>
                            </ol>
                            <ExportCSV csvData={this.state.categories} fileName={this.state.fileName} />
                        </div>
                    </div>
                </div>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body><h5>Ajouter un Categorie de voiture</h5>
                            
                                <Formulaire ajouterCategorie={this.create}/>
                            </Card.Body>
                        </Card>
        
                    </Col>
                    <Col>
                    <Card>
                            <Card.Body>
                            <Row>
                            <Card.Title>Liste des Location</Card.Title>
                            </Row>
                                <Row>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                    value = {this.state.recherche} onChange = { e => this.setValue(e)}/>
                                </form>
                                </Row>
                                <Liste categories={this.state.categories} supprimerCategorie={this.delete} modifierCategorie={this.update}
                                recherche = {this.state.recherche}/>
                           
                            </Card.Body>
                        </Card>
                        </Col>
                </Row>
                </div>
            </>    
        )
    }
   
}