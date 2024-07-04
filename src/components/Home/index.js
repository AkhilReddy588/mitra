import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import ServiceItem from '../ServiceItem'
import Footer from '../Footer'
import './index.css'

const servicesList = [
  {
    id: 1,
    name: 'Quick Copy Center',
    location: '123 Main St, Springfield',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Print Perfect',
    location: '456 Elm St, Shelbyville',
    rating: 4.0,
  },
  {
    id: 3,
    name: 'Copy Central',
    location: '789 Oak St, Capital City',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Xerox Express',
    location: '321 Maple St, Ogdenville',
    rating: 4.2,
  },
  {
    id: 5,
    name: 'Fast Prints',
    location: '654 Pine St, North Haverbrook',
    rating: 3.9,
  },
  {
    id: 6,
    name: 'Rapid Copy',
    location: '987 Cedar St, Springfield',
    rating: 4.3,
  },
  {
    id: 7,
    name: 'Perfect Prints',
    location: '432 Birch St, Shelbyville',
    rating: 4.1,
  },
  {
    id: 8,
    name: 'Central Copies',
    location: '876 Pine St, Capital City',
    rating: 4.7,
  },
  {
    id: 9,
    name: 'Express Prints',
    location: '654 Spruce St, Ogdenville',
    rating: 3.8,
  },
  {
    id: 10,
    name: 'Copy Fast',
    location: '321 Walnut St, North Haverbrook',
    rating: 4.4,
  },
]

class Home extends Component {
  state = {dataList: servicesList, searchInput: '', originalSearchInput: ''}

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onSearch = event => {
    event.preventDefault()
    const {searchInput} = this.state
    this.setState({originalSearchInput: searchInput})
  }

  render() {
    const {dataList, originalSearchInput, searchInput} = this.state
    const filteredDataList = dataList.filter(eachItem =>
      eachItem.name.toLowerCase().includes(originalSearchInput.toLowerCase()),
    )
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          <h1 className="services-heading">Services</h1>

          <form className="search-form" onSubmit={this.onSearch}>
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              placeholder="Search for shop"
              className="search-input"
            />
            <button className="search-button" type="submit">
              <FaSearch />
            </button>
          </form>
          <div className="services">
            {filteredDataList.map(eachItem => (
              <ServiceItem data={eachItem} key={eachItem.id} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
