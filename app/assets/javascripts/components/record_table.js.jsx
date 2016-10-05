var RecordTable = React.createClass({
  handleDeleteRecord: function(record) {
    this.props.handleDeleteRecord(record);
  },

  handleUpdateRecord: function(old_record, record) {
    this.props.handleUpdateRecord(old_record, record);
  },

  handleSortColumn: function(name, order) {
    this.props.handleSortColumn(name, order);
  },

  render: function() {
    var records = [];
    this.props.records.forEach(function(record) {
      records.push(<Record record={record}
                         key={'record' + record.id}
                         handleDeleteRecord={this.handleDeleteRecord}
                         handleUpdateRecord={this.handleUpdateRecord} />);
    }.bind(this));
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-3 sortable">
              <SortColumn name="title"
                          text="Title"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-3 sortable">
              <SortColumn name="date"
                          text="Date"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-3 sortable">
              <SortColumn name="amount"
                          text="Amount"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </table>
    )
  }
});