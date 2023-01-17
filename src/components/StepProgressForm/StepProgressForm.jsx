import React, { useRef, useState, useEffect, Children } from 'react'
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./step_progress_form.css";

/*StepProgressForm props

:onSubmit - a function that is called when the form is submitted. The function
  should take a callback function as a parameter to reset the form
  
:onCancel - a function that is called when the form is at step 0, 
  and the user pressed the back button.

:cancelMsg - a string to display for the cancel button at step 0

:submitMsg - a string to display for the submit button at final step

:resetHook - a state hook which the step form will listen for a true value.
  When the value is true the form will reset.
:shouldReset - a function that checks returns a bool using the resetHook
*/
const StepProgressForm = ({ children, onSubmit, onCancel, cancelMsg, submitMsg, shouldReset, resetHook }) => {
    const [currStep, setCurrStep] = useState(0);
    const stepStack = useRef([]);
    const stepComps = Children.toArray(children);
    const atFirstStep = currStep === 0;
    const atLastStep = currStep === stepComps.length-1;

    //Convert step number to percentage
    const calcPercent = () => {
      if(stepComps.length <= 1) return 0;
      return currStep * (100 / (stepComps.length - 1))
    }
    //Advances the step form
    const advanceStep = stepSize => {
      setCurrStep(prevStep => prevStep + stepSize);
      stepStack.current.push(stepSize);
    }
    //Confirms a step if it should be confirmed. If it should, it will use the skipStepAmt.
    //If no confirmation or skipStepAmt is provided, the step size is 1.
    const handleNextStep = () => {
      let confirmFunc = stepComps[currStep].props.confirmStep;
      if(stepComps[currStep].props.shouldConfStep) {
        try {
          let stepSize = stepComps[currStep].props.skipStepAmt;
          stepSize = stepSize ? stepSize : 1;
          confirmFunc(()=>advanceStep(stepSize));
        } catch(e) { console.log(e) }
      } else {
        advanceStep(1);
      }
    }
    const handleBackStep = () => {
      //If stepping back is not allowed
      if(atFirstStep) {
        if(onCancel) {
          try {
            onCancel();
          } catch(e) {console.log(e)}
        }
      } else {
        let stepAmt = stepStack.current.pop(); 
        setCurrStep(prevStep => prevStep - stepAmt);
      }
    }
    const resetStepForm = () => {
      setCurrStep(0);
      stepStack.current = [];
    }
    const handleSubmit = () => resetStepForm();
    
    //Reset the form if signaled
    useEffect(()=>{
      if(shouldReset && shouldReset()) resetStepForm();
    }, [resetHook]);
  return (
    <div id="progress-form" className="relative">
      <div className="w-3/4 m-auto">
      <ProgressBar percent={calcPercent()} filledBackground="#C39F7F" height={5}>
        {stepComps.map((step, index)=>(
          <Step key={index} transition="scale">
          {({ accomplished }) => (
            <div
              className={`indexedStep flex items-center justify-center ${currStep === index ? 'current' : ''} ${accomplished ? "accomplished" : ""}`}
            >
              <span className={currStep || accomplished ? 'text-white' : ''}>{index + 1}</span>
              <div className="absolute text-center step-num text-sm">
                {step.props.stepName}
              </div>
            </div>
          )}
          </Step>
        ))}
        </ProgressBar>
      </div>
      <div className="mt-28">
        
        {stepComps[currStep]}

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">{stepComps[currStep].props.stepTip}</p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className={`py-3 px-4 border-1 rounded-md hover:drop-shadow-xl ${atFirstStep ? onCancel ? 'bg-red-600 text-white' : 'text-gray-300' : ''}`}
            onClick={handleBackStep}
            disabled={!onCancel && atFirstStep}
          >
            {atFirstStep && onCancel ? cancelMsg : "Back"}
          </button>
          <button
            className="py-3 px-4 border-1 rounded-md hover:drop-shadow-xl"
            onClick={atLastStep ? handleSubmit : handleNextStep}
            style={{background: atLastStep ? '#4db193' : 'black' , color: 'white'}}
          >
            {atLastStep ? submitMsg ? submitMsg : "Submit" : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepProgressForm