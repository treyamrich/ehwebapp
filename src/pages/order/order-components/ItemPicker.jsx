import React, { useState, useEffect } from 'react'
import { fetchItems } from '../../../data/APICalls';
import { listItems } from '../../../graphql/queries';
import { useStateContext } from '../../../contexts/ContextProvider';
import { EH_COLOR_DARK, AUTH_MODE_IAM } from '../../../data/uidata';
import { Page, CardSelector } from '../../../components';

import { firstLetterUppercase } from '../../../utility/Strings';
import { Navigate } from 'react-router-dom';

const ItemPicker = ({ itemCategory, selItem, setSelItem }) => {
    const { opRes, setOpRes } = useStateContext();
    const [redirect, setRedirect] = useState(false);
    const [choices, setChoices] = useState([]);
    const urlTokens = window.location.href.split('/');
    const pageName = urlTokens[urlTokens.length-1]
        .split('-')
        .map(word => firstLetterUppercase(word))
        .join(' ');

    const fetchInventoryItems = async () => {
        //Get items
        const items = await fetchItems(
            {listItems},
            AUTH_MODE_IAM,
            err=>setOpRes({...opRes, failureMsg: "Error: Could not fetch items."}),
            { //Query by item category
                filter: {
                    category: {
                        eq: itemCategory
                    }
                }
            }
        );
        setChoices(items);
    } 
    useEffect(()=>{
        fetchInventoryItems();
    }, [itemCategory]);
    
    if(redirect) return <Navigate to="/order/customize"/>;
    return (
        <Page category="Choose to Customize" title={pageName}>
            <CardSelector 
                color={EH_COLOR_DARK}
                items={choices} 
                setItems={setChoices}
                orientation="vertical"
                selectedCard={selItem}
                setSelectedCard={setSelItem}
                isCardDisabled={item => item.qty < 1}
                cmpField="name"
                onSelect={()=>setRedirect(true)}
                emptyMsg="No items"
            />
        </Page>
    )
}

export default ItemPicker