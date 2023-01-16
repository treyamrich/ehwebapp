import React, { useRef, useEffect} from 'react'
import './alert.css';
import { AiOutlineClose } from 'react-icons/ai';

const DEFAULT_DURATION = 10;

const Alert = ({children, variant, dismissible, onClose, duration, size}) => {

  const timer = useRef();

  const startTimer = () => {
    //On timeout, stop the timer and close the alert
    timer.current = setTimeout(()=>{
      clearTimeout(timer.current);
      if(onClose) onClose();
    }, 1000 * (duration ? duration : DEFAULT_DURATION));
  }
  useEffect(()=>{
    if(!dismissible) return;
    startTimer();
    return ()=> clearTimeout(timer.current);
  }, []);

  const handleCloseAlert = () => {
    if(onClose) onClose();
  }
  return (
    <div className={`${variant} alert ${dismissible ? 'alert-dismissible' : ''} ${size === 'small' ? 'small-padding' : 'normal-padding'}`}
      role="alert" aria-label="Close alert" 
    >
      
        {dismissible ? <button className="px-4 py-5 absolute top-0 right-0 box-border"
          onClick={handleCloseAlert}
        >
          <AiOutlineClose className="text-2xl" />
        </button> : null}
        {children}
    </div>
  )
}

export default Alert