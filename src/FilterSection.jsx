import {useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const FilterSection = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [store,setStore] = useState([]);
    useEffect(()=>{
        const storedData = localStorage.getItem("attendance")
        if(storedData){
             setStore(JSON.parse(storedData))
        }
      },[]);

      const filteredData = ()=>{
              store.filter((items)=>{
                const itemDate = new Date(items.startDate).toLocaleDateString();
                var filterStore = (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate);
                setStore(filterStore)
              })
      }


  return (
    <div>
                  <div className="date-filter d-flex justify-content-center align-items-center py-3">
                       <div className="d-flex justify-content-between align-items-center">
                       <div>
                {/* <label className="d-block fw-bold">From:</label> */}
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  placeholderText="Select From Date"
                  className="form-control"
                />
                       </div>
                       <div>
                {/* <label className="d-block fw-bold">To:</label> */}
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={fromDate}
                  placeholderText="Select To Date"
                  className="form-control"
                />
                      </div>
                       <div className="">
                        <label htmlFor="" className="d-block"></label>
                            <button className="btn btn-primary" onClick={filteredData}>Submit</button>
                       </div>
                       </div>
                  </div>
        <div className="filter container">
        <div className="container">
               <table className="table" width={100}>
                   <thead>
                       <tr>
                          <th>No</th>
                          <th>NAME</th>
                          <th>DATE</th>
                          <th>DAYS</th>
                          <th>ATTENDANCE</th>
                       </tr>
                   </thead>
                   <tbody>
                       {store.map((items,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{items.name}</td>
                                <td>{items.startDate}</td>
                                <td>{items.date}</td>
                                <td>{items.status}</td>
                            </tr>
                       ))}
                   </tbody>
               </table>
          </div>
        </div>
    </div>
  )
}

export default FilterSection
