var Records = React.createClass({

  getInitialState: function() {
    return { records: [] };
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
  render: function() {
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>React on Rails CapitalFlows</h1>
          <p>by Enrique Martz</p>
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
            <RecordTable records={this.state.records} />
          </div>
        </div>
      </div>
    )
  }
});