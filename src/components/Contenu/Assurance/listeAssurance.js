import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './ModalModification';
import ModalSupprimer from './modalSupprimer';
import {ButtonIconSupprimer, ButtonIconModifier, ButtonIconEnd} from '../../Button-icon/ButtonIcon';
export default class ListeAssurance extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentAssurance : {
            idAssurance : "",
            agence : "",
            dateDebutAssurance : '',
            dateFinAssurance : '',
            idVoiture : "",
            coutAssurance : 0,
            datePayementAssurance : ''
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSupprimer = React.createRef(null);

    }
    afficheModalModification = (assurance) => {
        this.refModalModification.current.changeValue(assurance);
        this.refModalModification.current.handleShow(); 
    }
    afficheModalSuppression = (assurance) => {
        this.refModalSupprimer.current.changeValue(assurance);
        this.refModalSupprimer.current.handleShow();    
    }
     render = () => {
        console.log(this.modal)
        const { assurances, recherche } = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Agence</th>
                    <th>Debut</th>
                    <th>Fin</th>
                    <th>Voiture</th>
                    <th>Payement</th>
                    <th>Cout</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assurances.filter( (assurance)=> {
                            if(recherche === ''){
                                return assurance;
                            }else if(assurance.voiture.toLowerCase().includes(recherche) ||
                            assurance.agence.toLowerCase().includes(recherche)){
                                return assurance;
                            }
                        }).map( (assurance, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{assurance.agence}</td>
                                <td>{assurance.dateDebutAssurance}</td>
                                <td>{assurance.dateFinAssurance}</td>
                                <td>{assurance.voiture}</td>
                                <td>{assurance.datePayementAssurance}</td>
                                <td>{assurance.coutAssuranceL + ' Ar'}</td>
                                <td>
                                    <ButtonIconModifier onClick={ e => this.afficheModalModification(assurance)}/>
                                    <ButtonIconSupprimer  onClick={ e => this.afficheModalSuppression(assurance)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierAssurance={this.props.modifierAssurance}/>
            <ModalSupprimer ref={this.refModalSupprimer} supprimerAssurance={this.props.supprimerAssurance}></ModalSupprimer>
        </>
        )
    }
}

//