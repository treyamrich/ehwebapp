/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrders = /* GraphQL */ `
  query GetOrders($id: ID!) {
    getOrders(id: $id) {
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
          notes
          postGraphics
          postTxt
          postLayout
        }
        quantity
        txtLines
        font
        layoutImg
        graphics
        notes
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
    $filter: ModelOrdersFilterInput
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
          itemPrice
          quantity
          txtLines
          font
          layoutImg
          graphics
          notes
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
export const getItems = /* GraphQL */ `
  query GetItems($id: ID!) {
    getItems(id: $id) {
      id
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
      nextToken
    }
  }
`;
export const getServices = /* GraphQL */ `
  query GetServices($id: ID!) {
    getServices(id: $id) {
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
    $filter: ModelServicesFilterInput
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
