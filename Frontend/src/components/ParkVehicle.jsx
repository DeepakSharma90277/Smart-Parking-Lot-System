import { useState } from "react";
import { parkVehicle } from "../services/api";

export default function ParkVehicle({ fetchSlots, setMessage }) {
  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);

  const handlePark = async () => {
    const res = await parkVehicle({ needsEV, needsCover });
    setMessage(res.data.message);
    fetchSlots(); // Auto refresh table
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Park Vehicle</h2>

      <label className="flex gap-2">
        <input
          type="checkbox"
          onChange={(e) => setNeedsEV(e.target.checked)}
        />
        Needs EV Charging
      </label>

      <label className="flex gap-2 mt-2">
        <input
          type="checkbox"
          onChange={(e) => setNeedsCover(e.target.checked)}
        />
        Needs Covered Slot
      </label>

      <button
        onClick={handlePark}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Park Vehicle
      </button>
    </div>
  );
}
