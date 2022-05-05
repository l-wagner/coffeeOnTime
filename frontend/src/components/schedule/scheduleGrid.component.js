import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

// register Handsontable's modules

registerAllModules();

const rowColors = [
  'light-pink',
  'deep-champagne',
  'lemon-yellow-crayola',
  'tea-green',
  'electric-blue',
  'baby-blue-eyes',
  'maximum-blue-purple',
  'mauve',
  'baby-powder',
];

export default function ScheduleGrid(props) {
  const { columns, rowLabels, rows, config } = props.data;

  const settings = {
    licenseKey: 'non-commercial-and-evaluation',
    cells(row, column, props) {
      if (row === rows.length - 1) {
        // last row is Notes row, white bg
        return {
          // readOnly: true,
          className: 'last-row',
        };
      }
      return {
        // readOnly: true,
        className: rowColors[row],
      };
    },
  };

  return (
    <div id='hot-app'>
      <HotTable data={rows} settings={settings} colHeaders={columns} columns={config} rowHeaders={rowLabels} stretchH='all' />
    </div>
  );
}
