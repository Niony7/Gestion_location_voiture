import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class formulaire extends Component {
    constructor (props){
        super(props);
        this.state = {
            model : {
               id_visite: "",
               date_debut : Date.now(),
               date_fin : Date.now(),
               id_voiture : "",
               cout : 0,
            },
            voitures : [] 
        }
        this.Url = 'http://localhost:3001/voiture';
    }
    componentDidMount(){
        axios.get(this.UrlCategorie)
            .then(response => {
                console.log(response.data);
                this.setState({voitures : response.data})
            })
            .catch(e => console.log(e))
    }
    
    setValue = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState(model);
        console.log(this.state.model);
    }
    create = () => {
        console.log(this.props);
        this.props.ajouterVisite(this.state.model);
    }
    render () {
        const {voitures} = this.state;
        return (
            <Form>
                <Form.Group controlId="id_visite">
                    <Form.Label>ID visite</Form.Label>
                    <Form.Control type="text" value={this.state.model.id_assurance}
                    onChange={ e => this.setValue(e, 'id_visite') } placeholder="id visite" />
                </Form.Group>
                <Form.Group controlId="date_debut">
                    <Form.Label>Date debut </Form.Label>
                    <Form.Control type="date" value={this.state.model.date_debut} 
                    onChange={ e => this.setValue(e, 'date_debut') } placeholder="" />
                </Form.Group>
                <Form.Group controlId="date_fin">
                    <Form.Label>Date Fin </Form.Label>
                    <Form.Control type="date" value={this.state.model.date_fin} 
                    onChange={ e => this.setValue(e, 'date_fin') } placeholder="" />
                </Form.Group>
                <Form.Group controlId="id_voiture">
                            <Form.Label>Voiture</Form.Label>
                            <Form.Control as="select" value = { this.state.model.id_voiture} onChange = { e => this.setValue( e, 'id_voiture')}>
                            <option>----------</option>
                            {
                               voitures.map( (voiture) => (
                                   <option key={voiture.id_voiture}>{voiture.immatriculation}</option>
                               ))
                            }
                            </Form.Control>
                </Form.Group>
                            <Form.Group controlId="cout">
                            <Form.Label>Cout</Form.Label>
                            <Form.Control type="number" value={this.state.model.cout}
                            onChange={ e => this.setValue(e, 'cout') } placeholder="cout" />
                        </Form.Group>
                <Button variant="primary" onClick={this.create}>Ajouter </Button>   
            </Form>
        )
    }   
}

export default formulaire;