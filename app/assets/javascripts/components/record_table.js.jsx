var RecordTable = React.createClass({
  handleDeleteRecord: function(record) {
    this.props.handleDeleteRecord(record);
  },

  handleUpdateRecord: function(old_record, record) {
    this.props.handleUpdateRecord(old_record, record);
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
            <th className="col-md-3">Title</th>
            <th className="col-md-3">Date</th>
            <th className="col-md-3">Amount</th>
            <th className="col-md-3"></th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </table>
    )
  }
});