Todo:

- save RTO
- save colors by employee
- when exporting to CSV, some empty cells might not be rendered yet. Fill with "off" server side.
- limit table width to vw.
- add search
- set filename from data, not only when selecting range on calendar, to also reliably use filename for old schedules
- keep download & export buttons same width when clicked
- add loader gifs
- checkout Gatsby.js
- use react form in new employee table row
- table sorting
- show newly created row without refresh
- allow adding of new roles in employee row
- validate start < endTime
- ability to select all days at once
- multiples of same tag in shift?
  - buttons in dropdown? click on tag to remove tag?
- add info that "closed" means no shifts have been scheduled on that day
- open - close end times of shifts need to be called different sometimes. open - close, 7am BOH, maybe make end time optional
- row data wasn't shown in correct columns: add columns=config to HOT
- save schedule
- export schedule
- indicate if shifts were updated since selected schedule was created -> recreate would change schedule
- indicate if schedule was manually updated and they try to rerun -> recreate would change schedule
- create business screen: add last names, add "add" button to add multiples separately
- add last names
- add all to day dropdown
- login: read owner tag and handle accordingly in FE
- RTO screen:
  - load rto on page load
  - show any upcoming RTO
  - sort by date
  - owner view/manage rto 
- icons not showing up on dashboard
- split up calendar into two week batches
- replace empty elements with off

order of creation:

- business
- roles
- shifts (need roles)
- employees (need roles, and business)
- schedule (needs shifts and employees)

Tests:

- Deleting tags removes them from employees
-
