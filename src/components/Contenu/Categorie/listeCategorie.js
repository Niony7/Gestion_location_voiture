import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './modalModification';
import ModalSupprimer from './modalSupprimer';
import {ButtonIconSupprimer, ButtonIconModifier} from '../../Button-icon/ButtonIcon';
export default class ListeCategorie extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentCategorie : {
            idCategorie : "",
            nomCategorie : ""
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSupprimer = React.createRef(null);
    }
    afficheModalModification = ( categorie) => {
        this.refModalModification.current.changeValue(categorie);
        this.refModalModification.current.handleShow();
    }
    afficheModalSupprimer = (categorie) => {
        this.refModalSupprimer.current.changeValue(categorie);
        this.refModalSupprimer.current.handleShow();
    }
     render = () => {
        const { categories, recherche } = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Numero Categorie</th>
                    <th>Nom Categorie</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.filter((categorie)=> {
                            if(recherche === ''){
                                return categorie;
                            }else if(categorie.idCategorie.toLowerCase().includes(recherche) ||
                            categorie.nomCategorie.toLowerCase().includes(recherche)){
                                return categorie;
                            }
                        }).map( (categorie, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{categorie.idCategorie}</td>
                                <td>{categorie.nomCategorie}</td>
                                <td>
                                    <ButtonIconModifier onClick={ e => this.afficheModalModification(categorie)}/>
                                    <ButtonIconSupprimer onClick={ e => this.afficheModalSupprimer(categorie)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierCategorie={this.props.modifierCategorie}/>
            <ModalSupprimer ref={this.refModalSupprimer} supprimerCategorie={this.props.supprimerCategorie}/>
        </>
        )
    }
}
