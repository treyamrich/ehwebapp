import React, { useState } from 'react';

function POAdjustHistory({adjustments}) {

    return (
        <div>
            {adjustments && adjustments.map((elm, idx)=>{
                <ul key={idx}>
                    <li>{elm.adjAmt}</li>
                    <li>{elm.reason}</li>
                    <li>{elm.adjDate}</li>
                </ul>
            })}
        </div>
    );
}

export default POAdjustHistory;