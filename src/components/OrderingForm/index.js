import React, {Component} from 'react'
import './index.css'

class OrderingForm extends Component {
  state = {
    selectedFile: this.props.activeData.selectedFile || null,
    fileUrl: this.props.activeData.fileUrl || '',
    fileError: '',
    totalPages: this.props.activeData.totalPages || 1,
    numberOfCopies: this.props.activeData.numberOfCopies || 1,
    printType: this.props.activeData.printType || 'black-and-white',
    pages: this.props.activeData.pages || 'all',
    isCustomize: this.props.activeData.pages === 'custom',
    customPages: this.props.activeData.customPages || '',
    customPagesError: '',
    sides: this.props.activeData.sides || 'singleSide',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabId !== this.props.tabId) {
      this.setState(
        {
          selectedFile: this.props.activeData.selectedFile || null,
          fileUrl: this.props.activeData.fileUrl || '',
          fileError: '',
          totalPages: this.props.activeData.totalPages || 1,
          numberOfCopies: this.props.activeData.numberOfCopies || 1,
          printType: this.props.activeData.printType || 'black-and-white',
          pages: this.props.activeData.pages || 'all',
          isCustomize: this.props.activeData.pages === 'custom',
          customPages: this.props.activeData.customPages || '',
          customPagesError: '',
          sides: this.props.activeData.sides || 'singleSide',
        },
        this.updateParentState,
      )
    }
  }

  handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      this.setState(
        {selectedFile: file, fileUrl, fileError: ''},
        this.updateParentState,
      )
    } else {
      this.setState(
        {selectedFile: null, fileUrl: '', fileError: 'Please select a file'},
        this.updateParentState,
      )
    }
  }

  handleCopiesChange = event => {
    this.setState({numberOfCopies: event.target.value}, this.updateParentState)
  }

  handlePrintTypeChange = event => {
    this.setState({printType: event.target.value}, this.updateParentState)
  }

  handleSidesChange = event => {
    this.setState({sides: event.target.value}, this.updateParentState)
  }

  handleTotalPagesChange = event => {
    this.setState({totalPages: event.target.value}, async () => {
      await this.validateCustomPages()
      this.updateParentState()
    })
  }

  handlePagesChange = event => {
    const {selectedFile} = this.state
    const pages = event.target.value

    if (pages === 'all') {
      this.setState(
        {
          pages,
          isCustomize: false,
          fileError: '',
          customPages: '',
          customPagesError: '',
        },
        this.updateParentState,
      )
    } else if (pages === 'custom') {
      if (selectedFile) {
        this.setState(
          {pages, isCustomize: true, fileError: ''},
          this.updateParentState,
        )
      } else {
        this.setState(
          {isCustomize: false, fileError: 'Please select a file to customize'},
          this.updateParentState,
        )
      }
    }
  }

  handleCustomChange = event => {
    const customPages = event.target.value
    this.setState({customPages}, async () => {
      await this.validateCustomPages()
      this.updateParentState()
    })
  }

  validateCustomPages = () => {
    const {customPages, totalPages} = this.state
    const regex = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/
    if (customPages && !regex.test(customPages)) {
      this.setState({
        customPagesError: 'Invalid format. Use formats like 1,3-5,7.',
      })
      return
    }

    // Additional validation to ensure page numbers are within the range of total pages
    if (customPages) {
      const pagesArray = customPages.split(',').map(range => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number)
          return {start, end}
        }
        return {start: Number(range), end: Number(range)}
      })

      for (const {start, end} of pagesArray) {
        if (start < 1 || end > totalPages) {
          this.setState({
            customPagesError: `Pages must be between 1 and ${totalPages}.`,
          })
          return
        }
      }
    }

    this.setState({customPagesError: ''})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {
      selectedFile,
      numberOfCopies,
      printType,
      pages,
      customPages,
      customPagesError,
      totalPages,
      sides,
    } = this.state
    const {tabId, addOrderData} = this.props

    if (!selectedFile) {
      this.setState({fileError: 'Please select a file'})
      return
    }

    if (pages === 'custom' && customPagesError) {
      return
    }

    let totalPagesToPrint = 0

    if (pages === 'custom' && customPages) {
      // Count total pages from custom input
      const pagesArray = customPages.split(',').map(range => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number)
          return end - start + 1 // Calculate number of pages in range
        }
        return 1 // Single page count
      })
      totalPagesToPrint =
        pagesArray.reduce((total, pages) => total + pages, 0) * numberOfCopies
    } else {
      // If not custom, use total pages in the file
      totalPagesToPrint = totalPages * numberOfCopies
    }

    const newObj = {
      id: tabId,
      selectedFile,
      fileUrl: this.state.fileUrl,
      numberOfCopies,
      printType,
      sides,
      pages,
      customPages,
      totalPagesToPrint,
    }

    addOrderData(newObj)

    // Reset form
    this.setState(this.initializeStateFromProps(this.props))
  }

  updateParentState = () => {
    const {
      selectedFile,
      fileUrl,
      numberOfCopies,
      printType,
      pages,
      customPages,
      totalPages,
      sides,
      fileError,
      customPagesError,
    } = this.state
    const {tabId, addOrderData} = this.props

    const hasError =
      fileError !== '' ||
      (customPagesError !== '' && pages === 'custom') ||
      (customPages === '' && pages === 'custom')

    const newObj = {
      id: tabId,
      selectedFile,
      fileUrl,
      numberOfCopies,
      printType,
      sides,
      pages,
      customPages,
      totalPages,
      error: hasError,
    }
    addOrderData(newObj)
  }

  render() {
    const {
      fileError,
      numberOfCopies,
      printType,
      selectedFile,
      fileUrl,
      pages,
      isCustomize,
      customPages,
      customPagesError,
      totalPages,
      sides,
    } = this.state
    return (
      <form className='order-form-container' onSubmit={this.handleSubmit}>
        <div className='input-container'>
          <label htmlFor='fileInput' className='label'>
            Upload File
          </label>
          <input
            className='file-input'
            type='file'
            id='fileInput'
            onChange={this.handleFileChange}
            multiple={false}
          />
          {fileError && <p className='error-message'>{fileError}</p>}
          {fileUrl && (
            <a
              href={fileUrl}
              download={selectedFile.name}
              className='download-link'
            >
              {selectedFile.name}
            </a>
          )}
        </div>
        <div className='input-container'>
          <label htmlFor='totalPages' className='label'>
            Total Pages in File
          </label>
          <input
            className='copies-input'
            type='number'
            id='totalPages'
            value={totalPages}
            min='1'
            onChange={this.handleTotalPagesChange}
          />
          <p className='caution-msg'>
            Please enter the exact number of pages in the uploaded file.
            Incorrect input may result in rejection.
          </p>
        </div>
        <div className='input-container'>
          <label htmlFor='copies' className='label'>
            Copies
          </label>
          <input
            className='copies-input'
            type='number'
            id='copies'
            value={numberOfCopies}
            min='1'
            onChange={this.handleCopiesChange}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='sides' className='label'>
            Sides
          </label>
          <select
            id='sides'
            className='color-input'
            value={sides}
            onChange={this.handleSidesChange}
          >
            <option value='singleSide'>Single Side</option>
            <option value='doubleSide'>Double Side</option>
          </select>
        </div>
        <div className='input-container'>
          <label htmlFor='printType' className='label'>
            Color
          </label>
          <select
            id='printType'
            className='color-input'
            value={printType}
            onChange={this.handlePrintTypeChange}
          >
            <option value='black-and-white'>Black and White</option>
            <option value='color'>Color</option>
          </select>
        </div>
        <div className='input-container'>
          <label htmlFor='pages' className='label'>
            Pages
          </label>
          <select
            id='pages'
            className='color-input'
            value={pages}
            onChange={this.handlePagesChange}
          >
            <option value='all'>All</option>
            <option value='custom'>Custom</option>
          </select>
        </div>
        {isCustomize && (
          <div className='input-container'>
            <label className='label' htmlFor='customPageNumbers'>
              Custom Page Numbers
            </label>
            <input
              type='text'
              placeholder='e.g., 3,5-7'
              className='copies-input'
              value={customPages}
              id='customPageNumbers'
              onChange={this.handleCustomChange}
            />
            {customPagesError && (
              <p className='custom-error-message'>{customPagesError}</p>
            )}
          </div>
        )}
      </form>
    )
  }
}

export default OrderingForm
