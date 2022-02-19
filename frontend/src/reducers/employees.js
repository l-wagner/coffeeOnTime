import {
  CREATE_EMPLOYEE,
  RETRIEVE_EMPLOYEES,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  DELETE_ALL_EMPLOYEES,
} from "../actions/types";

const initialState = [];

function employeeReducer(employees = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_EMPLOYEE:
      return [...employees, payload];

    case RETRIEVE_EMPLOYEES:
      return payload;

    case UPDATE_EMPLOYEE:
      return employees.map((employee) => {
        if (employee.id === payload.id) {
          return {
            ...employee,
            ...payload,
          };
        } else {
          return employee;
        }
      });

    case DELETE_EMPLOYEE:
      return employees.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_EMPLOYEES:
      return [];

    default:
      return employees;
  }
};

export default employeeReducer;