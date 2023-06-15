import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi'
import * as BsIcons from 'react-icons/bs'
import {Link} from 'react-router-dom'

export function ButtonIconVoir({...rest}){
    return(
        <button className="btn btn-success btn-icon"
        {...rest} title="detail"><div className="btn-content"><AiIcons.AiOutlineEye/></div></button>
    )
}

export function ButtonIconSupprimer({...rest}){
    return(
        <button className="btn btn-danger btn-icon"
        {...rest} title="supprimer"><div className="btn-content"><AiIcons.AiOutlineDelete/></div></button>
    )
}

export function ButtonIconModifier({...rest}){
    return(
        <button className="btn btn-primary btn-icon"
        {...rest} title="modifier"><div className="btn-content"><FiIcons.FiEdit/></div></button>
    )
}
export function LinkIconModifier({...rest}){
    return(
        <Link className="btn btn-primary btn-icon"
        {...rest} title="modifier"><div className="btn-content"><FiIcons.FiEdit/></div></Link>
    )
}

export function ButtonIconEnd({...rest}){
    return(
        <button className="btn btn-primary btn-icon"
        {...rest} title='terminer location'><div className="btn-content"><BsIcons.BsSkipEnd/></div></button>
    )
}
export function ButtonIconPaye({...rest}){
    return(
        <button className="btn btn-success btn-icon"
        {...rest} title="payer location"><div className="btn-content"><BsIcons.BsBookmark/></div></button>
    )
}
