import React, { useRef } from 'react';
import { Button, Center, Stack } from '@chakra-ui/react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import * as htmlToImage from 'html-to-image';

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import Handsontable from 'handsontable';

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
  const filename = props.filename;
  // this.hotTableComponent = React.createRef();

  const [copyImg, setCopyImg] = React.useState('Copy image');
  const [downloadCSV, setDownloadCSV] = React.useState('Download CSV');
  const hotTableComponent = useRef(null);
  const handleCopyAsImage = () => {
    var node = document.getElementById('hot-app');
    setCopyImg('Copied!');
    setTimeout(() => setCopyImg('Copy image'), 3000);
    htmlToImage
      .toBlob(node)
      .then(function (blob) {
        navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })]);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };
  const handleDownloadAsCSV = () => {
    console.log(filename);
    setDownloadCSV('Copied!');
    setTimeout(() => setDownloadCSV('Download CSV'), 3000);
    const exportPlugin1 = hotTableComponent.current.hotInstance.getPlugin('exportFile');
    exportPlugin1.downloadFile('csv', {
      bom: false,
      columnDelimiter: ',',
      columnHeaders: false,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: filename,
      mimeType: 'text/csv',
      rowDelimiter: '\r\n',
      rowHeaders: true,
    });
  };

  const settings = {
    licenseKey: 'non-commercial-and-evaluation',
    copyPaste: true,
    cells(row, column, props) {
      if (row === rows.length - 1) {
        // last row is Notes row, white bg
        return {
          // readOnly: true,
          className: 'last-row',
        };
      }
      // fill all empties with "off"
      if (!rows[row][props]) {
        rows[row][props] = 'off';
      }

      return {
        // readOnly: true,
        className: rowColors[row],
      };
    },
  };

  return (
    <>
      <Center>
        <Stack spacing={4} direction='row' align='center'>
          <Button onClick={handleCopyAsImage}>{copyImg}</Button>
          <Button onClick={handleDownloadAsCSV}>{downloadCSV}</Button>
        </Stack>
      </Center>
      <div id='hot-app'>
        <HotTable
          ref={hotTableComponent}
          data={rows}
          settings={settings}
          colHeaders={columns}
          columns={config}
          rowHeaders={rowLabels}
          width='100%'
          stretchH='all'
        />
      </div>
    </>
  );
}
