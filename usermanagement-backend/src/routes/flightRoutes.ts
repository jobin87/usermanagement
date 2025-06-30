import express from 'express';
import { addFlights, getAllFlights, getfromtoFlights } from '../controllers/flightController';

const FlightRoutes = express.Router();


  
FlightRoutes.post('/registration',addFlights);
FlightRoutes.get('/getAllFlights',getAllFlights);
FlightRoutes.get('/getSearchFlights',getfromtoFlights);



export default FlightRoutes;
