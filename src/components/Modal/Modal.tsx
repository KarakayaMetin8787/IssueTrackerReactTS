import { useModalContext } from "../../context/ModalContext";
import "./Modal.scss"

const Modal = ({ Infotext }: { Infotext: String }) => {

    const { changeClass, setChangeClass } = useModalContext();

    const displayNone = () => {
        setChangeClass("")
    }

    return ( 
        <div id="ModalContainerID" className={`ModalContainer ${changeClass}`}>
            <p>{Infotext}</p>
            <button onClick={() => displayNone()}>OK</button>
        </div>
    );
}
 
export default Modal;