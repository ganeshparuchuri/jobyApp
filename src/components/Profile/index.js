import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileInfo: {}, apistatus: apiStatusConstants.initial}

  componentDidMount() {
    this.profileApiCall()
  }

  updatedData = profile => ({
    name: profile.name,
    profileImageUrl: profile.profile_image_url,
    shortBio: profile.short_bio,
  })

  failureError = () => (
    <div className="retry">
      <button className="retrybtn">Retry</button>
    </div>
  )

  profileApiCall = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({apistatus: apiStatusConstants.success})
      const fetchedData = await response.json()
      const updateddata = this.updatedData(fetchedData.profile_details)
      this.setState({profileInfo: updateddata})
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
      this.failureError()
    }
  }

  profileCall = () => {
    const {profileInfo} = this.state

    const {name, profileImageUrl, shortBio} = profileInfo
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  loaderSpinner = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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
    const {profileInfo} = this.state
    const {name, profileImageUrl, shortBio} = profileInfo

    return this.renderApiStatus()
  }
}
export default Profile
