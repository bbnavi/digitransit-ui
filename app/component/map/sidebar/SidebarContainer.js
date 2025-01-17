import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { routerShape } from 'found';
import CardHeader from '../../CardHeader';
import withBreakpoint from '../../../util/withBreakpoint';
import MarkerPopupBottom from '../MarkerPopupBottom';
import storeOrigin from '../../../action/originActions';
import storeDestination from '../../../action/destinationActions';
import { dtLocationShape } from '../../../util/shapes';

const SidebarContainer = (
  {
    location,
    name,
    description,
    photoUrl,
    icon,
    breakpoint,
    children,
    className,
    newLayout = false,
  },
  { router, executeAction },
) => {
  const isMobile = breakpoint !== 'large';

  const onSelectLocation = (item, id) => {
    if (item.type === 'FutureRoute') {
      router.push(item.properties.url);
    } else if (id === 'origin') {
      router.push('/');
      executeAction(storeOrigin, item);
    } else {
      router.push('/');
      executeAction(storeDestination, item);
    }
  };
  const applyLayout = () => {
    if (newLayout) {
      return '';
    }
    return isMobile ? 'padding-horizontal-large' : 'padding-horizontal-xlarge';
  };

  return (
    <div
      className={cx(
        'card',
        !isMobile && !newLayout && 'sidebar-card-desktop',
        'sidebar-card',
        'popup',
      )}
    >
      <div className={`${applyLayout()} ${className}`}>
        <CardHeader
          name={name}
          descClass="padding-vertical-small"
          unlinked
          className={cx(
            'sidebar-card-header',
            newLayout ? 'padding-new-layout' : '',
          )}
          icon={icon}
          headerPictureUrl={photoUrl}
          headingStyle="h1"
          description={description}
          showCardSubHeader={Boolean(description)}
          showBackButton={!isMobile}
        />
        {children}
        {location && (
          <div className="padding-vertical-normal">
            <MarkerPopupBottom
              onSelectLocation={onSelectLocation}
              location={location}
            />
          </div>
        )}
      </div>
    </div>
  );
};

SidebarContainer.propTypes = {
  location: dtLocationShape,
  name: PropTypes.string,
  description: PropTypes.string || PropTypes.node,
  icon: PropTypes.string,
  photoUrl: PropTypes.string,
  breakpoint: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  newLayout: PropTypes.bool,
};

SidebarContainer.defaultProps = {
  location: null,
  icon: null,
  children: null,
  className: null,
  name: '',
  description: '',
  photoUrl: '',
};

SidebarContainer.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
};

export default withBreakpoint(SidebarContainer);
