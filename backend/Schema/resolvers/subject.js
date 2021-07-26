const Student = require("../../models/Student.model");
const Subject = require("../../models/Subject.model");

module.exports = {
  Query: {
    getSubjects: async () => {
      return await Subject.find();
    },
  },
  Mutation: {
    createSubject: async (_, { input }, context, info) => {
      console.log("hi");
      console.log(input);
      const newSubject = new Subject(input);
      try {
        const subject = await newSubject.save();
        if (subject) {
          return subject;
        }
      } catch (error) {
        console.log(error);
        throw new Error("subject not created");
      }
    },
    updateSubject: async (_, { id, input }) => {
      console.log("HIHihfdih    ");
      let result = null;
      console.log(input);
      result = await Subject.findByIdAndUpdate(id, {
        name: input.name,
      });
      if (result) {
        return result;
      }
    },

    deleteSubject: async (_, { id }) => {
      const subject = await Subject.findByIdAndDelete(id);
      if (subject) {
        subject.student.map(async sub => {
          await Subject.updateOne(
            { id: sub._id },
            { $pull: { subject: subject.id } }
          );
        });
        return subject;
      }
    },
  },
  Subject: {
    student: async ({ id }) => {
      try {
        console.log(id);
        const subs = await Student.find({ subject: id });

        return subs;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
