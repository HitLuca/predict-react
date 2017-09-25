/**
 * Created by Tõnis Kasekamp on 25.09.2017.
 */
import React from 'react';
import {storiesOf} from '@kadira/storybook';
import LineChartCard from '../src/components/chart/LineChartCard';
import EventChartCard from '../src/components/chart/EventChartCard';

const fetchState = {inFlight: false};

const traces = {
  '2011-10-01': 23,
  '2011-10-03': 119,
  '2011-10-04': 85,
  '2011-10-05': 106,
  '2011-10-06': 80,
  '2011-10-07': 83
};

const resources = {
  '2011-10-01': 7,
  '2011-10-03': 13,
  '2011-10-04': 12,
  '2011-10-05': 14,
  '2011-10-06': 11,
  '2011-10-07': 13,
  '2011-10-08': 7,
};

const events = {
  'W_Assessing_application': 4098,
  'W_Calling _missing_information': 1647,
  'W_Calling_after_offers': 4464,
  'W_Check_for_fraud': 130,
  'W_Filling_in application': 6117,
  'W_Fixing_incoming_lead': 3588
};

storiesOf('Charts', module)
  .add('LineChartCard', () => {
      return (
        <div className="md-grid">
          <div className="md-cell md-cell--12">
            <LineChartCard fetchState={fetchState}
                           data={traces}
                           cardTitle="Number of traces"
                           chartTitle="Active traces"/>
          </div>
          <div className="md-cell md-cell--12">
            <LineChartCard fetchState={fetchState}
                           data={resources}
                           cardTitle="Number of resources"
                           chartTitle="Active traces"/>
          </div>
          <div className="md-cell md-cell--12">
            <EventChartCard fetchState={fetchState} data={events}/>
          </div>
        </div>
      );
    }
  );
