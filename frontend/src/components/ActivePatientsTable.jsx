import React from 'react';
import AllPatientsTable from './AllPatientsTable';

const ActivePatientsTable = () => {
  return <AllPatientsTable filterByStatus="admitted" />;
};

export default ActivePatientsTable;
