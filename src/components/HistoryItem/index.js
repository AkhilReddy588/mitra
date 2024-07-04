import {MdDeleteOutline} from 'react-icons/md'
import './index.css'

const HistoryItem = props => {
  const {data, onDelete} = props
  const {shopName, dateTime, streetName, id} = data
  return (
    <div className="history-item">
      <div className="history-item-left-section">
        <img
          src="https://as1.ftcdn.net/v2/jpg/03/45/05/92/1000_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"
          className="history-img"
          alt="shop-thumbnail"
        />
        <div>
          <p className="history-shop-name">
            {shopName}-{streetName}
          </p>
          <p className="history-time">{dateTime}</p>
        </div>
      </div>
      <button
        onClick={() => onDelete(id)}
        type="button"
        className="history-delete-btn"
      >
        <MdDeleteOutline className="history-delete-icon" />
      </button>
    </div>
  )
}

export default HistoryItem
