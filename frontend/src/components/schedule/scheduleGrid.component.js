import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

// register Handsontable's modules
registerAllModules();

const colors = [
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
const settings = {
  licenseKey: 'non-commercial-and-evaluation',
  cells(row, column) {
    return {
      // readOnly: true,
      className: colors[row],
    };
  },
};

export default function ScheduleGrid(props) {
  const { columns, rowLabels, rows } = props.data;

  return (
    <div id='hot-app'>
      <HotTable data={rows} settings={settings} colHeaders={columns} rowHeaders={rowLabels} width='95%' stretchH='all' />
    </div>
  );
}
