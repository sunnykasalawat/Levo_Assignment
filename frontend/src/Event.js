
import React, {useEffect , useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// function App() {
//   const [data, setData]=useState({})
//   useEffect(()=> {
//     fetchData();
//   },[])

//   const fetchData=async ()=>{
//     try {
//       const response=await fetch('http://127.0.0.1:5000/api/data')
//       const jsonData=await response.json();
//       setData(jsonData)

//     } catch (error) {
//       console.log('Error',error)
      
//     }
//   }

//   return (
//     <div className="App">
//      <h1>Hello world</h1>
//      <h3>{data.message}</h3>
//     </div>
//   );
// }

function Event(){
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [emails, setEmailString] = useState('');

  const handleEmailChange = (event) => {
    setEmailString(event.target.value);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      title,
      description,
      start_date: startDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
      end_date: endDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
      emails
    };

    try {
      const response=await fetch('http://127.0.0.1:5000/api/events',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event created successfully!');
        // Optionally reset form fields
        setTitle('');
        setDescription('');
        setStartDate(new Date());
        setEndDate(new Date());
        setEmailString('');
      } else {
        const errorData = await response.json();
        alert(`Failed to create event: ${errorData.error}`);
      }
      
    } catch (error) {
      console.error('Error:', error);
      
    }

  };

return(
  <div className='container mt-5'>
  <div className='row justify-content-center'>
    <div className='col-md-8 col-lg-6'>
      <div className='card shadow-lg'>
        <div className='card-header bg-primary text-white'>
          <h3 className='mb-0'>Create an Event</h3>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                className="form-control"
                id="Title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Desc">Description</label>
              <input
                type="text"
                className="form-control"
                id="Desc"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="StartDate">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="EndDate">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Emails">Emails (comma separated)</label>
              <input
                type="text"
                className="form-control"
                id="Emails"
                value={emails}
                onChange={handleEmailChange}
                placeholder="Enter email addresses separated by commas"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
      );
}

export default Event;
