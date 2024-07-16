import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {FaPlus} from 'react-icons/fa'
import {IoCloseSharp} from 'react-icons/io5'
import Header from '../Header'
import OrderingForm from '../OrderingForm'
import './index.css'

class OrderingPage extends Component {
  state = {
    tabs: [{id: uuidv4(), name: 'File-1'}],
    activeTabId: '',
    dataList: [],
    errorMessage: '',
  }

  componentDidMount() {
    // Set the initial activeTabId to the id of the first tab
    const {tabs} = this.state
    this.setState({activeTabId: tabs[0].id})
  }

  addOrderData = obj => {
    this.setState(prevState => {
      const {dataList} = prevState
      const existingIndex = dataList.findIndex(data => data.id === obj.id)
      if (existingIndex !== -1) {
        // Update the existing object
        const updatedDataList = dataList.map((data, index) =>
          index === existingIndex ? obj : data,
        )
        return {dataList: updatedDataList}
      }
      // Add the new object
      return {dataList: [...dataList, obj]}
    })
  }

  onAddTab = () => {
    this.setState(prevState => {
      const {tabs} = prevState
      const newTabId = uuidv4()
      return {
        tabs: [...tabs, {id: newTabId, name: `File-${tabs.length + 1}`}],
        activeTabId: newTabId,
      }
    })
  }

  onRemoveTab = id => {
    this.setState(prevState => {
      const {tabs, dataList} = prevState
      const updatedTabs = tabs.filter(eachItem => eachItem.id !== id)
      const updatedDataList = dataList.filter(eachItem => eachItem.id !== id)
      const newActiveTabId = updatedTabs.length > 0 ? updatedTabs[0].id : ''

      return {
        tabs: updatedTabs,
        dataList: updatedDataList,
        activeTabId: newActiveTabId,
      }
    })
  }

  handleTabClick = tabId => {
    this.setState({activeTabId: tabId})
  }

  onProceedToPayment = () => {
    const {dataList} = this.state

    // Check for errors in the data list
    const hasErrors = dataList.some(item => item.error)
    const fileSelectionErr = dataList.some(item => item.selectedFile === null)

    console.log(dataList)

    if (dataList.length === 0) {
      this.setState({errorMessage: `You haven't selected any files yet`})
    } else if (fileSelectionErr) {
      this.setState({
        errorMessage: `Please make sure to upload a file in the edited tabs before proceeding.`,
      })
    } else if (hasErrors) {
      this.setState({
        errorMessage: 'Please fix the errors in the form before proceeding.',
      })
    } else {
      // If no errors, clear the error message and reset the form
      const {tabs} = this.state
      this.setState(
        {
          errorMessage: '',
          tabs: [{id: uuidv4(), name: 'File-1'}],
          activeTabId: '',
          dataList: [],
        },
        () => {
          // Set the initial activeTabId to the id of the first tab after resetting the state
          this.setState({activeTabId: tabs[0].id})
        },
      )

      // If no errors, send dataList to the backend
      // Replace this with your actual backend call
      const cleanedDataList = dataList.map(({error, ...rest}) => rest)
      console.log(cleanedDataList)
    }
  }

  renderOrderingPage = () => {
    const {tabs, activeTabId, dataList} = this.state
    const activeData =
      dataList.find(eachItem => eachItem.id === activeTabId) || {}

    return (
      <div className="order-form">
        <div className="tabs-bar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${
                tab.id === activeTabId ? 'tab-button-active' : 'tab-button'
              }`}
              onClick={() => this.handleTabClick(tab.id)}
              type="button"
            >
              <p>{tab.name}</p>
              <IoCloseSharp
                onClick={e => {
                  e.stopPropagation()
                  this.onRemoveTab(tab.id)
                }}
                className="remove-file-button"
              />
            </button>
          ))}
          <button className="plus-button" type="button" onClick={this.onAddTab}>
            <FaPlus />
          </button>
        </div>
        <hr className="line" />
        <OrderingForm
          key={activeTabId} // Forces re-mounting the component to reset the form
          tabId={activeTabId}
          addOrderData={this.addOrderData}
          activeData={activeData}
        />
      </div>
    )
  }

  render() {
    const {errorMessage} = this.state
    return (
      <div className="ordering-page-container">
        <Header />
        <div className="ordering-page-content">
          <h1 className="customize-order-heading">Make Your Order</h1>
          {this.renderOrderingPage()}
          {errorMessage !== '' && (
            <p className="order-error-message">{errorMessage}</p>
          )}
          <button
            type="button"
            className="proceed-order-button"
            onClick={this.onProceedToPayment}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    )
  }
}

export default OrderingPage
