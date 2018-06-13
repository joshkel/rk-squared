import * as React from 'react';

import { ColDef, RowNode } from 'ag-grid';
import { AgGridReact } from 'ag-grid-react';

import { RecordMateriaDetail } from '../actions/recordMateria';
import { series, SeriesId } from '../data/series';

interface Props {
  recordMateria: RecordMateriaDetail[];
}

interface State {
  filter: string | undefined;
}

type Comparator = ColDef['comparator'];
function compareByNumberField(fieldName: string): Comparator {
  return (valueA, valueB, nodeA, nodeB) => {
    const getField = (node: RowNode | undefined) => ((node || { data: {} }).data || {})[fieldName];
    return getField(nodeA) - getField(nodeB);
  };
}

export class RecordMateriaGrid extends React.Component<Props, State> {
  columnDefs: ColDef[];

  constructor(props: Props) {
    super(props);
    this.columnDefs = [
      {
        headerName: 'Series',
        width: 65,
        field: 'characterId',
        valueGetter: ({data}: {data: RecordMateriaDetail}) => series.short[data.seriesId as SeriesId],
        comparator: compareByNumberField('characterId'),
      },
      { headerName: 'Character', width: 115, field: 'characterName' },
      { headerName: 'RM', width: 45, field: 'order' },
      { headerName: 'Name', width: 175, field: 'name' },
      {
        headerName: 'Description',
        width: 330,
        field: 'description',
        valueGetter: ({data}: {data: RecordMateriaDetail}) => data.description.replace('<br>', ' '),
      },
      {
        headerName: 'Status',
        width: 150,
        field: 'status',
        valueGetter: ({data}: {data: RecordMateriaDetail}) => data.statusDescription,
        comparator: compareByNumberField('status'),
      },
    ];
    this.state = {
      filter: undefined
    };
  }

  handleFilter = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({filter: e.currentTarget.value});
  }

  render() {
    const { recordMateria } = this.props;
    return (
      <div style={{ height: '500px', width: '100%' }} className="ag-theme-balham">
        <div className="form-group">
          <input
            className="form-control form-control-sm"
            placeholder="Search..."
            value={this.state.filter}
            onChange={this.handleFilter}
          />
        </div>
        <AgGridReact
          enableSorting={true}
          enableColResize={true}
          columnDefs={this.columnDefs}
          rowData={recordMateria}
          quickFilterText={this.state.filter}
        >
        </AgGridReact>
      </div>
    );
  }
}
