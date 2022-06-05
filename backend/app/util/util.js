const dayjs = require('dayjs');
exports.scheduleCreator = (dates, employees, shifts) => {
  // let schedule = {
  //   date: {
  //     shifts: [shifts],
  //     employees: [employees],
  //   },
  //   date: [
  //     {
  //       shift1: {
  //         startTime: startTime,
  //         endTime: endTime,
  //         tags: [tags],
  //         employees: [employees],
  //       },
  //     },
  //     { shift2: [employees] },
  //   ],
  // };

  let scheduleGrid = { columns: [], config: [], rowLabels: [], rows: [], shiftsNeededByWeekday: [] };

  let shiftsNeededByWeekday = { Sun: [], Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [] };
  shifts.map((shift) => {
    // console.log(shift);
    shift.days.split(',').map((day) => {
      shiftsNeededByWeekday[day].push(shift);
    });
  });

  scheduleGrid.shiftsNeededByWeekday = shiftsNeededByWeekday;

  dates.map((date) => {
    let weekday = dayjs(date).format('ddd');
    let day = dayjs(date).format('MM/DD/YYYY');
    let dayWithoutYear = dayjs(date).format('MM/DD');
    let header = `<div>${dayWithoutYear}</div><div>${weekday}</div>`;

    // create columns (header) array => [ "date – weekday", "date - weekday"]
    // column header order defines column order in grid
    if (shiftsNeededByWeekday[weekday]?.length === 0) {
      header += '\nclosed';
    } else {
      // list of shifts
      let names = shiftsNeededByWeekday[weekday].map((shift) => shift.name);
      header += `\nShift(s) needed: ${names}`;
    }
    scheduleGrid.columns.push(header);

    // create column config array of objects => [ {name: "", key: "linking this config to the correct data in the data object", settings}]
    let config = { data: day, weekday: weekday };
    scheduleGrid.config.push(config);
  });

  // create rowData array of objects => [ {dataKey: "value", employee: "Chris", "date":"shiftName"}]
  employees.map((employee) => {
    // create row header array => [ "employee name", "employee name"]
    scheduleGrid.rowLabels.push(employee.firstName);
    // prefill rows with employeeNames to make sure they'll display in the right order
    scheduleGrid.rows[employee.firstName] = {};
  });
  scheduleGrid.rowLabels.push('<bold>NOTES:</bold>');
  scheduleGrid.rows.notes = {};
  // run through dates/columns
  for (let i = 0; i < scheduleGrid.config.length; i++) {
    const key = scheduleGrid.config[i].data;
    const weekday = scheduleGrid.config[i].weekday;
    console.log('\n' + weekday);
    const shifts = shiftsNeededByWeekday[weekday];
    let shiftsNeeded = shifts.map((shift) => shift.name);

    // no shifts, no service
    if (shifts.length === 0) {
      scheduleGrid.rows.notes[key] = 'closed';

      continue;
    }
    //  go through shifts that day
    for (let j = 0; j < shifts.length; j++) {
      const shift = shifts[j];
      const tags = shift.tags;
      let tagsNeeded = shift.tags.map((tag) => tag.id);

      console.log(shift.name + ' now filling');

      for (let k = 0; k < tags.length; k++) {
        const tag = tags[k];

        for (let l = 0; l < employees.length; l++) {
          const employee = employees[l];

          //  can this employee even work that day? TODO: add PTO
          if (!employee?.days?.includes(weekday)) {
            scheduleGrid.rows[employee.firstName] = {
              ...scheduleGrid.rows[employee.firstName],
              [key]: '',
            };
            continue;
          }
          let eTags = employee.tags.map((tag) => tag.id);

          // employee has correct tag and tag is not filled yet and employee is not working yet on that day, schedule this employee
          if (eTags.includes(tag.id) && tagsNeeded.includes(tag.id)) {
            if (scheduleGrid.rows[employee.firstName][key]) {
              console.log(employee.firstName + ' already working on this day');
              continue;
            }

            scheduleGrid.rows[employee.firstName] = {
              ...scheduleGrid.rows[employee.firstName],
              [key]: `${dayjs(shift.startTime).format('hh:mm a')} – ${dayjs(shift.endTime).format('hh:mm a')} (${shift.name} - ${
                tag.name
              })\n  `,
            };
            console.log(shift.name + ' tag ' + tag.name + ' just filled by ' + employee.firstName);
            tagsNeeded = tagsNeeded.filter((element) => element != tag.id);
            //employee was found, go to next tag
            break;
          }
        }
        if (tagsNeeded.length === 0) {
          console.log(shift.name + ' shift just filled\n');
          shiftsNeeded = shiftsNeeded.filter((element) => element != shift.name);
          break;
        }

        if (k === tags.length - 1 && tagsNeeded !== 0) {
          console.log(shift.name + ' could not be filled\n');
          scheduleGrid.rows.notes[key] = shift.name + ' could not be filled\n ';
        }
      }

      if (shiftsNeeded.length === 0) {
        scheduleGrid.rows.notes[key] = 'all shifts were filled\n ';
      }
    }
  }

  let cleanRows = [];
  Object.keys(scheduleGrid.rows).map((row) => {
    cleanRows.push(scheduleGrid.rows[row]);
  });
  scheduleGrid.rows = cleanRows;

  return scheduleGrid;
};

exports.getDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);

    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};
