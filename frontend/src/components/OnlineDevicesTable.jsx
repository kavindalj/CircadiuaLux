import React from 'react';
import AllDevicesTable from './AllDevicesTable';

const ConnectedDevicesTable = () => {
  return <AllDevicesTable filterByStatus="online" />;
};

export default ConnectedDevicesTable;