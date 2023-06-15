import {Component} from 'react';
import { Container, Col, Row, Toast, Image, Button} from 'react-bootstrap';

class ImageGrid extends Component {
    constructor ( props ) {
        super ( props );
        this.state = {
            images : []
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
    }
    supprimer = (index_image) =>{
        const images = this.state.images;
        images.splice(index_image, 1);
        this.setState({images})
    }
     render (){
        const images = Array.from(this.state.images).map( (image,index) => {
            return ({
                url : URL.createObjectURL(image),
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
                                        <strong className="mr-auto">{image.index}</strong>
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