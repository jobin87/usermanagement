import mongoose, { Document, Schema } from "mongoose";

// Interface for Flight document
interface IFlight extends Document {
  flightName: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string; // or Date
  arrivalDate: string;   // or Date
  departureTime: string;
  arrivalTime: string;
  price: number;
}

// Mongoose schema
const flightSchema = new Schema<IFlight>(
  {
    flightName: { type: String, required: true },
    flightNumber: { type: String, required: true },
    departureCity: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^[A-Za-z\s]+$/.test(v),
        message: "Departure city must only contain letters",
      },
    },
    arrivalCity: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^[A-Za-z\s]+$/.test(v),
        message: "Arrival city must only contain letters",
      },
    },
    departureDate: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create model
const FlightModel = mongoose.model<IFlight>("flight", flightSchema);

export default FlightModel;
