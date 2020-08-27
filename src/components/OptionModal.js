import React from 'react';
import Modal from 'react-modal';

//react model exposes react components as model components

Modal.setAppElement(document.getElementById('app'))


//stateless functional component,with shorthand return syntax using (),used when we are only returning
//old
// const OptionModal = () => {
//    return (
//        <div>
//        some text.
//        </div>
//    )
// };

//new
// const OptionModal = () => (
//         <div>
//         some text.
//         </div>
    
// );


const OptionModal = (props) => (
    //constentlabel is not shown in the browser but on devices having assessiblity feature on
    //onRequestClose when user clicks escape or the background
    //closeTimeoutMS gives the amount to wait time before cutting the div of modal when okay button or esc is pressed , so we can apply transition effect on close
    //className to define our custom styles easily,due to this react modal will not use its own default styles
   <Modal
   isOpen={!!props.selectedOption}
   onRequestClose={props.handleClearSelectedOption}
   contentLabel="Selected Option"
   closeTimeoutMS={200}
   className="modal">
   <h3 className="modal__title">Selected Option</h3>
   {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
   <button className="button" onClick={props.handleClearSelectedOption}>Okay</button>
   </Modal>

);
 export default OptionModal;