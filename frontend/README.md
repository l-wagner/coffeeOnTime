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

order of creation:
- business
- roles
- shifts (need roles)
- employees (need roles, and business)
- schedule (needs shifts and employees)

Tests:
- Deleting tags removes them from employees
- 