const Station = require("../../models/station");
const Ticket = require("../../models/ticket");
const QRCode = require("qrcode");

// Get Stations
const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book Ticket
const bookTicket = async (req, res) => {
  try {
    const { departure, destination, passengers } = req.body;
    const station = await Station.findOne({ from: departure, to: destination });

    if (!station) return res.status(404).json({ message: "Route not found" });

    const totalFare = station.fare * passengers;
    const qrCodeData = `${departure}-${destination}-${Date.now()}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    const ticket = await Ticket.create({
      departure,
      destination,
      passengers,
      totalFare,
      qrCode,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStations, bookTicket };
