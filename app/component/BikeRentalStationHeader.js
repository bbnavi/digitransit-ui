import PropTypes from 'prop-types';
import React from 'react';
import Favourite from './Favourite';
import { FormattedMessage } from 'react-intl';
import StopCode from './StopCode';
import BackButton from './BackButton';

const BikeRentalStationHeader = ({ bikeRentalStation, breakpoint }, {config}) => {
  return (
    <div className="bike-station-header">
      {breakpoint === 'large' && (
        <BackButton
          icon="icon-icon_arrow-collapse--left"
          color={config.colors.primary}
          iconClassName="arrow-icon"
        />
      )}
      <div className="header">
        <h3>{bikeRentalStation.name}</h3>
        <div className="bike-station-sub-header">
          <FormattedMessage id="citybike-station-no-id" />
          <StopCode code={bikeRentalStation.stationId} />
        </div>
      </div>
      
      <Favourite/>
    </div>
  );
}

BikeRentalStationHeader.contextTypes = {
  config: PropTypes.object.isRequired,
};

export default BikeRentalStationHeader;