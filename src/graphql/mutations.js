/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      code
      name
      category
      description
      color
      size
      remainQty
      qtyThresh
      maxAddon
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      code
      name
      category
      description
      color
      size
      remainQty
      qtyThresh
      maxAddon
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      code
      name
      category
      description
      color
      size
      remainQty
      qtyThresh
      maxAddon
      createdAt
      updatedAt
    }
  }
`;