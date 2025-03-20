import { act } from "react";
import { SELECT_SHIPMENT,SHIPPING_FROM_DETAILS,SHIPPING_TO_DETAILS } from "../actions/shippingActions";

const initialState = {
    shipFromDetails: null,
    shipToDetails: null,
    selectedShipment: null,
}

export const shippingReducer = (state = initialState, action) => {
    switch(action.type){
        case SELECT_SHIPMENT: return { ...state, selectedShipment: action.payload }
        case SHIPPING_FROM_DETAILS: return {...state, shipFromDetails: action.payload}
        case SHIPPING_TO_DETAILS: return {...state, shipToDetails: action.payload}
        default: return state;
    }
    
}

