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
        itemCode
        quantity
        category
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
export const updateOrders = /* GraphQL */ `
  mutation UpdateOrders(
    $input: UpdateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    updateOrders(input: $input, condition: $condition) {
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
        itemCode
        quantity
        category
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
export const deleteOrders = /* GraphQL */ `
  mutation DeleteOrders(
    $input: DeleteOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    deleteOrders(input: $input, condition: $condition) {
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
        itemCode
        quantity
        category
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
export const createGraphic = /* GraphQL */ `
  mutation CreateGraphic(
    $input: CreateGraphicInput!
    $condition: ModelGraphicConditionInput
  ) {
    createGraphic(input: $input, condition: $condition) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const updateGraphic = /* GraphQL */ `
  mutation UpdateGraphic(
    $input: UpdateGraphicInput!
    $condition: ModelGraphicConditionInput
  ) {
    updateGraphic(input: $input, condition: $condition) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const deleteGraphic = /* GraphQL */ `
  mutation DeleteGraphic(
    $input: DeleteGraphicInput!
    $condition: ModelGraphicConditionInput
  ) {
    deleteGraphic(input: $input, condition: $condition) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const createPurchaseOrder = /* GraphQL */ `
  mutation CreatePurchaseOrder(
    $input: CreatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    createPurchaseOrder(input: $input, condition: $condition) {
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
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const updatePurchaseOrder = /* GraphQL */ `
  mutation UpdatePurchaseOrder(
    $input: UpdatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    updatePurchaseOrder(input: $input, condition: $condition) {
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
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const deletePurchaseOrder = /* GraphQL */ `
  mutation DeletePurchaseOrder(
    $input: DeletePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    deletePurchaseOrder(input: $input, condition: $condition) {
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
      }
      isOpen
      createdAt
      updatedAt
    }
  }
`;
export const createOwnerContact = /* GraphQL */ `
  mutation CreateOwnerContact(
    $input: CreateOwnerContactInput!
    $condition: ModelOwnerContactConditionInput
  ) {
    createOwnerContact(input: $input, condition: $condition) {
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
export const updateOwnerContact = /* GraphQL */ `
  mutation UpdateOwnerContact(
    $input: UpdateOwnerContactInput!
    $condition: ModelOwnerContactConditionInput
  ) {
    updateOwnerContact(input: $input, condition: $condition) {
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
export const deleteOwnerContact = /* GraphQL */ `
  mutation DeleteOwnerContact(
    $input: DeleteOwnerContactInput!
    $condition: ModelOwnerContactConditionInput
  ) {
    deleteOwnerContact(input: $input, condition: $condition) {
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
export const createVendor = /* GraphQL */ `
  mutation CreateVendor(
    $input: CreateVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    createVendor(input: $input, condition: $condition) {
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
export const updateVendor = /* GraphQL */ `
  mutation UpdateVendor(
    $input: UpdateVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    updateVendor(input: $input, condition: $condition) {
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
export const deleteVendor = /* GraphQL */ `
  mutation DeleteVendor(
    $input: DeleteVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    deleteVendor(input: $input, condition: $condition) {
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
export const createItems = /* GraphQL */ `
  mutation CreateItems(
    $input: CreateItemsInput!
    $condition: ModelItemsConditionInput
  ) {
    createItems(input: $input, condition: $condition) {
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
export const updateItems = /* GraphQL */ `
  mutation UpdateItems(
    $input: UpdateItemsInput!
    $condition: ModelItemsConditionInput
  ) {
    updateItems(input: $input, condition: $condition) {
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
export const deleteItems = /* GraphQL */ `
  mutation DeleteItems(
    $input: DeleteItemsInput!
    $condition: ModelItemsConditionInput
  ) {
    deleteItems(input: $input, condition: $condition) {
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
