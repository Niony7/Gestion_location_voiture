import {Component} from 'react';
import { Container, Col, Row, Toast, Image, Button, Form} from 'react-bootstrap';

class ImageGrid extends Component {
    constructor ( props ) {
        super ( props );
        this.state = {
            images : [],
            imagePrincipale : '',
            erreurImagePrincipale : ''
        }
    }
    imageHandleChange = async (e) => {
        if(e.target.files) {
            var images;
            console.log(this.state.images.length)
            if(this.state.images.length === 0){
                console.log("vide");
                images = [ ...e.target.files ];
            }else{

                images = [ ...this.state.images , ...e.target.files ]
            }
            this.setState ({ images : images });
            console.log(this.state.images);
        }
        this.setState({erreurImagePrincipale : ''})
    }
    validation = () => {
        let erreurImagePrincipale;
        if(!this.state.imagePrincipale){
            erreurImagePrincipale = 'vous devez selectionnner un image principale'
        }
        if(erreurImagePrincipale){
            this.setState({erreurImagePrincipale:erreurImagePrincipale});
            alert(erreurImagePrincipale)
            return false;
        }
        return true;
    }
    supprimer = (index_image) =>{
        const images = this.state.images;
        images.splice(index_image, 1);
        this.setState({images})
    }
    setValue = (e) => {
        this.setState({imagePrincipale:e.target.value})
     }
     render (){
        const images = Array.from(this.state.images).map( (image,index) => {
            return ({
                url : URL.createObjectURL(image),
                nomFichier : image.name,
                index : index
            })
            }
        );
        return(
                <Container>
                     <Row>
                        <Form>
                        <Form.Group controlId="voiture.groupe">
                        <Form.Label>Image Principale</Form.Label>
                        <Form.Control as="select" value = { this.state.imagePrincipale} onChange = { e => this.setValue( e)}>
                            <option>----------</option>
                            {
                                images.map( (image, index) => (
                                <option key={index} value={image.nomFichier}>{image.nomFichier}</option>
                                ))
                            }
                        </Form.Control>
                        <Form.Text className="text-muted">
                            {this.state.erreurImagePrincipale}
                            </Form.Text>
                        </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <h2>Image des Voiture</h2>
                    </Row>
                    <Row>
                        <input type="file" multiple id="file" onChange={ this.imageHandleChange}/>
                    </Row>
                    <Row>
                        {
                        images.map((image) => {
                            return (
                                <Col key={image.index}>
                                <Toast>
                                    <Toast.Header>
                                        <Button onClick={ e => this.supprimer(image.index)}> Supprimer</Button>
                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                        <strong className="mr-auto">{image.nomFichier}</strong>
                                    </Toast.Header>
                                    <Toast.Body><Image src={image.url}  fluid></Image>.</Toast.Body>
                                </Toast>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
        )
    }
}

export default ImageGrid;