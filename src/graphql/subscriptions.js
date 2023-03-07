/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onCreateOrders(filter: $filter) {
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
        quantity
        category
        services {
          name
          code
          price
          quantity
        }
        graphics {
          name
          code
          price
          willEmail
          graphicName
        }
        cutouts {
          name
          code
          price
          willEmail
          graphicName
        }
        subItems {
          name
          code
          price
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
      notes
      updatedAt
    }
  }
`;
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onUpdateOrders(filter: $filter) {
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
        quantity
        category
        services {
          name
          code
          price
          quantity
        }
        graphics {
          name
          code
          price
          willEmail
          graphicName
        }
        cutouts {
          name
          code
          price
          willEmail
          graphicName
        }
        subItems {
          name
          code
          price
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
      notes
      updatedAt
    }
  }
`;
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onDeleteOrders(filter: $filter) {
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
        quantity
        category
        services {
          name
          code
          price
          quantity
        }
        graphics {
          name
          code
          price
          willEmail
          graphicName
        }
        cutouts {
          name
          code
          price
          willEmail
          graphicName
        }
        subItems {
          name
          code
          price
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
      notes
      updatedAt
    }
  }
`;
export const onCreateOrderChoice = /* GraphQL */ `
  subscription OnCreateOrderChoice(
    $filter: ModelSubscriptionOrderChoiceFilterInput
  ) {
    onCreateOrderChoice(filter: $filter) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrderChoice = /* GraphQL */ `
  subscription OnUpdateOrderChoice(
    $filter: ModelSubscriptionOrderChoiceFilterInput
  ) {
    onUpdateOrderChoice(filter: $filter) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrderChoice = /* GraphQL */ `
  subscription OnDeleteOrderChoice(
    $filter: ModelSubscriptionOrderChoiceFilterInput
  ) {
    onDeleteOrderChoice(filter: $filter) {
      type
      name
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGraphic = /* GraphQL */ `
  subscription OnCreateGraphic($filter: ModelSubscriptionGraphicFilterInput) {
    onCreateGraphic(filter: $filter) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGraphic = /* GraphQL */ `
  subscription OnUpdateGraphic($filter: ModelSubscriptionGraphicFilterInput) {
    onUpdateGraphic(filter: $filter) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGraphic = /* GraphQL */ `
  subscription OnDeleteGraphic($filter: ModelSubscriptionGraphicFilterInput) {
    onDeleteGraphic(filter: $filter) {
      name
      imageName
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePurchaseOrder = /* GraphQL */ `
  subscription OnCreatePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onCreatePurchaseOrder(filter: $filter) {
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
  subscription OnUpdatePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onUpdatePurchaseOrder(filter: $filter) {
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
  subscription OnDeletePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onDeletePurchaseOrder(filter: $filter) {
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
  subscription OnCreateOwnerContact(
    $filter: ModelSubscriptionOwnerContactFilterInput
  ) {
    onCreateOwnerContact(filter: $filter) {
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
  subscription OnUpdateOwnerContact(
    $filter: ModelSubscriptionOwnerContactFilterInput
  ) {
    onUpdateOwnerContact(filter: $filter) {
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
  subscription OnDeleteOwnerContact(
    $filter: ModelSubscriptionOwnerContactFilterInput
  ) {
    onDeleteOwnerContact(filter: $filter) {
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
  subscription OnCreateVendor($filter: ModelSubscriptionVendorFilterInput) {
    onCreateVendor(filter: $filter) {
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
  subscription OnUpdateVendor($filter: ModelSubscriptionVendorFilterInput) {
    onUpdateVendor(filter: $filter) {
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
  subscription OnDeleteVendor($filter: ModelSubscriptionVendorFilterInput) {
    onDeleteVendor(filter: $filter) {
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
  subscription OnCreateItems($filter: ModelSubscriptionItemsFilterInput) {
    onCreateItems(filter: $filter) {
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
  subscription OnUpdateItems($filter: ModelSubscriptionItemsFilterInput) {
    onUpdateItems(filter: $filter) {
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
  subscription OnDeleteItems($filter: ModelSubscriptionItemsFilterInput) {
    onDeleteItems(filter: $filter) {
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
  subscription OnCreateModifierGroups(
    $filter: ModelSubscriptionModifierGroupsFilterInput
  ) {
    onCreateModifierGroups(filter: $filter) {
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
  subscription OnUpdateModifierGroups(
    $filter: ModelSubscriptionModifierGroupsFilterInput
  ) {
    onUpdateModifierGroups(filter: $filter) {
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
  subscription OnDeleteModifierGroups(
    $filter: ModelSubscriptionModifierGroupsFilterInput
  ) {
    onDeleteModifierGroups(filter: $filter) {
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
  subscription OnCreateModifier($filter: ModelSubscriptionModifierFilterInput) {
    onCreateModifier(filter: $filter) {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModifier = /* GraphQL */ `
  subscription OnUpdateModifier($filter: ModelSubscriptionModifierFilterInput) {
    onUpdateModifier(filter: $filter) {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModifier = /* GraphQL */ `
  subscription OnDeleteModifier($filter: ModelSubscriptionModifierFilterInput) {
    onDeleteModifier(filter: $filter) {
      id
      name
      price
      createdAt
      updatedAt
    }
  }
`;
