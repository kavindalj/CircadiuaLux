import React from 'react';
import AllDevicesTable from './AllDevicesTable';

const ConnectedDevicesTable = () => {
  return <AllDevicesTable filterByStatus="Online" />;
};

export default ConnectedDevicesTable;