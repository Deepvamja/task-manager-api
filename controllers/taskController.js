
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      assignedTo,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const filter = {
      createdBy: req.user.id
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: {
        page: Number(page),
        total,
        tasks
      }
    });



  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    const { title, description, status } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
