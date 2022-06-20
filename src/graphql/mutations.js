/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrders = /* GraphQL */ `
  mutation CreateOrders(
    $input: CreateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    createOrders(input: $input, condition: $condition) {
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
export const updateOrders = /* GraphQL */ `
  mutation UpdateOrders(
    $input: UpdateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    updateOrders(input: $input, condition: $condition) {
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
export const deleteOrders = /* GraphQL */ `
  mutation DeleteOrders(
    $input: DeleteOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    deleteOrders(input: $input, condition: $condition) {
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
export const createOrderChoice = /* GraphQL */ `
  mutation CreateOrderChoice(
    $input: CreateOrderChoiceInput!
    $condition: ModelOrderChoiceConditionInput
  ) {
    createOrderChoice(input: $input, condition: $condition) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderChoice = /* GraphQL */ `
  mutation UpdateOrderChoice(
    $input: UpdateOrderChoiceInput!
    $condition: ModelOrderChoiceConditionInput
  ) {
    updateOrderChoice(input: $input, condition: $condition) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderChoice = /* GraphQL */ `
  mutation DeleteOrderChoice(
    $input: DeleteOrderChoiceInput!
    $condition: ModelOrderChoiceConditionInput
  ) {
    deleteOrderChoice(input: $input, condition: $condition) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const createItems = /* GraphQL */ `
  mutation CreateItems(
    $input: CreateItemsInput!
    $condition: ModelItemsConditionInput
  ) {
    createItems(input: $input, condition: $condition) {
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
export const updateItems = /* GraphQL */ `
  mutation UpdateItems(
    $input: UpdateItemsInput!
    $condition: ModelItemsConditionInput
  ) {
    updateItems(input: $input, condition: $condition) {
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
export const deleteItems = /* GraphQL */ `
  mutation DeleteItems(
    $input: DeleteItemsInput!
    $condition: ModelItemsConditionInput
  ) {
    deleteItems(input: $input, condition: $condition) {
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
export const createServices = /* GraphQL */ `
  mutation CreateServices(
    $input: CreateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    createServices(input: $input, condition: $condition) {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
export const updateServices = /* GraphQL */ `
  mutation UpdateServices(
    $input: UpdateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    updateServices(input: $input, condition: $condition) {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteServices = /* GraphQL */ `
  mutation DeleteServices(
    $input: DeleteServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    deleteServices(input: $input, condition: $condition) {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
