import {Component} from 'react'
import Header from '../Header'
import AvailableServiceItem from '../AvailableServiceItem'

import './index.css'

const dataObj = {
  imageUrl:
    'https://as1.ftcdn.net/v2/jpg/03/45/05/92/1000_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg',
  shopName: 'Priya lakshmi warrior Xerox',
  location: 'Gandhi Road',
  email: 'priya123@gmail.com',
  mobile: '9908360770',
}

const availableServicesList = [
  {serviceName: 'Black & White Printing', price: 1},
  {serviceName: 'Color Printing', price: 3},
  {serviceName: 'Photocopying', price: 10},
  {serviceName: 'Scanning', price: 10},
  {serviceName: 'Binding', price: 50},
  {serviceName: 'Laminating', price: 2},
]

class ServiceItemDetails extends Component {
  startOrder = () => {
    const {history, match} = this.props
    const {params} = match
    const {id} = params
    history.push(`/service/${id}/order`)
  }

  render() {
    const {shopName, imageUrl, location, email, mobile} = dataObj
    return (
      <div className="service-item-details-container">
        <Header />
        <div className="service-item-details-content">
          <div className="shop-keeper-details">
            <div className="shop-profile">
              <img src={imageUrl} className="shop-icon" alt="shop-img" />
              <div>
                <h1>{shopName}</h1>
                <p>{location}</p>
                <div className="contact-details-mobile-view">
                  <p>
                    <span className="contact-span">Email:</span> {email}
                  </p>
                  <p>
                    <span className="contact-span">Phone No:</span> {mobile}
                  </p>
                </div>
              </div>
            </div>
            <div className="shop-contact-details">
              <p>
                <span className="contact-span">Email:</span> {email}
              </p>
              <p>
                <span className="contact-span">Phone No:</span> {mobile}
              </p>
            </div>
          </div>
          <div className="services-providing-container">
            <div className="available-services-container">
              <h1 className="available-services-heading">Available Services</h1>
              <div className="available-services-list">
                {availableServicesList.map(eachItem => (
                  <AvailableServiceItem
                    data={eachItem}
                    key={eachItem.serviceName}
                  />
                ))}
              </div>
            </div>
            <div className="start-order-card">
              <h1 className="start-order-card-heading">
                Print Documents and Presentations with Ease
              </h1>
              <p className="start-order-card-para">
                Discover the convenience of our online printing services! Our
                new and improved platform is designed to make ordering easier
                than ever, from any device. Whether you need high-quality black
                and white prints or vibrant color prints, we've got you covered.
                Experience a seamless ordering process with our user-friendly
                interface. Start your print journey with us today!
              </p>
              <button
                type="button"
                onClick={this.startOrder}
                className="start-order-btn"
              >
                Start Order
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceItemDetails
