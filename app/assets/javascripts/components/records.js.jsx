var Records = React.createClass({

  getInitialState: function() {
    return { records: [],
             sort: "title",
             order: "asc" };
  },

  componentDidMount: function() {
    this.getDataFromApi();
  },

  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/records',
      success: function(data) {
        self.setState({ records: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  },

  handleSearch: function(records) {
    this.setState({ records: records });
  },

  handleAdd: function(record) {
    var records = this.state.records;
    records.push(record);
    this.setState({ records: records });
  },

  credits: function() {
    var credits = this.state.records.filter(function(val) {
      return val.amount >= 0
    });
    return credits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }, 0)
  },

  debits: function() {
    var debits = this.state.records.filter(function(val) {
      return val.amount < 0
    });
    return debits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount)
    }, 0)
  },

  balance: function() {
    return this.debits() + this.credits();
  },

  handleDeleteRecord: function(record) {
    var records = this.state.records.slice();
    var index = records.indexOf(record);
    records.splice(index, 1);
    this.setState({ records: records });
  },

  handleUpdateRecord: function(old_record, record) {
    var records = this.state.records.slice();
    var index = records.indexOf(old_record);
    records.splice(index, 1, record);
    this.setState({ records: records });
  },

  handleSortColumn: function(name, order) {
    if (this.state.sort != name) {
      order = 'asc';
    }
    $.ajax({
      url: '/api/records',
      data: { sort_by: name, order: order },
      method: 'GET',
      success: function(data) {
        this.setState({ records: data, sort: name, order: order });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot sort records: ', error);
      }
    });
  },

  render: function() {
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>React on Rails CapitalFlows</h1>
          <p>by Enrique Martz</p>
        </div>
        <div className='row'>
          <AmountBox type='success' amount={this.credits()} text='Active' />
          <AmountBox type='danger' amount={this.debits()} text='Passive' />
          <AmountBox type='info' amount={this.balance()} text='Balance' />
        </div>
        <div className="row">
          <div className="col-md-4">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
          <div className="col-md-8">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <RecordTable records={this.state.records}
                         sort={this.state.sort}
                         order={this.state.order}
                         handleDeleteRecord={this.handleDeleteRecord}
                         handleUpdateRecord={this.handleUpdateRecord}
                         handleSortColumn={this.handleSortColumn} />
          </div>
        </div>
      </div>
    )
  }
});