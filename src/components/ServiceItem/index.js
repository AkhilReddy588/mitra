import {Link} from 'react-router-dom'
import './index.css'

const ServiceItem = props => {
  const {data} = props
  const {name, location, id} = data
  return (
    <Link to={`/service/${id}`}>
      <div className="service-item-card">
        <img
          src="https://as1.ftcdn.net/v2/jpg/03/45/05/92/1000_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
          className="service-img"
          alt="service-img"
        />
        <div>
          <h1 className="service-name">{name}</h1>
          <p className="service-location">{location}</p>
        </div>
      </div>
    </Link>
  )
}

export default ServiceItem
