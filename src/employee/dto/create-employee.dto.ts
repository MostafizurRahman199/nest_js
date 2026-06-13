import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  // Profile fields
  @IsString()
  Name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;

  @IsString()
  status: string;

  // Employee fields
  @IsString()
  employeeCode: string;

  @IsNumber()
  salary: number;

  @IsString()
  department: string;

  @IsDateString()
  joinDate: Date;

  @IsString()
  designation: string;

  @IsString()
  employeeStatus: string;
}
