var Record = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },

  propTypes: {
    title: React.PropTypes.string,
    date: React.PropTypes.string,
    amount: React.PropTypes.string
  },

  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/records/' + this.props.record.id,
      success: function(data) {
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: ', error);
      }
    });
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },
  
  recordValue: function(field) {
    return ReactDOM.findDOMNode(this.refs[field]).value;  
  },

  handleUpdate: function(e) {
    e.preventDefault();
    if (this.validRecord()) {
      var record_data = {
        title: this.recordValue("title"),
        date: this.recordValue("date"),
        amount: this.recordValue("amount")
      };
      $.ajax({
        method: 'PUT',
        url: '/api/records/' + this.props.record.id,
        data: { record: record_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.record, data);
          this.setState({ edit: false });
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot update requested record: ', error);
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  },

  validRecord: function() {
    if (this.recordValue("title") &&
        this.recordValue("date") &&
        this.recordValue("amount")) {
      return true;
    } else {
      return false;
    }
  },

  renderForm: function() {
    return(
      <tr>
        <td>
          <input name="title"
                 defaultValue={this.props.record.title}
                 className="form-control"
                 type="text"
                 ref="title"
          />
        </td>
        <td>
          <input name="date"
                 defaultValue={this.props.record.date}
                 className="form-control"
                 type="date"
                 ref="date"
          />
        </td>
        <td>
          <input name="amount"
                 defaultValue={this.props.record.amount}
                 className="form-control"
                 type="text"
                 ref="amount"
          />
        </td>
        <td>
          <a className="btn btn-success btn-sm pull-right"
             onClick={this.handleUpdate}>
            Save
          </a>
          <a className="btn btn-default btn-sm pull-right"
             onClick={this.handleToggle} >
            Cancel
          </a>
        </td>
      </tr>
    );
  },

  renderRecord: function() {
    var record = this.props.record;
    return(
      <tr>
        <td>{record.title}</td>
        <td>{record.date}</td>
        <td>{amountFormat(record.amount)}</td>
        <td>
          <a className="btn btn-danger btn-xs pull-right"
             onClick={this.handleDelete} >
            Delete
          </a>
          <a className="btn btn-primary btn-xs pull-right"
             onClick={this.handleToggle} >
             Edit
          </a>
        </td>
      </tr>
    );
  },

  render: function() {

    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }
});