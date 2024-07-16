import {Link} from 'react-router-dom'
import './index.css'

const ServiceItem = props => {
  const {data} = props
  const {name, location, id} = data

  return (
    <Link to={`/service/${id}`} className="link">
      <div className="service-item-card">
        <img
          src="https://img.freepik.com/free-photo/woman-work-office-using-printer_23-2149456933.jpg?t=st=1720330703~exp=1720334303~hmac=44a89c9c33e18cedd7d643700554727c26894ea3abdda83a319a1ebec7097cb8&w=1060"
          className="service-img"
          alt="service-img"
        />

        <div>
          <Link to={`/service/${id}`} className="link">
            <h1 className="service-name">{name}</h1>
          </Link>
          <p className="service-location">{location}</p>
        </div>
      </div>
    </Link>
  )
}

export default ServiceItem
