import  { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Home = () => {

    // from and to date's
    
      const [startDate, setStartDate] = useState(new Date().toString());
      const employeeName = ["Mukesh","Durga Devi","Moniga","Vinoth","Naveen","Sharukhan"];
      const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      const EmpStatus = ["Present","Absent","Leave","Half Day"];
    
      const [name, setName] = useState("");
      const [status, setStatus] = useState("");
      const [date, setDate] = useState("");
     const [store,setStore] = useState([]);
    
        useEffect(()=>{
          const storedData = localStorage.getItem("attendance")
          if(storedData){
               setStore(JSON.parse(storedData))
          }
        },[])
      
      const onSubmit = (e) => {
        e.preventDefault();
        console.log(startDate);
        
        const person = {
          name,
          startDate,
          status,
          date
        };
        const updatedStore = [...store, person];
      
        localStorage.setItem("attendance", JSON.stringify(updatedStore));
        window.location.href="/"
      };
      
  return (
    <div>
          <div className="container">
               <div className="p-2">
                   <form onSubmit={onSubmit}>
                     <div className="row">
                       <div className="form-data col-md-12 col-lg-6 my-3">
                            <label htmlFor="name" className="py-2 fw-bold">Name</label>
                            <select className="form-control" onChange={(e)=>setName(e.target.value)} id="name" name="name" required>
                                <option value="" disabled selected>Select Name</option>
                                {employeeName.map((name, index) => (
                                    <option key={index} value={name} >{name}</option>
                                ))}
                            </select>
                            
                       </div>
                        <div className="form-data col-md-12 col-lg-6 my-3">
                             <label htmlFor="date" className="d-block py-2 fw-bold">Select Date</label>
                             <DatePicker dateFormat="dd/MM/yyyy"  className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} required />
                        </div>

                        <div className="form-data col-md-12 col-lg-6 my-3">
                             <label htmlFor="days" className="fw-bold">Select Days</label>
                              <select className="form-control" onChange={(e)=>setDate(e.target.value)} id="days" name="days" required>
                                  <option value="" disabled selected>Select Days</option>
                                  {days.map((day, index) => (
                                      <option key={index} value={day} >{day}</option>
                                  ))}
                              </select>
                        </div>
                        <div className="form-data col-md-12 col-lg-6 my-3">
                             <label htmlFor="status" className="fw-bold">Employee Status</label>
                              <select className="form-control" id="status" onChange={(e)=>setStatus(e.target.value)} name="status" required>
                                  <option value="" disabled selected>Select Status</option>
                                  {EmpStatus.map((status, index) => (
                                      <option key={index} value={status} >{status}</option>
                                  ))}
                              </select>
                        </div>
                     </div>
                     <div className="form-data">
                         <button className="btn btn-primary">Submit</button>
                     </div>
                   </form>
               </div>
          </div>
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
  )
}

export default Home
