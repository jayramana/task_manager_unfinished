const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    reqired: [true, "name is required field"],
    trim: true,
    maxLength: [100, "Task Name must not exceed 100 characters"],
    minLength: [1],
  },
  completed: { type: Boolean, default: false },
  status: {
    type: String, trim: true, default: "pending", enum: {
      values: ["completed", "pending", "abandoned"],
      message: "{VALUE} is not supported. The only supported values are Completed Pending and Cancelled"
    }
  },
  priority: {
    type: String, trim: true, default:"low", enum: {
      values: ["high", "low"],
      message:"{VALUE} is not supported. The only supported values are High and Low"
  } }
  
});

module.exports = mongoose.model("Task", TaskSchema);
