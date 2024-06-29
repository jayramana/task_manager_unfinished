const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const atask = await Task.find({});
    res.status(201).json({ atask });
  } catch (error) {
    res.status(500).json({ msg: "An Error has occured" });
  }
};
const getOneTasks = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "No Task exists" });
  }
};
const createTasks = async (req, res) => {
  try {
    const task = await Task.create(req.body);
   
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).send({ msg: "Please check the fields given by you properly " });
  }
};
const updateTasks = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).send("Task Not Found and Could not be updated");
    }
    res.status(200).json({ task });
  } catch (error) {}
};
const deleteTasks = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).send(`Task Not Found with id : ${taskId}`);
    }
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getTasks,
  getOneTasks,
  createTasks,
  updateTasks,
  deleteTasks,
};
