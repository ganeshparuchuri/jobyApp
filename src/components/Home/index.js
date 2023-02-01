import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="responsive-home">
      <div className="div1">
        <h1 className="home-heading">Find the job that Fits Your Life</h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs" className="links">
          <button className="find-job-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)
export default Home
