import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

// register Handsontable's modules
registerAllModules();

const settings = {
  licenseKey: 'non-commercial-and-evaluation',
};

export default function ScheduleGrid(props) {
  const { columns, rowLabels, rows } = props.data;

  return (
    <div id='hot-app'>
      <HotTable data={rows} settings={settings} colHeaders={columns} rowHeaders={rowLabels} width='600' height='300' />
    </div>
  );
}
