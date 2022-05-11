"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPARTMENT = exports.Employee = void 0;
class Employee {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}
exports.Employee = Employee;
var DEPARTMENT;
(function (DEPARTMENT) {
    DEPARTMENT["HR"] = "HR";
    DEPARTMENT["PS"] = "PS";
})(DEPARTMENT = exports.DEPARTMENT || (exports.DEPARTMENT = {}));
