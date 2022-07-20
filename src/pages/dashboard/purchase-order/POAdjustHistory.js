import React from 'react';

function POAdjustHistory({adjustments}) {
    
    return (
        <div>
            {adjustments && adjustments.map((elm, idx)=>(
                <ul key={idx}>
                    <li>{elm.adjAmt > 0 ? "+" : ""}{elm.adjAmt}</li>
                    <li>Reason: {elm.reason ? elm.reason : "None"}</li>
                    <li>Date: {elm.adjDate}</li>
                </ul>
            ))}
        </div>
    );
}

export default POAdjustHistory;