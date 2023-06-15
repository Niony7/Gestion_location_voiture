import React,{ Component } from 'react';
import {Container, Card, Row, Button} from 'react-bootstrap';
import axios from 'axios';
import Liste from './listeBilan';
import {ExportCSV} from '../export-excel';

export default class Bilan extends Component {
    constructor(props){
        super(props);
        this.state = {
            bilans : [],
            model : {
                dateDebut : '',
                dateFin : '',
            },
            recherche : '',
            fileName : 'bilan'
        }
        this.url = 'http://localhost:3001/bilan';
    }
    componentDidMount = () => {
        const dateTmp = new Date( Date.now());
        const model = {
            dateDebut: dateTmp.getFullYear()+'-01-01',
            dateFin : dateTmp.getFullYear()+'-12-31',
        }
        this.setState({model})
    }
    setValue = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState(model);
    }
    setRecherche = (e) => {
        this.setState({recherche:e.target.value});
    }
    lister = () => {

        const requestInfo = {
            url : this.url,
            method : 'POST',
            data : this.state.model,
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        }
        axios.request(requestInfo)
            .then( response => {
                if(response.message){
                    alert('erreur')
                }else{
                    console.log(response);
                    const bilans = [...response.data]
                    this.setState({ bilans});
                }   
            })
            .catch( e => console.log(e))
        }
    render = () => {
        return(
            <>
                <div className="container-fluid">
                    <div className="row page-titles">
                        <div className="col-md-5 align-self-center">
                            <h4 className="text-themecolor">Bilan</h4>
                        </div>
                        <div className="col-md-7 align-self-center text-right">
                            <div className="d-flex justify-content-end align-items-center">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                                <li className="breadcrumb-item active">Bilan</li>
                                </ol>
                                <ExportCSV csvData={this.state.bilans} fileName={this.state.fileName} />
                            </div>
                        </div>
                    </div>
                    <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Row>
                                <form>
                                    <label>Date debut : </label>
                                    <input type="date" value={this.state.model.dateDebut}
                                     onChange={ e => this.setValue(e, 'dateDebut')}></input>

                                    <label>Date fin : </label>
                                    <input type="date" value={this.state.model.dateFin}
                                     onChange={ e => this.setValue(e, 'dateFin')}></input>
                                    <Button variant="info" onClick={this.lister}> Lister </Button>
                                </form>
                               
                            </Row>
                            <Card.Title>Liste des Bilans</Card.Title>
                            <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                            value={this.state.recherche}
                            onChange={ e => this.setRecherche(e)} />
                            </form>
                            <div className="table-responsive">
                                    <Liste bilans={this.state.bilans} recherche={this.state.recherche}/>
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