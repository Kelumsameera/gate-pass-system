import Student from "../models/Student.js";

export function createStudent(req, res) {
  const student = new Student(req.body);
  student.save().then(() => {
    res.json({ message: "Student created successfully" });
  });
}

export function getAllStudents(req, res) {
  Student.find().then((students) => {
    res.json(students);
  });
}
