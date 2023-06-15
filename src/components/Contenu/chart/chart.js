import React,{ Component } from 'react';
import {Container, Card, Row, Button} from 'react-bootstrap';
import axios from 'axios';
import Chart from './chartBox';

export default class Bilan extends Component {
    constructor(props){
        super(props);
        this.state = {
            labels:[],
            dataRecette:[],
            dataDepense:[],
            dataBenefice:[],
            model : {
                dateDebut : '',
                dateFin : '',
            }
        }
        this.url = 'http://localhost:3001/bilan/chart';
    }
    componentDidMount = () => {
        const dateTmp = new Date( Date.now());
        const model = {
            dateDebut: dateTmp.getFullYear()+'-01-01',
            dateFin : dateTmp.getFullYear()+'-12-31',
            recherche : ''
        }
        this.setState({model})
    }
    setValue = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState(model);
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
                    this.setState({labels:response.data.labels});
                    this.setState({dataBenefice:response.data.dataBenefice});
                    this.setState({dataDepense:response.data.dataDepense});
                    this.setState({dataRecette:response.data.dataRecette})
                    //this.setState({ bilans});
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
                            <h4 className="text-themecolor">Histogramme</h4>
                        </div>
                        <div className="col-md-7 align-self-center text-right">
                            <div className="d-flex justify-content-end align-items-center">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                                <li className="breadcrumb-item active">Histogramme</li>
                                </ol>
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
                            <Card.Title>Bilan en histogramme</Card.Title>

                            <Chart labels={this.state.labels} dataBenefice={this.state.dataBenefice}
                            dataRecette={this.state.dataRecette} dataDepense={this.state.dataDepense}/>
                        </Card.Body>
                    </Card>
                    </div>
                    </Row>
                   
                </div>
            </>
        )
    }
}