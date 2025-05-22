

const Dashboard = () => {

   

  return (
    <>
      <div className="dashboard-container">

        <div className="dashboard-card">
          
          <div className="dashboard-title">
            <h1>Dashboard</h1>
          </div>
          <div className="note-input">
            <textarea name="" id="" className="input-textarea"></textarea>
            <button className='button'>Submit</button>
          </div>
        </div>
        <div>


          <div className="dashboard-notes">
            <div className="note-card">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
              <h4>20-05-2025</h4>
              <div className="note-buttons">
                <button className='edit-button'>Edit</button>
                <button className='delete-button'>Delete</button>
              </div>
            </div>
          </div>
          


        </div>

      </div>

    </>
  )
}

export default Dashboard;