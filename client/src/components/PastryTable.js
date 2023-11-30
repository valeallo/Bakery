import React from 'react';
import { useTable } from 'react-table';

const PastryTable = ({ pastries }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Quantity', accessor: 'quantity' },
      // Add more columns 
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: pastries });

  return (
    <table >
      
    </table>
  );
};

export default PastryTable;