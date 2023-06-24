import { useState } from "react";
import Button from "../Button";
import './styles.css';

interface ModalProps {
  handleOnSave: () => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  buttonText: string;
  contentText: string;
  title: string;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = (props: ModalProps) => {

  const { handleOnSave, inputValue, setInputValue, buttonText, contentText, title, showModal } = props
  const [inputType, setInputType] = useState("password");
  
  const toggleInputType = () => {
    if (inputType == "password") setInputType("text");
    else setInputType("password");
  }

  return (
    <div className="modal-container">
      <div className="modal-save-user flex-column ai-center">
        <a className="flex-row exit-modal-btn" onClick={() => showModal(false)}>
          <img src="./exit.svg" alt="show-password"/>  
        </a>
        <h2 className="modal-header">{title}</h2>
        <div className="modal-content flex-column ai-center">
          <p>
            {contentText}
          </p>
          <div className="flex-row">
            <input className="input-username modal-input" type={inputType} onChange={(e) => setInputValue(e.target.value)} value={inputValue}></input>
            <a onClick={() => toggleInputType()}>
              <img src="./eye.svg" alt="show-password"/>  
            </a>
          </div>
          <Button text={buttonText} className="user-detail-edit_button" onClick={handleOnSave}/>
        </div>
      </div>
    </div> 
  )
}

export default Modal;