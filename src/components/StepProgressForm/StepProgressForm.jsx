import React, { useRef, useState, Children } from 'react'
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./step_progress_form.css";

const StepProgressForm = ({children}) => {
    const [currStep, setCurrStep] = useState(0);
    const stepStack = useRef([]);
    const stepComps = Children.toArray(children);

    //Convert step number to percentage
    const calcPercent = () => {
      if(stepComps.length <= 1) return 0;
      return currStep * (100 / (stepComps.length - 1))
    }

    const handleNextStep = () => {
      let validateFunc = stepComps[currStep].props.validateStep;
      let confirmFunc = stepComps[currStep].props.confirmStep;
      //Validate the step first
      if(validateFunc && validateFunc() || !validateFunc) {
        if(stepComps[currStep].props.shouldConfStep) {
          try {
            let skipAmt = stepComps[currStep].props.skipStepAmt;
            skipAmt = skipAmt ? skipAmt : 1;  
            confirmFunc(() => {
              setCurrStep(prevStep => prevStep + skipAmt);
              stepStack.current.push(skipAmt);
          });
          } catch(e) { console.log(e) }
        } else {
          setCurrStep(prevStep=>prevStep+1);
        }
      }
    }
    const handleBackStep = () => {
      let stepAmt = stepStack.current.length > 0 ? 
        stepStack.current.pop() : 1;
      setCurrStep(prevStep => prevStep - stepAmt);
    }
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
      <div className="mt-32">
        
        {stepComps[currStep]}

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">{stepComps[currStep].props.stepTip}</p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className={`py-3 px-4 border-1 rounded-md hover:drop-shadow-xl ${currStep === 0 ? 'text-gray-300' : ''}`}
            onClick={handleBackStep}
            disabled={currStep === 0}
          >
            Back
          </button>
          <button
            className="py-3 px-4 border-1 rounded-md hover:drop-shadow-xl"
            onClick={handleNextStep}
            style={{background: currStep === stepComps.length-1 ? '#4db193' : 'black' , color: 'white'}}
          >
            {currStep === stepComps.length-1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepProgressForm