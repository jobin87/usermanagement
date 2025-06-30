export interface IFlightParams {
  flightName: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;   // Can also be `Date` if using JS Date object
  arrivalDate: string;     // Can also be `Date`
  departureTime: string;
  arrivalTime: string;
  price: number;
}
export interface IFlightSeachParams {
 
  departureCity: string;
  arrivalCity: string;
  departureDate: string;   // Can also be `Date` if using JS Date object
  arrivalDate: string;     // Can also be `Date`
}


// export interface ISellersRegistrationApprovalParams {
//   sellerId: string;
//   isApproved: boolean;
// }

// export interface ISellerOnboardingAddressUpdateParams {
//   pickupAddress: {
//     street: string;
//     area: string;
//     governorate: string;
//     postalCode: string;
//     country: string;
//     buildingNumber: string;
//     additionalInfo: string;
//   };
//   returnAddress: {
//     street: string;
//     area: string;
//     governorate: string;
//     postalCode: string;
//     country: string;
//     buildingNumber: string;
//     additionalInfo: string;
//   };
// }
