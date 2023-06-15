import React,{ Component } from 'react';
import Liste from './listeEmployer';
import axios from 'axios';
import {Container, Row, Button, Card} from 'react-bootstrap';
import ModalAjout from './modalAjout';
import * as FaIcons from 'react-icons/fa';
import {ExportCSV} from '../export-excel';
export default class ClientBox extends Component {
    Url = 'http://localhost:3001/employer';

    constructor(props){
        super(props);
        this.state = {
            employers : [],
            recherche : '',
            fileName : 'liste employer'
        }
        this.refModalAjout = React.createRef(null)
    }
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                if(response.data.message){
                    alert(response.data.messaage)
                }else{
                    this.setState({ employers : response.data})
                }  
            })
            .catch( e => console.log(e))
    }
    create = (employer) => {
        console.log("tonga eto");
        console.log(this.Url);
        const requestInfo = {
            url : this.Url,
            method : 'POST',
            data : employer,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    const employers  = [ ...this.state.employers, response.data];
                    this.setState({ employers });
                }
            })
            .catch( e => console.log(e))
    }

    delete = (idEmployer) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {idEmployer: idEmployer},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if(response.data.message){
                    alert(response.data.message);
                }else{
                    const employers = this.state.employers.filter(employer=> employer.idEmployer !== idEmployer);
                    this.setState({ employers});
                }
            })
    }

    update = (employer) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : employer.idEmployer,
            data : employer,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message)
            }else{
                this.setState({ employers : response.data})
            } 
        })
        .catch( e => console.log(e))
    }
    update_avecMotdePasse = (employer, nouveauMotDePasse) => {
        const requestInfo = {
            url : this.Url,
            method : 'PUT',
            params : employer.idEmployer,
            data : {employer:employer, nouveauMotDePasse:nouveauMotDePasse},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
        .then( response => {
            if(response.data.message){
                alert(response.data.message);
            }else{
                this.setState({ employers : response.data})
            }   
        })
        .catch( e => console.log(e))
    }
    afficheModalAjout = () => {
        this.refModalAjout.current.handleShow();
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
                        <h4 className="text-themecolor">Employer</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Employer</li>
                            </ol>
                            <ExportCSV csvData={this.state.employers} fileName={this.state.fileName} />
                        </div>
                    </div>
                </div>
                <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Button variant="primary"  onClick={this.afficheModalAjout}>Ajouter</Button>
                                    <form className="form-inline my-2 my-lg-0">
                                        <a className="nav-link waves-effect waves-dark" href="javascript:void(0)" ><FaIcons.FaReply/></a>
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                        value={this.state.recherche} onChange={ e => this.setValue(e)}/>
                                        <a className="nav-link waves-effect waves-dark" href="javascript:void(0)" ><FaIcons.FaSearch/></a>
                                    </form>
                                </Row>
                                <Card.Title>Listes des Employers</Card.Title>
                                <div className="table-responsive">
                                    <Liste employers={this.state.employers} supprimerEmployer={this.delete} modifierEmployer={this.update} 
                                    modifierEmployerAvecMotDePasse={this.update_avecMotdePasse} recherche={this.state.recherche}/>
                                </div>
                            </Container>
                        </Card.Body>
                    </Card>
                    </div>
                </Row>
            </div>
            <ModalAjout ref={this.refModalAjout} ajouterEmployer={this.create}/>
            </>
        )
    }
   
}