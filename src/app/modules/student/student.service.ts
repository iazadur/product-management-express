import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (student: Student): Promise<Student> => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async (): Promise<Student[]> => {
  const students = await StudentModel.find();
  return students;
};


const getStudentById = async (id: string): Promise<Student | null> => {
  const student = await StudentModel
    .findById(id)
    .exec();
  return student;
}

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentById,
};
