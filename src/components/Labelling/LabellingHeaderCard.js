import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './../FetchState';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {splitLabels} from '../../helpers';
import LabelControls from './LabelControls';

const ValidationHeaderCard = (props) => {
  const prefixControls = props.prefixLengths.map((prefix) => ({label: prefix, value: prefix}));

  const defaultValue = ',' + props.selectedPrefixes.join(',');

  const checkBoxChange = (value, event) => {
    props.prefixChange(event.target.value);
  };

  const checkies = props.prefixLengths.length > 0 ?
    <SelectionControlGroup type="checkbox" label="Prefix lengths" name="prefixLengths" id="prefixLengths"
                           onChange={checkBoxChange} controls={prefixControls} inline
                           value={defaultValue}/> : null;
  const selectChange = (value, _) => {
    props.splitChange(value);
  };

  return <Card className="md-block-centered">
    <CardTitle title="Labelling result selection">
      <SelectField
        id="log-name-select"
        placeholder="log.xes"
        className="md-cell"
        menuItems={props.splitLabels}
        position={SelectField.Positions.BELOW}
        onChange={selectChange}
        value={props.selectedSplitId}
      /></CardTitle>
    <CardText>
      <LabelControls labelChange={props.labelChange} {...props.filterOptions}/>
      {checkies}
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


ValidationHeaderCard.propTypes = {
  splitLabels: splitLabels,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  splitChange: PropTypes.func.isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.string).isRequired,
  prefixChange: PropTypes.func.isRequired,
  selectedPrefixes: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedSplitId: PropTypes.number.isRequired,
  labelChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    label: PropTypes.any.isRequired,
    attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};
export default ValidationHeaderCard;