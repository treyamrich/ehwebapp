/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders {
    onCreateOrders {
      id
      createdAt
      name
      phoneNum
      email
      dateNeeded
      timeNeeded
      location
      status
      rushStatus
      cart {
        itemName
        itemCode
        itemPrice
        services {
          name
          qty
        }
        subItems {
          itemName
          itemCode
          itemPrice
          quantity
          txtLines
          font
          layoutImg
          graphics
          customGraphics
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        customGraphics
        postGraphics
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
      name
      phoneNum
      email
      dateNeeded
      timeNeeded
      location
      status
      rushStatus
      cart {
        itemName
        itemCode
        itemPrice
        services {
          name
          qty
        }
        subItems {
          itemName
          itemCode
          itemPrice
          quantity
          txtLines
          font
          layoutImg
          graphics
          customGraphics
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        customGraphics
        postGraphics
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
      name
      phoneNum
      email
      dateNeeded
      timeNeeded
      location
      status
      rushStatus
      cart {
        itemName
        itemCode
        itemPrice
        services {
          name
          qty
        }
        subItems {
          itemName
          itemCode
          itemPrice
          quantity
          txtLines
          font
          layoutImg
          graphics
          customGraphics
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        customGraphics
        postGraphics
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
export const onCreateItems = /* GraphQL */ `
  subscription OnCreateItems {
    onCreateItems {
      code
      name
      category
      qty
      price
      cost
      qtyThresh
      maxAddon
      description
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
      qty
      price
      cost
      qtyThresh
      maxAddon
      description
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
      qty
      price
      cost
      qtyThresh
      maxAddon
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateServices = /* GraphQL */ `
  subscription OnCreateServices {
    onCreateServices {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateServices = /* GraphQL */ `
  subscription OnUpdateServices {
    onUpdateServices {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteServices = /* GraphQL */ `
  subscription OnDeleteServices {
    onDeleteServices {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
