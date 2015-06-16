import React from 'react';

import WizardStore from '../stores/wizard-store';
import WizardActions from '../actions/wizard-actions';
import Catalog from './catalog';

export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.courses = [];
  }

  componentDidMount() {
    this.changeFn = this.onWizardChange.bind(this);
    WizardStore.listen(this.changeFn);
    WizardActions.getWizard();
  }

  componentWillUnmount() {
    WizardStore.unlisten(this.changeFn);
  }

  onWizardChange(store) {
    this.setState(store.wizard);
  }

  render() {
    return (
      <div>
        <div className="jumbotron" style={{'padding': '10px'}}>
          <h1>Your Hogwarts schedule</h1>
        </div>
        <div>
          <div className="panel panel-default" >
            <Catalog catalog={this.state.courses}/>
          </div>
        </div>
      </div>
    );
  }
}
