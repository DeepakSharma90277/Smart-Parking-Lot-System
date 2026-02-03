export default function SlotList({ slots }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">All Slots</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Slot No</th>
            <th>Covered</th>
            <th>EV</th>
            <th>Occupied</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((s) => (
            <tr key={s.slotNo} className="text-center border">
              <td>{s.slotNo}</td>
              <td>{s.isCovered ? "Yes" : "No"}</td>
              <td>{s.isEVCharging ? "Yes" : "No"}</td>
              <td>{s.isOccupied ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
