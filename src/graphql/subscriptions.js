/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      createdAt
      name
      phoneNum
      email
      dateNeeded
      timeNeeded
      rushStatus
      location
      cart {
        itemName
        itemCode
        subItems {
          itemName
          itemCode
          quantity
          txtLines
          font
          layoutImg
          graphics
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        postGraphics
        postTxt
        postLayout
      }
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      createdAt
      name
      phoneNum
      email
      dateNeeded
      timeNeeded
      rushStatus
      location
      cart {
        itemName
        itemCode
        subItems {
          itemName
          itemCode
          quantity
          txtLines
          font
          layoutImg
          graphics
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        postGraphics
        postTxt
        postLayout
      }
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      createdAt
      name
      phoneNum
      email
      dateNeeded
      timeNeeded
      rushStatus
      location
      cart {
        itemName
        itemCode
        subItems {
          itemName
          itemCode
          quantity
          txtLines
          font
          layoutImg
          graphics
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        postGraphics
        postTxt
        postLayout
      }
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      code
      name
      category
      description
      remainQty
      qtyThresh
      maxAddon
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      code
      name
      category
      description
      remainQty
      qtyThresh
      maxAddon
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      code
      name
      category
      description
      remainQty
      qtyThresh
      maxAddon
      createdAt
      updatedAt
    }
  }
`;
