export class Employee {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public department: DEPARTMENT
  ) {}
}

export enum DEPARTMENT {
  HR = "HR",
  PS = "PS",
}
