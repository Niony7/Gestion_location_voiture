import React, {useState} from 'react';
import {Form, Button,Container, Card} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
function Authentification (props){
    const [identifiant, setIdentifiant] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('op');
    let history = useHistory();
    axios.defaults.withCredentials = true;
   const login = () =>{
        axios.post('http://localhost:3001/authentification', {
            identifiant : identifiant,
            motDePasse : motDePasse
        })
        .then((response) => {
            if(response.data.message){
                setErreur(response.data.message);
            }else if(response.data.admin) {
                props.setLoginStatus(true);
                props.setAdminStatus(true);
                history.push('/location');
            }else{
                props.setLoginStatus(true);
                history.push('/location');
            }
           
        })
        .catch( e => console.log(e))
    }
    return (
        <>
            <Container>
            <div className="authentification-fluid">
                <Card>
                    <Card.Body>
                      <Container>
                            <Form>
                            <Form.Group controlId="identifiant">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Entrer identifiant" onChange={ e => setIdentifiant(e.target.value)}/>
                                <Form.Text className="text-muted">
                               identifiant de l' entreprise
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={ e => setMotDePasse ( e.target.value)}/>
                            </Form.Group>
                           
                            <Button variant="primary" onClick={ login }>
                               Connecter
                            </Button>
                        </Form>
        
                        <h6>{erreur}</h6>
                    </Container>
                    </Card.Body>

                    </Card>
                    </div>
        </Container>
        </>
    )
}
export default Authentification;