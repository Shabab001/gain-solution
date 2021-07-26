const Student = require("../../models/Student.model");
const Subject = require("../../models/Subject.model");

module.exports = {
  Query: {
    hello: () => {
      return "Hello";
    },
    getStudents: async () => {
      return await Student.find();
    },
  },
  Mutation: {
    createStudent: async (_, { input }, context, info) => {
      const newStudent = new Student(input);
      try {
        const student = await newStudent.save();
        if (student) {
          return student;
        }
      } catch (error) {
        console.log(error);
        throw new Error("Student not created");
      }
    },
    updateStudent: async (_, { id, subject, input }) => {
      console.log(subject);

      console.log("hi");
      let result = null;
      if (subject && input && subject.length) {
        console.log("here2");

        result = await Student.findByIdAndUpdate(
          id,
          {
            ...input,
            $set: { subject: subject },
          },
          { new: true }
        );
        await Promise.all(
          subject.map(async id => {
            const sub = await Subject.findById(id);
            if (sub) {
              await sub.student.push(result.id);
              await sub.save();
            }
          })
        );
      } else if (subject && subject.length) {
        console.log("here");
        result = await Student.findByIdAndUpdate(
          id,
          {
            $set: { subject: subject },
          },
          { new: true }
        );
        await Promise.all(
          subject.map(async id => {
            const sub = await Subject.findById(id);
            if (sub) {
              await sub.student.push(result.id);
              await sub.save();
            }
          })
        );
      } else {
        console.log("hi");
        result = await Student.findByIdAndUpdate(
          id,
          {
            ...input,
          },
          { new: true }
        );
      }

      console.log(result);
      return result;
    },
    deleteStudent: async (_, { id }) => {
      const student = await Student.findByIdAndDelete(id);
      if (student) {
        student.subject.map(async sub => {
          await Subject.updateOne(
            { id: sub._id },
            { $pull: { student: student.id } }
          );
        });
        return student;
      }
    },
  },
  Student: {
    subject: async ({ id }) => {
      try {
        console.log(id);
        const subs = await Subject.find({ student: id });

        return subs;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
