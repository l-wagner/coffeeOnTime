Todo:
- replace findEmployeeByName with debounced inplace search
- let users rename tags/skills/roles
- figure out how to create owners - is it a default tag? should employees who own the business simply get an owner tag?
- switch to redux hooks
- change form validation design
- pull tags for business only

order of creation:
- business
- roles
- shifts (need roles)
- employees (need roles, and business)
- schedule (needs shifts and employees)