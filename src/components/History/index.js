import {Component} from 'react'
import Header from '../Header'
import HistoryItem from '../HistoryItem'
import Footer from '../Footer'
import './index.css'

const historyList = [
  {
    id: 1,
    shopName: 'PrintPro',
    amountPaid: 15.0,
    dateTime: '2025 June 24 at 7 PM',
    streetName: 'Main Street',
    landmark: 'Near City Park',
  },
  {
    id: 2,
    shopName: 'CopyHub',
    amountPaid: 8.5,
    dateTime: '2025 June 24 at 7 PM',
    streetName: 'Elm Street',
    landmark: 'Opposite Central Library',
  },
  {
    id: 3,
    shopName: 'QuickPrint',
    amountPaid: 20.0,
    dateTime: '2025 June 24 at 7 PM',
    streetName: 'Oak Street',
    landmark: 'Next to Coffee Shop',
  },
  {
    id: 4,
    shopName: 'FastCopies',
    amountPaid: 12.0,
    dateTime: '2025 June 24 at 7 PM',
    streetName: 'Pine Street',
    landmark: 'Across from Grocery Store',
  },
]

class History extends Component {
  state = {dataList: historyList}

  onDelete = id => {
    const {dataList} = this.state
    const newList = dataList.filter(eachItem => eachItem.id !== id)
    this.setState({dataList: newList})
  }

  render() {
    const {dataList} = this.state

    return (
      <div className="history-container">
        <Header />
        <div className="history-content">
          <h1 className="history-heading">HISTORY</h1>
          <div className="history-box">
            <h1 className="history-box-heading">Recent Transactions:</h1>
            {dataList.map(eachItem => (
              <HistoryItem
                data={eachItem}
                onDelete={this.onDelete}
                key={eachItem.id}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default History
