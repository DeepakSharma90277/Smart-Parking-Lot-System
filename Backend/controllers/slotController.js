import ParkingSlot from "../models/ParkingSlot.js";

// ADD SLOT
export const addSlot = async (req, res) => {
  try {
    const { slotNo, isCovered, isEVCharging } = req.body;

    const exists = await ParkingSlot.findOne({ slotNo });
    if (exists) return res.status(400).json({ message: "Slot already exists" });

    const slot = new ParkingSlot({ slotNo, isCovered, isEVCharging });
    await slot.save();

    res.json({ message: "Slot added successfully", slot });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ALL SLOTS
export const getSlots = async (req, res) => {
  const slots = await ParkingSlot.find().sort({ slotNo: 1 });
  res.json(slots);
};

// PARK VEHICLE
export const parkVehicle = async (req, res) => {
  const { needsEV, needsCover } = req.body;

  const slot = await ParkingSlot.findOne({
    isOccupied: false,
    isEVCharging: needsEV,
    isCovered: needsCover
  }).sort({ slotNo: 1 });

  if (!slot) {
    return res.json({ message: "No slot available" });
  }

  slot.isOccupied = true;
  await slot.save();

  res.json({ message: `Vehicle parked in slot ${slot.slotNo}` });
};

// REMOVE VEHICLE
export const removeVehicle = async (req, res) => {
  const { slotNo } = req.body;

  const slot = await ParkingSlot.findOne({ slotNo });

  if (!slot) return res.status(404).json({ message: "Slot not found" });

  slot.isOccupied = false;
  await slot.save();

  res.json({ message: `Slot ${slotNo} is now free` });
};
