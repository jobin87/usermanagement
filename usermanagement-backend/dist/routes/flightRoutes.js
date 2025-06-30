"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flightController_1 = require("../controllers/flightController");
const FlightRoutes = express_1.default.Router();
FlightRoutes.post('/registration', flightController_1.addFlights);
FlightRoutes.get('/getAllFlights', flightController_1.getAllFlights);
FlightRoutes.get('/getSearchFlights', flightController_1.getfromtoFlights);
exports.default = FlightRoutes;
