import React,{ Component } from 'react';
import Liste from './listeAuditCategorie';
import axios from 'axios';
import {Container, Row, Button, Card} from 'react-bootstrap';
export default class CategoriesBox extends Component {
    Url = 'http://localhost:3001/auditCategorie';

    constructor(props){
        super(props);
        this.state = {
            auditCategories : [],
            recherche : '',
            fileName : 'liste audit Categorie'
        }
    }
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                if(response.data.message){
                    alert(response.data.message)
                }else{
                    this.setState({ auditCategories : response.data})
                }
               
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
                        <h4 className="text-themecolor">Audit Categorie</h4>
                    </div>
                    <div className="col-md-7 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Gestion de Location</a></li>
                            <li className="breadcrumb-item active">Audit Categorie</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <Row>
                    <div className='col-12'>
                    <Card>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                         value={this.state.recherche} onChange={ e => this.setValue(e)}/>
                                    </form>
                                </Row>
                                <Row>
                                    <Card.Title>Listes des audits categories</Card.Title>
                                    <div className="table-responsive">
                                        <Liste auditCategories={this.state.auditCategories}
                                        recherche={this.state.recherche.toLocaleLowerCase()}/>
                                    </div>
                                    </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                    </div>
                </Row>
            </div>
                
            </>
        )
    }
   
}