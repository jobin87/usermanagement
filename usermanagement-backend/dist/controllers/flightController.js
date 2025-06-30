"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getfromtoFlights = exports.getAllFlights = exports.addFlights = void 0;
const flight_1 = __importDefault(require("../models/flight"));
const addFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { flightName, flightNumber, departureCity, arrivalCity, departureDate, arrivalDate, departureTime, arrivalTime, price, } = req.body;
        // Check for missing fields
        if (!flightName || !flightNumber || !departureCity || !arrivalCity || !departureDate || !arrivalDate || !departureTime || !arrivalTime || !price) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        // ✅ Check if an flight already exists for the same flightnumber
        const existingFlight = yield flight_1.default.findOne({ flightNumber });
        if (existingFlight) {
            res.status(409).json({ message: "This flight with the same number is already added. Please choose another time." });
            return;
        }
        // ✅ Create and save the new flight
        const createNewFlight = new flight_1.default({
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
        yield createNewFlight.save();
        res.status(201).json({
            message: "flight added successfully",
            data: createNewFlight,
            success: true
        });
    }
    catch (error) {
        console.error("Flight adding error:", error);
        res.status(500).json({ message: "Internal server error while adding flight" });
    }
});
exports.addFlights = addFlights;
const getAllFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield flight_1.default.find(); // Fetch all flight documents
        res.status(200).json({
            message: "Fetched all flights successfully",
            data: flights,
            success: true,
        });
    }
    catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ message: "Internal server error while fetching flights" });
    }
});
exports.getAllFlights = getAllFlights;
const getfromtoFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departureCity, arrivalCity, departureDate, arrivalDate } = req.query;
    if (!departureCity || !arrivalCity || !departureDate || !arrivalDate) {
        res.status(400).json({ message: "Missing departureCity, arrivalCity, departureDate or arrivalDate" });
        return;
    }
    try {
        // Prepare range for departureDate
        const departureStart = new Date(departureDate);
        const departureEnd = new Date(departureStart);
        departureEnd.setDate(departureStart.getDate() + 1);
        // Prepare range for arrivalDate
        const arrivalStart = new Date(arrivalDate);
        const arrivalEnd = new Date(arrivalStart);
        arrivalEnd.setDate(arrivalStart.getDate() + 1);
        const allFlights = yield flight_1.default.find({
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
        const direct = allFlights.map((f) => ({ type: "direct", legs: [f] }));
        // Optional: Indirect flights can also be filtered if needed
        const indirect = [];
        const firstLegs = allFlights.filter((f) => f.departureCity === departureCity);
        for (let f1 of firstLegs) {
            const connections = allFlights.filter((f2) => f2.departureCity === f1.arrivalCity &&
                f2.arrivalCity === arrivalCity &&
                new Date(f2.departureTime).getTime() - new Date(f1.arrivalTime).getTime() >= 60 * 60 * 1000 &&
                new Date(f2.departureTime).getTime() - new Date(f1.arrivalTime).getTime() <= 6 * 60 * 60 * 1000);
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
    }
    catch (error) {
        console.error("Flight search error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getfromtoFlights = getfromtoFlights;
