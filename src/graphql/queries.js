/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrders = /* GraphQL */ `
  query GetOrders($id: ID!) {
    getOrders(id: $id) {
      id
      createdAt
      orderNum
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
        orderNum
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
          customGraphics
          postGraphics
          postTxt
          postLayout
        }
        notes
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
export const getPurchaseOrder = /* GraphQL */ `
  query GetPurchaseOrder($id: ID!) {
    getPurchaseOrder(id: $id) {
      id
      vendorId
      date
      orderedProducts {
        itemCode
        itemName
        numPurchased
        unitCost
        totalCost
        receivedDate
        goodTill
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const listPurchaseOrders = /* GraphQL */ `
  query ListPurchaseOrders(
    $filter: ModelPurchaseOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPurchaseOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        vendorId
        date
        orderedProducts {
          itemCode
          itemName
          numPurchased
          unitCost
          totalCost
          receivedDate
          goodTill
        }
        isOpen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOwnerContact = /* GraphQL */ `
  query GetOwnerContact($id: ID!) {
    getOwnerContact(id: $id) {
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
export const listOwnerContacts = /* GraphQL */ `
  query ListOwnerContacts(
    $filter: ModelOwnerContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwnerContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVendor = /* GraphQL */ `
  query GetVendor($id: ID!) {
    getVendor(id: $id) {
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
export const listVendors = /* GraphQL */ `
  query ListVendors(
    $filter: ModelVendorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVendors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getItems = /* GraphQL */ `
  query GetItems($code: String!) {
    getItems(code: $code) {
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $code: String
    $filter: ModelItemsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItems(
      code: $code
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getModifierGroups = /* GraphQL */ `
  query GetModifierGroups($id: ID!) {
    getModifierGroups(id: $id) {
      id
      name
      modifiers
      items
      createdAt
      updatedAt
    }
  }
`;
export const listModifierGroups = /* GraphQL */ `
  query ListModifierGroups(
    $filter: ModelModifierGroupsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModifierGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        modifiers
        items
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getModifier = /* GraphQL */ `
  query GetModifier($id: ID!) {
    getModifier(id: $id) {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const listModifiers = /* GraphQL */ `
  query ListModifiers(
    $filter: ModelModifierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModifiers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
