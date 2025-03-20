
export const SELECT_SHIPMENT = "SELECT_SHIPMENT";
export const SHIPPING_FROM_DETAILS = "SHIPPING_FROM_DETAILS"
export const SHIPPING_TO_DETAILS = "SHIPPING_TO_DETAILS"

// Action to Store Selected Shipment
export const selectShipment = (shipmentDetails) => {
  return {
    type: SELECT_SHIPMENT,
    payload: shipmentDetails,
  };
};

export const shippingFromDetails = (shipmentDetails) => {
    return {
      type: SHIPPING_FROM_DETAILS,
      payload: shipmentDetails,
    };
  };

  export const shippingToDetails = (shipmentDetails) => {
    return {
      type: SHIPPING_TO_DETAILS,
      payload: shipmentDetails,
    };
  };