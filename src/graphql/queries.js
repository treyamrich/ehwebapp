/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrders = /* GraphQL */ `
  query GetOrders($id: ID!) {
    getOrders(id: $id) {
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
      dateCompleted
      rushStatus
      cart {
        name
        itemCode
        quantity
        category
        services {
          name
          itemCode
          quantity
        }
        graphics {
          name
          itemCode
          willEmail
          graphicName
        }
        cutouts {
          name
          itemCode
          willEmail
          graphicName
        }
        subItems {
          name
          itemCode
          quantity
          category
          services {
            name
            itemCode
            quantity
          }
          graphics {
            name
            itemCode
            willEmail
            graphicName
          }
          cutouts {
            name
            itemCode
            willEmail
            graphicName
          }
          subItems {
            name
            itemCode
            quantity
            category
            services {
              name
              itemCode
              quantity
            }
            graphics {
              name
              itemCode
              willEmail
              graphicName
            }
            cutouts {
              name
              itemCode
              willEmail
              graphicName
            }
            subItems {
              name
              itemCode
              quantity
              category
              txtObj
              layoutImg
              notes
              postTxt
              postLayout
            }
            txtObj
            layoutImg
            notes
            postTxt
            postLayout
          }
          txtObj
          layoutImg
          notes
          postTxt
          postLayout
        }
        txtObj
        layoutImg
        notes
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
        name
        phone
        email
        dateNeeded
        timeNeeded
        location
        status
        dateCompleted
        rushStatus
        cart {
          name
          itemCode
          quantity
          category
          services {
            name
            itemCode
            quantity
          }
          graphics {
            name
            itemCode
            willEmail
            graphicName
          }
          cutouts {
            name
            itemCode
            willEmail
            graphicName
          }
          subItems {
            name
            itemCode
            quantity
            category
            services {
              name
              itemCode
              quantity
            }
            graphics {
              name
              itemCode
              willEmail
              graphicName
            }
            cutouts {
              name
              itemCode
              willEmail
              graphicName
            }
            subItems {
              name
              itemCode
              quantity
              category
              txtObj
              layoutImg
              notes
              postTxt
              postLayout
            }
            txtObj
            layoutImg
            notes
            postTxt
            postLayout
          }
          txtObj
          layoutImg
          notes
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
export const getItemCategory = /* GraphQL */ `
  query GetItemCategory($id: ID!) {
    getItemCategory(id: $id) {
      categoryName
      id
      createdAt
      updatedAt
    }
  }
`;
export const listItemCategories = /* GraphQL */ `
  query ListItemCategories(
    $filter: ModelItemCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        categoryName
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGraphic = /* GraphQL */ `
  query GetGraphic($name: String!) {
    getGraphic(name: $name) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const listGraphics = /* GraphQL */ `
  query ListGraphics(
    $name: String
    $filter: ModelGraphicFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGraphics(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        imageName
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
  query GetItems($itemCode: String!) {
    getItems(itemCode: $itemCode) {
      itemCode
      name
      category
      price
      cost
      qty
      numOrdered
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $itemCode: String
    $filter: ModelItemsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItems(
      itemCode: $itemCode
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        itemCode
        name
        category
        price
        cost
        qty
        numOrdered
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
