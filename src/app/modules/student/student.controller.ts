import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    // will call service func to send this data
    const result = await studentServices.createStudentIntoDB(student);
    // send response to the client
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating student: ", error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).send({ message: "Error getting students", error });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentServices.getStudentById(studentId);
    if (!student) {
      res.status(404).send({ success: false, message: "Student not found" });
    }
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).send({ message: "Error getting student", error });
  }
};

// const updateStudent = async (req: Request, res: Response) => {
//   try {
//     const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!student) {
//       res.status(404).send({ message: "Student not found" });
//     }
//     res.status(200).send(student);
//   } catch (error) {
//     res.status(500).send({ message: "Error updating student", error });
//   }
// };

// const deleteStudent = async (req: Request, res: Response) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) {
//       res.status(404).send({ message: "Student not found" });
//     }
//     res.status(200).send({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Error deleting student", error });
//   }
// };

export const studentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
  //   getStudentById,
  //   updateStudent,
  //   deleteStudent,
};
