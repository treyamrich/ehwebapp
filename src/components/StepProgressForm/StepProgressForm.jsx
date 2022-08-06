import React, { useState, Children } from 'react'
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./step_progress_form.css";

const StepProgressForm = ({children}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const stepComponents = Children.toArray(children);

    //Convert step number to percentage
    const calcPercent = () => {
      if(stepComponents.length <= 1) return 0;
      return currentStep * (100 / (stepComponents.length - 1))
    }

  return (
    <div id="progress-form" className="relative">
      <div className="w-3/4 m-auto">
      <ProgressBar percent={calcPercent()} filledBackground="#C39F7F" height={5}>
        {stepComponents.map((step, index)=>(
          <Step key={index} transition="scale">
          {({ accomplished }) => (
            <div
              className={`indexedStep flex items-center justify-center ${currentStep === index ? 'current' : ''} ${accomplished ? "accomplished" : ""}`}
            >
              <span className={currentStep || accomplished ? 'text-white' : ''}>{index + 1}</span>
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
        {stepComponents[currentStep]}
        <div className="flex justify-between mt-6">
          <button
            className={`py-3 px-4 border-1 rounded-md hover:drop-shadow-xl ${currentStep === 0 ? 'text-gray-300' : ''}`}
            onClick={()=>setCurrentStep(prevStep=>prevStep-1)}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            className="py-3 px-4 border-1 rounded-md hover:drop-shadow-xl"
            onClick={()=>setCurrentStep(prevStep=>prevStep+1)}
            style={{background: currentStep === stepComponents.length-1 ? '#4db193' : 'black' , color: 'white'}}
          >
            {currentStep === stepComponents.length-1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepProgressForm