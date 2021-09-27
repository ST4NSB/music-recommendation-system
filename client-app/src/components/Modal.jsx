import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hidePortal } from "../actions/portalState.actions";

const Modal = () => { 
    const portalState = useSelector(state => state.portalState);
    const [color, setColor] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        switch (portalState.type) {
            case 'success': {
                setColor('bg-green-500'); 
                break;
            }
            case 'error': {
                setColor('bg-red-500'); 
                break;
            } 
            default: break;
        }
    }, [portalState.type]);

    return (portalState.show) ? 
        (
            <div className={`${color} fixed bottom-11 text-md animate-popup2 w-auto left-10 mx-auto flex items-center box-border align-middle text-white shadow-lg font-bold px-8 py-3`} role="alert">
                <svg className="fill-current w-5 h-10 py-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p className="pl-3 pr-5">{portalState.message}</p>
                <span onClick={() => dispatch(hidePortal())}
                      className="float-right absolute right-0 -top-2 inline-block px-2 py-3 text-white hover:text-theme-white cursor-pointer">&#10006;</span>
            </div>
        )
    : null;
}

export default Modal;