import { Request, Response } from "express";
import flightModel from "../models/flight";
import FlightModel from "../models/flight";

export const addFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const {flightName,
  flightNumber,
  departureCity,
  arrivalCity,
  departureDate ,
  arrivalDate ,
  departureTime,
  arrivalTime,
  price,} = req.body;

    // Check for missing fields
    if (!flightName || !flightNumber || !departureCity || !arrivalCity || !departureDate || !arrivalDate || !departureTime || !arrivalTime || !price) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // ✅ Check if an flight already exists for the same flightnumber
  const existingFlight = await FlightModel.findOne({ flightNumber });


    if (existingFlight) {
      res.status(409).json({ message: "This flight with the same number is already added. Please choose another time." });
      return;
    }

    // ✅ Create and save the new flight
    const createNewFlight = new FlightModel({
      flightName,
      flightNumber,
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      price,
    });

    console.log("New flight object:", createNewFlight);

    await createNewFlight.save();


    res.status(201).json({
      message: "flight added successfully",
      data: createNewFlight,
      success: true
    });
  } catch (error: any) {
    console.error("Flight adding error:", error);
    res.status(500).json({ message: "Internal server error while adding flight" });
  }
};

export const getAllFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const flights = await FlightModel.find(); // Fetch all flight documents
    res.status(200).json({
      message: "Fetched all flights successfully",
      data: flights,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Internal server error while fetching flights" });
  }
};

export const getfromtoFlights = async (req: Request, res: Response): Promise<void> => {
  const { departureCity, arrivalCity, departureDate, arrivalDate } = req.query;

  if (!departureCity || !arrivalCity || !departureDate || !arrivalDate) {
    res.status(400).json({ message: "Missing departureCity, arrivalCity, departureDate or arrivalDate" });
    return;
  }

  try {
    // Prepare range for departureDate
    const departureStart = new Date(departureDate as string);
    const departureEnd = new Date(departureStart);
    departureEnd.setDate(departureStart.getDate() + 1);

    // Prepare range for arrivalDate
    const arrivalStart = new Date(arrivalDate as string);
    const arrivalEnd = new Date(arrivalStart);
    arrivalEnd.setDate(arrivalStart.getDate() + 1);

    const allFlights = await FlightModel.find({
      departureCity,
      arrivalCity,
      departureDate: {
        $gte: departureStart,
        $lt: departureEnd,
      },
      arrivalDate: {
        $gte: arrivalStart,
        $lt: arrivalEnd,
      },
    });

    const direct = allFlights.map((f: any) => ({ type: "direct", legs: [f] }));

    // Optional: Indirect flights can also be filtered if needed
    const indirect: { type: string; legs: any[] }[] = [];
    const firstLegs = allFlights.filter((f: any) => f.departureCity === departureCity);

    for (let f1 of firstLegs) {
      const connections = allFlights.filter(
        (f2: any) =>
          f2.departureCity === f1.arrivalCity &&
          f2.arrivalCity === arrivalCity &&
          new Date(f2.departureTime).getTime() - new Date(f1.arrivalTime).getTime() >= 60 * 60 * 1000 &&
          new Date(f2.departureTime).getTime() - new Date(f1.arrivalTime).getTime() <= 6 * 60 * 60 * 1000
      );

      for (const f2 of connections) {
        indirect.push({
          type: "indirect",
          legs: [f1, f2],
        });
      }
    }

    const result = [...direct, ...indirect];

    res.status(200).json({
      message: "Fetched all searched flights successfully",
      data: result,
      success: true,
    });
  } catch (error) {
    console.error("Flight search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};







