/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
        services
        subItems {
          itemName
          itemCode
          services
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          services
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
      nextToken
    }
  }
`;
export const getOrderChoice = /* GraphQL */ `
  query GetOrderChoice($id: ID!) {
    getOrderChoice(id: $id) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const listOrderChoices = /* GraphQL */ `
  query ListOrderChoices(
    $filter: ModelOrderChoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderChoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        name
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      code
      name
      category
      remainQty
      price
      cost
      qtyThresh
      color
      size
      maxAddon
      description
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        name
        category
        remainQty
        price
        cost
        qtyThresh
        color
        size
        maxAddon
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      name
      type
      price
      createdAt
      updatedAt
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
