var RecordTable = React.createClass({
  render: function() {
    var records = [];
    this.props.records.forEach(function(record) {
      records.push(<Record record={record}
                         key={'record' + record.id}/>);
    }.bind(this));
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-3">Title</th>
            <th className="col-md-2">Date</th>
            <th className="col-md-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </table>
    )
  }
});