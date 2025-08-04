import React, { useState, useEffect } from 'react';
import { LuMousePointerClick } from "react-icons/lu";
const employees = ["Mukesh","Durga Devi","Moniga","Vinoth","Naveen","Sharukhan"];
const statuses = ['Present', 'Absent', 'Leave', 'Half Day'];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AttendanceApp = () => {
  const [attendance, setAttendance] = useState([]);
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');
  const [selectedName, setSelectedName] = useState(employees[0]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const currentDate = new Date().toISOString().split('T')[0];

  const [isAdmins, setIsAdmins] = useState(false);
  const [adminName, setAdminName] = useState("");

  const onAdminChange = () => {

     if (adminName === "Naveen") {
       setIsAdmin(true);
     }
  }

  useEffect(() => {
    // if (selectedName === 'Naveen') setIsAdmin(true);
    // else setIsAdmin(false);

    const savedData = localStorage.getItem('attendance');
    if (savedData) {
      setAttendance(JSON.parse(savedData));
    }
  }, [selectedName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = {
      name: selectedName,
      date: currentDate,
      day: selectedDay,
      status: selectedStatus
    };
    const updatedAttendance = attendance.filter(
      (entry) => !(entry.name === selectedName && entry.date === currentDate)
    );
    updatedAttendance.push(record);
    setAttendance(updatedAttendance);
    localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
  };

  const handleEdit = (index, field, value) => {
    const updated = [...attendance];
    updated[index][field] = value;
    setAttendance(updated);
    localStorage.setItem('attendance', JSON.stringify(updated));
  };

  const filteredData = attendance.filter((entry) => {
    return (
      (!filterStart || entry.date >= filterStart) &&
      (!filterEnd || entry.date <= filterEnd)
    );
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center"><span className='text-green-500'>Taxportal Team</span> <span className='text-blue-700'>Attendance</span></h1>

      <form
        className="border rounded-lg p-4 shadow mb-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="font-medium">Name:</label>
            <select
              className="border p-2 rounded"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            >
              {employees.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label className="font-medium">Date:</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={currentDate}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="font-medium">Day:</label>
            <select
              className="border p-2 rounded"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <option value="">Select Day</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label className="font-medium">Status:</label>
            <select
              className="border p-2 rounded"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className='flex justify-between items-center mb-4'>
         <h2 className="text-xl font-semibold mb-2" onDoubleClick={()=>setIsAdmins(!isAdmins)}>Filter Attendance</h2>
        {isAdmins ?  <div className='flex items-center'><input type="text" value={adminName} className="border p-2 rounded" name='adminName' onChange={(e) => setAdminName(e.target.value)} placeholder="Search by name..." /> <LuMousePointerClick className='text-2xl' onClick={onAdminChange} /></div>  :""}
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2 md:mb-0">
          <label className="font-medium">Start Date:</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={filterStart}
            onChange={(e) => setFilterStart(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <label className="font-medium">End Date:</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={filterEnd}
            onChange={(e) => setFilterEnd(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Day</th>
              <th className="border border-gray-300 p-2">Status</th>
              {isAdmin && <th className="border border-gray-300 p-2">Edit</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{entry.name}</td>
                <td className="border border-gray-300 p-2">{entry.date}</td>
                <td className="border border-gray-300 p-2">{entry.day}</td>
                <td className="border border-gray-300 p-2">{entry.status}</td>
                {isAdmin && (
                  <td className="border border-gray-300 p-2">
                    <select
                      className="border p-1 rounded"
                      value={entry.status}
                      onChange={(e) => handleEdit(index, 'status', e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceApp;
