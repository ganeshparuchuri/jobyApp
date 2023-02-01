import {GoLocation} from 'react-icons/go'
import './index.css'

const JobsCard = props => {
  const {JobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = JobsList
  console.log(companyLogoUrl)

  return (
    <div className="jobcard-container">
      <div className="compnylogo-title-container">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt=" company logo"
        />
        <h1 className="title">{title}</h1>
      </div>
      <div className="location-container">
        <div className="jobtype-location-container">
          <div className="logos-container">
            <GoLocation className="logos" />
            <p className="description">{location}</p>
          </div>
          <p className="description">{employmentType}</p>
        </div>
        <p className="description">{packagePerAnnum}</p>
      </div>
      <hr className="hr-line" />
      <h1 className="title">Description</h1>
      <p className="description">{jobDescription}</p>
    </div>
  )
}
export default JobsCard
