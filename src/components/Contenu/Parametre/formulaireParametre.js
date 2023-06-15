import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class formulaire extends Component {
    state = {
        model : {
            ancienIdentifiant: "",
            ancienMotDePasse : "",
            nouveauIdentifiant : "",
            nouveauMotDePasse: ""
        },
        erreur : {
            ancienIdentifiant: "",
            ancienMotDePasse : "",
            nouveauIdentifiant : "",
            nouveauMotDePasse: ""
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
            ancienIdentifiant: "",
            ancienMotDePasse : "",
            nouveauIdentifiant : "",
            nouveauMotDePasse: ""
        };
        if(!this.state.model.ancienIdentifiant){
            erreur.ancienIdentifiant = "veillez informer l' ancien identifiant";
        }
        if(!this.state.model.ancienMotDePasse){
            erreur.ancienMotDePasse = "veillez informer l' ancien mot de passe";
        }
        if(!this.state.model.nouveauIdentifiant){
            erreur.nouveauIdentifiant = "veillez informer le nouveau indentifiant";
        }
        if(!this.state.model.nouveauMotDePasse){
            erreur.nouveauMotDePasse = "veillez informer le nouveau mot de passe";
        }
        if(erreur.ancienIdentifiant || erreur.ancienMotDePasse || erreur.nouveauIdentifiant || erreur.nouveauMotDePasse){
            this.setState({erreur});
            return false;
        }else{
            return true;
        }
       
    }
    update = async () => {
        const validee = this.validation();
        console.log(validee)
        if(validee){
            await this.props.modifierCompte(this.state.model);
            let model = {
                ancienIdentifiant: "",
                ancienMotDePasse : "",
                nouveauIdentifiant : "",
                nouveauMotDePasse: ""
            }
            this.setState({model})
        }
    }
    render () {
        return (
            <Form>
                <Form.Group controlId="ancienIdentifiant">
                    <Form.Label>Identifiant Actuel</Form.Label>
                    <Form.Control type="text" value={this.state.model.ancienIdentifiant}
                    onChange={ e => this.setValue(e, 'ancienIdentifiant') } placeholder="identifiant actuel" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.ancienIdentifiant}
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="ancienMotDePasse">
                    <Form.Label>Mot de Passe Actuel</Form.Label>
                    <Form.Control type="text" value={this.state.model.ancienMotDePasse} 
                    onChange={ e => this.setValue(e, 'ancienMotDePasse') } placeholder="mot de Passe actuel" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.ancienMotDePasse}
                    </Form.Text>
                </Form.Group>
                <br/>
                <Form.Group controlId="nouveauIdentifiant">
                    <Form.Label>Nouveau Identifiant </Form.Label>
                    <Form.Control type="text" value={this.state.model.nouveauIdentifiant}
                    onChange={ e => this.setValue(e, 'nouveauIdentifiant') } placeholder="nouveau identifiant" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.nouveauIdentifiant}
                    </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="nouveauMotDePasse">
                    <Form.Label>Nouveau Mot de Passe</Form.Label>
                    <Form.Control type="text" value={this.state.model.nouveauMotDePasse} 
                    onChange={ e => this.setValue(e, 'nouveauMotDePasse') } placeholder="nouveau mot de Passe" />
                    <Form.Text className="text-muted">
                    {this.state.erreur.nouveauMotDePasse}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={this.update}>Modifier </Button>
            </Form>
        )
    }   
}

export default formulaire;