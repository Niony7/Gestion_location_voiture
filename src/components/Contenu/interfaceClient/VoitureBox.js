import { Component } from 'react';
import { Container, Row} from 'react-bootstrap';
import ListeVoiture from './ListeVoiture';
import axios from 'axios';

class VoitureBox extends Component {
    Url = "http://localhost:3001/voiture";
    constructor(props){
        super(props);
        this.state = {
            voitures : []
        }
    }
    
    componentDidMount() {
        axios.get(this.Url)
            .then( (response) => {
                console.log("voituressssssss");
                console.log(response.data)
                this.setState({ voitures : response.data})
            })
            .catch( e => console.log(e))
    }
    delete = (id_voiture) => {
        const requestInfo = {
            url : this.Url,
            method : 'DELETE',
            params : {id_voiture : id_voiture},
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        axios.request(requestInfo)
            .then( response => {
                if( response.status === 200) {
                    const voitures = this.state.voitures.filter( voiture => voiture.id_voiture !== id_voiture);
                    this.setState({ voitures });
                }
            })
    }
    render () {
        return(
            <Container>
                <Row>
                    <h3>Liste des Voiture</h3>
                    <ListeVoiture voitures={this.state.voitures} supprimerVoiture={this.delete}/>
                </Row>
            </Container>
        )
    }
}

export default VoitureBox;