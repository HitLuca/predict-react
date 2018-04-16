import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import {Chart} from 'react-google-charts';
import {jobPropType} from '../../helpers';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../reference';
import {makeTable} from '../../util/dataReducers';


class ControlledLineChartCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: this.props.jobs,
      metricName: 'rmse'
    };
  }

  render() {
    const data = makeTable(this.state.jobs, this.state.metricName);
    const columns = data[0].map((label) => {
      return {type: 'number', label};
    });
    const [header, ...rows] = data;
    const opts = {
      vAxis: {
        title: this.state.metricName
      },
      hAxis: {
        title: 'Prefix length'
      },
    };

    const chart = <Chart
      chartType="LineChart"
      rows={rows}
      columns={columns}
      options={opts}
      graph_id="rasdasfas"
      width="100%"
      legend_toggle
    />;
    return <Card className="md-block-centered">
      <CardTitle title={`Prefix length by ${this.state.metricName}`}/>
      <CardText>
        {chart}
      </CardText>
    </Card>;
  }
}

ControlledLineChartCard.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  predictionMethod: PropTypes.oneOf([CLASSIFICATION, REGRESSION, NEXT_ACTIVITY]).isRequired,
};

export default ControlledLineChartCard;
