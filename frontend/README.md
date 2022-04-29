Todo:
- replace findEmployeeByName with debounced inplace search
- change form validation design
- add loader gifs
- add shifts
- checkout Gatsby.js
- use react form in new employee table row
- table sorting
- show newly created row without refresh    
- allow adding of new roles in employee row
- validate start < endTime
- ability to select all days at once
- Create schedule
    - show list of shifts and avaliable employess
    - save
    - submit
- multiples of same tag in shift? 
    - buttons in dropdown? click on tag to remove tag?
- add info that "closed" means no shifts have been scheduled on that day
- add unfilled shift array and remove from it as shifts are fully filled as to not double fill
- show unfilled shifts in UI
- open - close end times of shifts need to be called different sometimes. open - close, 7am BOH, maybe make end time optional

order of creation:
- business
- roles
- shifts (need roles)
- employees (need roles, and business)
- schedule (needs shifts and employees)

Tests:
- Deleting tags removes them from employees
- 