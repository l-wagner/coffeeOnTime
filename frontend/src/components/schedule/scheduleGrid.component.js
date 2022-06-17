import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import * as htmlToImage from 'html-to-image';

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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

  const [value, setValue] = React.useState('Copy (as image)');

  const handleCopy = () => {
    var node = document.getElementById('hot-app');
    setValue('Copied!');
    setTimeout(() => setValue('Copy (as image)'), 3000);

    // var node = document.body;

    // htmlToImage
    //   .toPng(node)
    //   .then(function (dataUrl) {
    //     var img = new Image();
    //     img.src = dataUrl;

    //     document.body.appendChild(img);
    //     // navigator.clipboard.write([new window.ClipboardItem({ 'image/png': window.blob })]);
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
    htmlToImage
      .toBlob(node)
      .then(function (img) {
        navigator.clipboard.write([new window.ClipboardItem({ 'image/png': img })]);
        // document.body.appendChild(img);
        // navigator.clipboard.write([new window.ClipboardItem({ 'image/png': window.blob })]);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

    // var urlField = document.querySelector('#hot-5p7mf29h');
    // // var urlField = document.querySelector('#hot-app');

    // // create a Range object
    // var range = document.createRange();
    // // set the Node to select the "range"
    // range.selectNode(urlField);
    // // add the Range to the set of window selections
    // window.getSelection().addRange(range);

    // // execute 'copy', can't 'cut' in this case
    // document.execCommand('copy');
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
      <Button onClick={handleCopy}>{value}</Button>
      <div id='hot-app'>
        <HotTable
          data={rows}
          settings={settings}
          colHeaders={columns}
          columns={config}
          rowHeaders={rowLabels}
          width='95vw'
          stretchH='all'
        />
      </div>
    </>
  );
}
