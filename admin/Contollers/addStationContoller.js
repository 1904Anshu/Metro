const Station = require("../../models/station");
const Admin = require("../../models/Admin");
const FareConfig = require("../../models/FareConfig");

// Add Station
const addStation = async (req, res) => {
  try {
    const { from, to, distance } = req.body;

    // Fetch the current fare price
    const fareConfig = await FareConfig.findOne();
    if (!fareConfig) {
      return res
        .status(404)
        .json({ message: "Fare price configuration not found" });
    }

    const fare = distance * fareConfig.ratePerKm; // Dynamic fare calculation
    const station = await Station.create({ from, to, distance, fare });
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the fare prices
const updateFare = async (req, res) => {
  try {
    const { ratePerKm } = req.body;

    // Update the fare price in the FareConfig collection
    let fareConfig = await FareConfig.findOne();
    if (!fareConfig) {
      fareConfig = await FareConfig.create({ ratePerKm });
    } else {
      fareConfig.ratePerKm = ratePerKm;
      await fareConfig.save();
    }

    // Recalculate fares for all stations
    const stations = await Station.find();
    for (const station of stations) {
      station.fare = station.distance * ratePerKm;
      await station.save();
    }

    res.status(200).json({ message: "Fares updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addStation, updateFare };
