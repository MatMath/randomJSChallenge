import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './index.scss'
import React from 'react'

// modules
import TableDisplay from './tableDisplay.jsx'

function getGrowth(param, callback) {
console.log("fetching param");
  fetch('http://localhost:1701/results',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({param:param})
  })
  .then(function(res) {
    // This return the header call of the function, not the data.
    return res.json();
  })
  .then(function(data){
    console.log('Received Data:', data);
    if (data) {
      callback(data);
    }
  })
  .catch(function(ex) {
    // Fail to fetch so keep using the default value.
      window.console.log('parsing failed', ex);
    })
}

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      persPerShip: this.props.param.persPerShip,
      engineMalfunction: this.props.param.engineMalfunction,
      refuilingDefect: this.props.param.refuilingDefect,
      landingFaillure: this.props.param.landingFaillure,
      reusabilityOfShip: this.props.param.reusabilityOfShip,
      improvement: this.props.param.improvement,
      firstStageEngine: this.props.param.firstStageEngine,
      itsEngine: this.props.param.itsEngine,
      touristRatio: this.props.param.touristRatio,
      orbitRefulling: this.props.param.orbitRefulling,
      probIncreaseProdOfIts: this.props.param.probIncreaseProdOfIts,
      itsIncreaseOf: this.props.param.itsIncreaseOf,
      random:0.1,
      maxPop: 10000,
      years: 1000,
      resultOfgrowth: []
    };
    this.changeNumberValue = this.changeNumberValue.bind(this);
    this.getGrowthProjection = this.getGrowthProjection.bind(this);
    this.updateThisState = this.updateThisState.bind(this);
  }
  changeNumberValue (key, event) {
    // This set the value of the proper Key. Note, Key is the second argument after "this"!?! and event is something else that arrive magically.
    // console.log('key:', key);
    // console.log('event:', event, event.target.value);
    this.setState({[key]: parseFloat(event.target.value)});
  }
  updateThisState(data) {
    this.setState({ random: Math.random() });
    // This is because resultOfgrowth is a deepNestedObject and react dosent catch the change. so I kinda force it like that instead of using this.forceUpdate() or using an extra library "immutable"
    // http://stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
    this.setState({ resultOfgrowth: data });

    console.log("after the setState.");
  }
  getGrowthProjection() {
    this.state.resultOfgrowth = [];
    getGrowth(this.state, this.updateThisState);
  }
  render () {
    const {persPerShip, engineMalfunction, refuilingDefect, landingFaillure, reusabilityOfShip, improvement, firstStageEngine, itsEngine, touristRatio, orbitRefulling, probIncreaseProdOfIts, itsIncreaseOf, resultOfgrowth, maxPop, years} = this.state;
    return (
      <div className='container'>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}> Faillure type </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Engine Malfunction</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={engineMalfunction}
                  onChange={this.changeNumberValue.bind(this, 'engineMalfunction')} />
                </div>
            </div>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Refuiling Defect</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='0.01'
                    min='0'
                    value={this.state.refuilingDefect}
                    onChange={this.changeNumberValue.bind(this, 'refuilingDefect')} />
                </div>
            </div>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Landing Faillure</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='0.01'
                    min='0'
                    value={this.state.landingFaillure}
                    onChange={this.changeNumberValue.bind(this, 'landingFaillure')} />
                </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Improvement</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='0.01'
                    min='0'
                    max='1'
                    value={this.state.improvement}
                    onChange={this.changeNumberValue.bind(this, 'improvement')} />
                </div>
              </div>
          </div>
        </div>
        <div className='row col-xs-12'>
          <p>
          % of change of faillure on each component,
          ex: If we have 42 engines to Launch the first stage and 1% chance of defect then a dice is roll for each engine to see if it will fail catastrophically or not.
          </p>
        </div>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}> Ship configuration </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Person per ship</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    min='0'
                    value={persPerShip}
                    onChange={this.changeNumberValue.bind(this, 'persPerShip')} />
                </div>
              </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Reusability of ship</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='1'
                    min='0'
                    max='50'
                    value={this.state.reusabilityOfShip}
                    onChange={this.changeNumberValue.bind(this, 'reusabilityOfShip')} />
                  </div>
              </div>
            </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>First Stage Engine</label>
                <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={firstStageEngine}
                  onChange={this.changeNumberValue.bind(this, 'firstStageEngine')} />
                  </div>
              </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>ITS Engine</label>
                <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={this.state.itsEngine}
                  onChange={this.changeNumberValue.bind(this, 'itsEngine')} />
                  </div>
              </div>
            </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Tourist Ratio</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    min='0'
                    step='0.01'
                    max='1'
                    value={touristRatio}
                    onChange={this.changeNumberValue.bind(this, 'touristRatio')} />
                  </div>
              </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Orbit Refulling</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='1'
                    min='0'
                    max='50'
                    value={this.state.orbitRefulling}
                    onChange={this.changeNumberValue.bind(this, 'orbitRefulling')} />
                  </div>
              </div>
          </div>
        </div>
        <div className='row col-xs-12'>
          <ul>
            <li>Person per ship: Number of person that fit in each ship.</li>
            <li>Reusability of ship: Number of trip a ship can do before being recycled</li>
            <li>First Stage Engine: Number of Engine that lift the first stage</li>
            <li>ITS Engine: Number of engine inside the Interplanettery Transport System</li>
            <li>Tourist Ratio: Number of people that return in each ship (when available) (tourist)</li>
            <li>Orbit Refulling: Number of refuelling in orbit needed</li>
          </ul>
        </div>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}> Production increase </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Chance of increase</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    min='0'
                    step='0.01'
                    max='1'
                    value={probIncreaseProdOfIts}
                    onChange={this.changeNumberValue.bind(this, 'probIncreaseProdOfIts')} />
                  </div>
              </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>ITS Increase Of</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='1'
                    min='0'
                    max='50'
                    value={this.state.itsIncreaseOf}
                    onChange={this.changeNumberValue.bind(this, 'itsIncreaseOf')} />
                  </div>
              </div>
            </div>
        </div>
        <div className='row col-xs-12'>
          <p>Chance of increase: Chance that this round we increase the ship production by a factor of "ITS Increase"</p>
        </div>

        <div className={`row col-xs-12 bg-warning ${styles.splitSection}`}> Run parameters </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Population to reach</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    min='100'
                    step='100'
                    max='5000000'
                    value={maxPop}
                    onChange={this.changeNumberValue.bind(this, 'maxPop')} />
                  </div>
              </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Max number of run</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='1'
                    min='1'
                    max='1000'
                    value={this.state.years}
                    onChange={this.changeNumberValue.bind(this, 'years')} />
                  </div>
              </div>
            </div>
        </div>
        <div className='row col-xs-12'>
        <h4>Risk list:</h4>
        <ul>
          <li>TakeOff (Each engine)</li>
          <li>Refueling (each time)</li>
          <li>Journey to mars (Each engine)</li>
          <li>Decelarating on arrival (Each engine)</li>
          <li>Landing on mars</li>
          <li>Refueling --> No loss of life, just ship</li>
          <li>TakeOff/Journey (Each engine)</li>
          <li>Decelarating on arrival (Each engine)</li>
          <li>Landing on earth</li>
        </ul>
        </div>

        <div className={`row ${styles.submit_btn}`}>
          <button className={`btn btn-lg btn-success`} onClick={this.getGrowthProjection}>Get the Data!</button>
        </div>
        {resultOfgrowth.length > 0 && <TableDisplay resultOfgrowth={resultOfgrowth}></TableDisplay>}
      </div>
    )
  }
}
