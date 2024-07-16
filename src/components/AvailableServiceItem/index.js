import './index.css'

const AvailableServiceItem = props => {
  const {data} = props
  const {serviceName, price} = data
  return (
    <div className="available-service-item-card">
      <h1 className="available-service-name">{serviceName}</h1>
      <p className="available-service-price">{price}/-</p>
    </div>
  )
}

export default AvailableServiceItem
