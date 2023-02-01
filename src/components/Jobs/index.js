import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobsCard from '../jobsCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileInfo: {},
    salary: '',
    jobrole: '',
    jobsList: [],
    apistatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.jobsApiCall()
  }

  updatedData = jobData => ({
    companyLogoUrl: jobData.company_logo_url,
    employmentType: jobData.employment_type,
    id: jobData.id,
    jobDescription: jobData.job_description,
    location: jobData.location,
    packagePerAnnum: jobData.package_per_annum,
    rating: jobData.rating,
    title: jobData.title,
  })

  jobsApiCall = async () => {
    const {salary, jobrole, searchInput} = this.state
    this.setState({apistatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobrole}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${token}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({apistatus: apiStatusConstants.success})
      const data = await response.json()
      const updateddata = data.jobs.map(eachJob => this.updatedData(eachJob))
      this.setState({jobsList: updateddata})
      console.log(updateddata)
    }
  }

  checkBoxSalary = event => {
    this.setState({salary: event.target.value})
  }

  checkBoxEmploye = event => {
    this.setState({jobrole: event.target.value})
  }

  onChangesearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  failureError = () => (
    <div className="retry">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page your looking for</p>
      <button className="retrybtn">Retry</button>
    </div>
  )

  loaderSpinner = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileCall = () => {
    const {jobsList} = this.state

    return jobsList.map(eachJob => (
      <JobsCard key={eachJob.id} JobsList={eachJob} />
    ))
  }

  renderApiStatus = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.profileCall()

      case apiStatusConstants.failure:
        return this.failureError()

      case apiStatusConstants.inProgress:
        return this.loaderSpinner()

      default:
        return null
    }
  }

  render() {
    const {salary, searchInput} = this.state
    console.log(salary)
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-responsive-container">
          <div className="profile-container">
            <Profile />
            <hr className="hr-line" />
            <div>
              <h1 className="employement">Types of Employment</h1>
              <div>
                {employmentTypesList.map(eachEmploye => (
                  <div>
                    <input
                      onChange={this.checkBoxEmploye}
                      type="checkbox"
                      id={eachEmploye.employmentTypeId}
                      name={eachEmploye.employmentTypeId}
                      value={eachEmploye.employmentTypeId}
                    />
                    <label
                      className="label-checkbox"
                      htmlFor={eachEmploye.employmentTypeId}
                    >
                      {eachEmploye.label}
                    </label>
                  </div>
                ))}
                <hr className="hr-line" />
                <div>
                  <h1 className="employement">Salary Range</h1>
                  <div>
                    {salaryRangesList.map(eachSalary => (
                      <div>
                        <input
                          onChange={this.checkBoxSalary}
                          type="checkbox"
                          id={eachSalary.salaryRangeId}
                          name={eachSalary.salaryRangeId}
                          value={eachSalary.salaryRangeId}
                        />
                        <label
                          className="label-checkbox"
                          htmlFor={eachSalary.salaryRangeId}
                        >
                          {eachSalary.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="jobslist-container">
            <div className="input-btn-container">
              <input
                onChange={this.onChangesearchInput}
                placeholder="Search"
                type="search"
                className="input-search"
              />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.profileCall()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
