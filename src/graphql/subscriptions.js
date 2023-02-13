/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders {
    onCreateOrders {
      id
      createdAt
      orderNum
      name
      phone
      email
      dateNeeded
      timeNeeded
      location
      status
      rushStatus
      cart {
        name
        code
        price
        services {
          name
          qty
        }
        subItems {
          name
          code
          price
          quantity
          txtLines
          layoutImg
          graphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        layoutImg
        graphics
        postTxt
        postLayout
      }
      notes
      updatedAt
    }
  }
`;
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders {
    onUpdateOrders {
      id
      createdAt
      orderNum
      name
      phone
      email
      dateNeeded
      timeNeeded
      location
      status
      rushStatus
      cart {
        name
        code
        price
        services {
          name
          qty
        }
        subItems {
          name
          code
          price
          quantity
          txtLines
          layoutImg
          graphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        layoutImg
        graphics
        postTxt
        postLayout
      }
      notes
      updatedAt
    }
  }
`;
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders {
    onDeleteOrders {
      id
      createdAt
      orderNum
      name
      phone
      email
      dateNeeded
      timeNeeded
      location
      status
      rushStatus
      cart {
        name
        code
        price
        services {
          name
          qty
        }
        subItems {
          name
          code
          price
          quantity
          txtLines
          layoutImg
          graphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        layoutImg
        graphics
        postTxt
        postLayout
      }
      notes
      updatedAt
    }
  }
`;
export const onCreateOrderChoice = /* GraphQL */ `
  subscription OnCreateOrderChoice {
    onCreateOrderChoice {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrderChoice = /* GraphQL */ `
  subscription OnUpdateOrderChoice {
    onUpdateOrderChoice {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrderChoice = /* GraphQL */ `
  subscription OnDeleteOrderChoice {
    onDeleteOrderChoice {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePurchaseOrder = /* GraphQL */ `
  subscription OnCreatePurchaseOrder {
    onCreatePurchaseOrder {
      id
      vendorId
      date
      orderedProducts {
        itemCode
        itemName
        numPurchased
        unitCost
        totalCost
        numReceived
        receivedDate
        goodTill
        adjustments {
          adjAmt
          reason
          adjDate
        }
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePurchaseOrder = /* GraphQL */ `
  subscription OnUpdatePurchaseOrder {
    onUpdatePurchaseOrder {
      id
      vendorId
      date
      orderedProducts {
        itemCode
        itemName
        numPurchased
        unitCost
        totalCost
        numReceived
        receivedDate
        goodTill
        adjustments {
          adjAmt
          reason
          adjDate
        }
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePurchaseOrder = /* GraphQL */ `
  subscription OnDeletePurchaseOrder {
    onDeletePurchaseOrder {
      id
      vendorId
      date
      orderedProducts {
        itemCode
        itemName
        numPurchased
        unitCost
        totalCost
        numReceived
        receivedDate
        goodTill
        adjustments {
          adjAmt
          reason
          adjDate
        }
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOwnerContact = /* GraphQL */ `
  subscription OnCreateOwnerContact {
    onCreateOwnerContact {
      contactInfo {
        name
        phone
        faxPhone
        email
        address
        city
        state
        zip
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOwnerContact = /* GraphQL */ `
  subscription OnUpdateOwnerContact {
    onUpdateOwnerContact {
      contactInfo {
        name
        phone
        faxPhone
        email
        address
        city
        state
        zip
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOwnerContact = /* GraphQL */ `
  subscription OnDeleteOwnerContact {
    onDeleteOwnerContact {
      contactInfo {
        name
        phone
        faxPhone
        email
        address
        city
        state
        zip
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateVendor = /* GraphQL */ `
  subscription OnCreateVendor {
    onCreateVendor {
      id
      vendorName
      contactInfo {
        name
        phone
        faxPhone
        email
        address
        city
        state
        zip
      }
      shTerms
      salesTaxTerms
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVendor = /* GraphQL */ `
  subscription OnUpdateVendor {
    onUpdateVendor {
      id
      vendorName
      contactInfo {
        name
        phone
        faxPhone
        email
        address
        city
        state
        zip
      }
      shTerms
      salesTaxTerms
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVendor = /* GraphQL */ `
  subscription OnDeleteVendor {
    onDeleteVendor {
      id
      vendorName
      contactInfo {
        name
        phone
        faxPhone
        email
        address
        city
        state
        zip
      }
      shTerms
      salesTaxTerms
      notes
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItems = /* GraphQL */ `
  subscription OnCreateItems {
    onCreateItems {
      code
      name
      category
      price
      cost
      qty
      numOrdered
      qtyThresh
      maxAddon
      modifierGroups
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItems = /* GraphQL */ `
  subscription OnUpdateItems {
    onUpdateItems {
      code
      name
      category
      price
      cost
      qty
      numOrdered
      qtyThresh
      maxAddon
      modifierGroups
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItems = /* GraphQL */ `
  subscription OnDeleteItems {
    onDeleteItems {
      code
      name
      category
      price
      cost
      qty
      numOrdered
      qtyThresh
      maxAddon
      modifierGroups
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModifierGroups = /* GraphQL */ `
  subscription OnCreateModifierGroups {
    onCreateModifierGroups {
      id
      name
      modifiers
      items
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModifierGroups = /* GraphQL */ `
  subscription OnUpdateModifierGroups {
    onUpdateModifierGroups {
      id
      name
      modifiers
      items
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModifierGroups = /* GraphQL */ `
  subscription OnDeleteModifierGroups {
    onDeleteModifierGroups {
      id
      name
      modifiers
      items
      createdAt
      updatedAt
    }
  }
`;
export const onCreateModifier = /* GraphQL */ `
  subscription OnCreateModifier {
    onCreateModifier {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModifier = /* GraphQL */ `
  subscription OnUpdateModifier {
    onUpdateModifier {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModifier = /* GraphQL */ `
  subscription OnDeleteModifier {
    onDeleteModifier {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
