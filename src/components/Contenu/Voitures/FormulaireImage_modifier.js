import {Component} from 'react';
import { Container, Col, Row, Toast, Image, Button, Form} from 'react-bootstrap';
import axios from 'axios';

class FormulaireImage extends Component {
    Url = 'http://localhost:3001/voiture';

    constructor ( props ) {
        super ( props );
        this.state = {
            ancienImages : [],
            nouveauImages : [],
            imagePrincipale : '',
            erreurImagePrincipale : ''
        }
        this.images_a_supprimer=[]
    }
    fermerImage = async (image) => {
        const ancienImages = this.state.ancienImages;
        const index_suppr = ancienImages.indexOf(image);
        const supprimer=ancienImages.splice(index_suppr, 1);
        this.images_a_supprimer.push(supprimer[0]);
        this.setState({ancienImages});
    }
    componentDidMount(){
        axios.get('http://localhost:3001/voiture/'+this.props.idVoiture)
        .then( async (response) => {
            var ancienImages = [];
            response.data.images.forEach( async (image) => {
                ancienImages.push(image.idImage);
            });
            this.setState({ancienImages});
        })
        .catch( e => console.log(e))
    }
    setValue = (e) => {
       this.setState({imagePrincipale:e.target.value})
    }
    changeValueImagePrincipale = (image) =>{
        this.setState({imagePrincipale:image})
        if(this.state.erreurImagePrincipale){
            this.setState({erreurImagePrincipale:''});
        }
    }
    validation = () =>{
        let erreurImagePrincipale;
        if(!this.state.imagePrincipale){
            erreurImagePrincipale = 'veuillez selectionner un image principale';
        }
        if(erreurImagePrincipale){
            this.setState({erreurImagePrincipale});
            return false;
        }
        return true;
    }
    imageHandleChange = async (e) => {
        if(e.target.files) {
            var nouveauImages;
            console.log(this.state.nouveauImages.length)
            if(this.state.nouveauImages.length === 0){
                console.log("vide");
                nouveauImages = [ ...e.target.files ];
            }else{

                nouveauImages = [ ...this.state.nouveauImages , ...e.target.files ]
            }
            this.setState ({ nouveauImages });
            //console.log(this.state.images);
        }
    }
    supprimer = (index_image) =>{
        const nouveauImages = this.state.nouveauImages;
        nouveauImages.splice(index_image, 1);
        this.setState({nouveauImages});
    }
    render = () => {
        const {ancienImages} = this.state;
        const {nouveauImages} = this.state;
        return(
            <>
            <Row>
                        <Form>
                        <Form.Group controlId="voiture.groupe">
                        <Form.Label>Image Principale</Form.Label>
                        <Form.Control as="select" value = { this.state.imagePrincipale} onChange = { e => this.setValue( e)}>
                            <option>----------</option>
                            {
                                ancienImages.map( (image) => (
                                <option key={image} value={image}>{'image '+ image}</option>
                                ))
                            }
                             {
                                nouveauImages.map( (image, index) => (
                                <option key={index} value={image.name}>{image.name}</option>
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
                <AncienImage idVoiture={this.props.idVoiture} changeValueImagePrincipale={this.changeValueImagePrincipale}
                 setValue={this.setValue} fermerImage={this.fermerImage} images={this.state.ancienImages}></AncienImage>
            </Row>
            <Row>
               <NouveauImages images={this.state.nouveauImages} imageHandleChange={this.imageHandleChange} supprimer={this.supprimer}></NouveauImages>
            </Row>
            </>
        )
    }
}

class AncienImage extends Component {
    UrlImage =  'http://localhost:3001/image';
     render (){
        const {images} = this.props;
        return(
                <Container>
                    
                    <Row>
                        <h2>ancien des Voiture</h2>
                    </Row>
                    <Row>
                    { 
                        images.map((image) => {
                            return (
                               
                                <Col key={image}>
                                <Toast>
                                    <Toast.Header>
                                        <Button  variant="primary" onClick={e => this.props.fermerImage(image)}>supprimer</Button>
                                        <strong className="mr-auto">{'image ' + image}</strong>
                                        <small></small>
                                    </Toast.Header>
                                    <Toast.Body><Image src={this.UrlImage+"/"+image}  fluid></Image>.</Toast.Body>
                                </Toast>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
        )
    }
}

class NouveauImages extends Component {


     render (){
        const images = Array.from(this.props.images).map( (image,index) => {
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
                        <h2>Image des Voiture</h2>
                    </Row>
                    <Row>
                        <input type="file" multiple id="file" onChange={ this.props.imageHandleChange}/>
                    </Row>
                    <Row>
                        {
                        images.map((image) => {
                            return (
                                <Col key={image.index}>
                                <Toast>
                                    <Toast.Header>
                                        <Button onClick={ e => this.props.supprimer(image.index)}> Supprimer</Button>
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

export default FormulaireImage;