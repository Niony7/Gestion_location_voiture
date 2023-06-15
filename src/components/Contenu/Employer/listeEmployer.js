import React, { Component} from 'react';
import { Table, Button} from 'react-bootstrap';
import ModalModification from './modalModification';
import ModalSupprimer from './modalSuppression';
import ModalSuppression from './modalSuppression';
import {ButtonIconSupprimer, ButtonIconModifier} from '../../Button-icon/ButtonIcon';
import { BsChevronCompactLeft } from 'react-icons/bs';
export default class ListeClient extends Component {
    constructor (props) {
        super(props);
        this.state = {
          currentEmployer : {
            idEmployer: "",
            nom : "",
            email : "",
            motDePasse : "",
            telephone : "",
            adresse : ""
          }
        }
        this.refModalModification = React.createRef(null);
        this.refModalSuppression = React.createRef(null);
    }

    afficheModalModification = ( client) => {
        this.refModalModification.current.changeValue(client); 
        this.refModalModification.current.handleShow();
    }
    afficheModalSuppression = (client) => {
        this.refModalSuppression.current.changeValue(client);
        this.refModalSuppression.current.handleShow();
    }
    teste = () => {
        console.log(this.props);
    }
     render = () => {
        console.log(this.modal)
        const {employers,recherche} = this.props;
        return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>id Employer</th>
                    <th>nom</th>
                    <th>prenom</th>
                    <th>Telephone</th>
                    <th>Adresse</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employers.filter(employer=>{
                            if(recherche==''){
                                return employer;
                            }else if(employer.nomEmployer.toLowerCase().includes(recherche)||
                            employer.idEmployer.toLowerCase().includes(recherche) ||
                            employer.prenomEmployer.toLowerCase().includes(recherche)||
                            employer.telephoneEmployer.toLowerCase().includes(recherche)||
                            employer.adresseEmployer.toLowerCase().includes(recherche)){
                                return employer;
                            }
                        }).map((employer, index) =>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{employer.idEmployer}</td>
                                    <td>{employer.nomEmployer}</td>
                                    <td>{employer.prenomEmployer}</td>
                                    <td>{employer.telephoneEmployer}</td>
                                    <td>{employer.adresseEmployer}</td>
                                    <td>
                                    <ButtonIconModifier onClick={ e => this.afficheModalModification(employer)}/>
                                    <ButtonIconSupprimer onClick={ e => this.afficheModalSuppression(employer)}/>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ModalModification ref={this.refModalModification} modifierEmployer={this.props.modifierEmployer} modifierEmployerAvecMotDePasse={this.props.modifierEmployerAvecMotDePasse}/>
            <ModalSupprimer ref={this.refModalSuppression} supprimerEmployer={this.props.supprimerEmployer}/>
        </>
        )
    }
}

//