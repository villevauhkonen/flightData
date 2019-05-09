import express, { Router, Request, Response } from 'express'
import { flightData } from '../data/flights'
import { Flight } from '../Models/Flight';
import { bookingData } from '../data/bookings'
import { Booking } from '../Models/Booking'
import { BookingResult } from '../Models/BookingResult';

const router: Router = express.Router()

router.get('/flights', (req: Request, res: Response) => {
  const flightCode = req.query.flightCode
  const arrStation = req.query.arrStation
  const depStation = req.query.depStation
  const arrDate = new Date(req.query.arrDate) || undefined
  const depDate = new Date(req.query.depDate) || undefined

  //Search flight times from nearest +-2 hours
  const timeRange = 7200 * 1000

  const rawFlightData = flightData

  const filteredFlightData = rawFlightData
    .filter((flight: Flight) => flightCode === undefined || flight.flightCode == flightCode)
    .filter((flight: Flight) => arrStation === undefined || flight.arrStation == arrStation)
    .filter((flight: Flight) => depStation === undefined || flight.depStation == depStation)
    .filter((flight: Flight) => req.query.arrDate === undefined || new Date(flight.arrDateTime) > arrDate && new Date(arrDate.setHours(23, 59, 59)) > new Date(flight.arrDateTime))
    .filter((flight: Flight) => req.query.depDate === undefined || new Date(flight.depDateTime) > depDate && new Date(depDate.setHours(23, 59, 59)) > new Date(flight.depDateTime))

  res.send(filteredFlightData)
})

router.get('/bookings', (req: Request, res: Response) => {
  const flightCode = req.query.flightCode;

  let bData = bookingData.filter((booking: Booking) => flightCode === undefined || booking.flightCode === flightCode)
  bData = bData.sort((a, b) => (a.flightCode > b.flightCode) ? 1 : -1)
  const result: Array<BookingResult> = []

  for (let i = 0; i < bData.length; i++) {

    if (result.length === 0 || bData[i].flightCode !== result[result.length - 1].flightCode) {

      const resultData: BookingResult = {
        flightCode: bData[i].flightCode,
        count: 0,
        totalWeight: 0,
        totalVolume: 0
      }
      result.push(resultData)
    }

    result[result.length - 1].totalVolume += bData[i].volume
    result[result.length - 1].totalWeight += bData[i].weight
    result[result.length - 1].count++

  }
  res.send(result)
})



export default router