import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class formulaire extends Component {
    state = {
        model : {
            idCategorie : "",
            nomCategorie : ""
        },
        erreur : {
            idCategorie : "",
            nomCategorie : ""
        }
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
            idCategorie : '',
            nomCategorie : ''
        };
        if(!this.state.model.idCategorie){
            erreur.idCategorie = 'le numero de la categorie ne doit pas etre vide';
        }
        if(!this.state.model.nomCategorie){
            erreur.nomCategorie = 'le nom de la categorie ne doit pas etre vide';
        }
        if(erreur.numCategorie || erreur.nomCategorie){
            this.setState({erreur});
            return false;
        }else{
            return true;
        }
       
    }
    create = async () => {
        const validee = this.validation();
        console.log(validee)
        if(validee){
            await this.props.ajouterCategorie(this.state.model);
            let model = {
                idCategorie : '',
                nomCategorie : ''
            }
            this.setState({model})
        }
    }
    render () {
        return (
            <Form>
                <Form.Group controlId="num_categorie">
                    <Form.Label>ID Categorie</Form.Label>
                    <Form.Control type="text" value={this.state.model.idCategorie}
                    onChange={ e => this.setValue(e, 'idCategorie') } placeholder="Numero de la Categorie" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.idCategorie}
                    </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="nom_categorie">
                    <Form.Label>Categorie</Form.Label>
                    <Form.Control type="text" value={this.state.model.nomCategorie} 
                    onChange={ e => this.setValue(e, 'nomCategorie') } placeholder="Nom de la Categorie" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.nomCategorie}
                    </Form.Text>
                </Form.Group>
                
                <Button variant="primary" onClick={this.create}>Ajouter </Button>
            </Form>
        )
    }   
}

export default formulaire;