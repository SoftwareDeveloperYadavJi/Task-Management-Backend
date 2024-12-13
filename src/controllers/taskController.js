
const Task = require('../models/Task.modle');

exports.createTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { priority, status } = req.query;
        const query = { user: req.user.id };
        if (priority) query.priority = priority;
        if (status) query.status = status;
        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.body.status === 'finished') {
            req.body.endTime = new Date();
        }

        Object.assign(task, req.body);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'finished').length;
        const pendingTasks = tasks.filter(task => task.status === 'pending').length;

        const timeStats = tasks.reduce(
            (acc, task) => {
                if (task.status === 'finished') {
                    const timeTaken = (new Date(task.endTime) - new Date(task.startTime)) / (1000 * 60 * 60);
                    acc.actualTime += timeTaken;
                } else {
                    const timeLapsed = (new Date() - new Date(task.startTime)) / (1000 * 60 * 60);
                    const timeLeft = Math.max(0, (new Date(task.endTime) - new Date()) / (1000 * 60 * 60));
                    acc.timeLapsed += timeLapsed;
                    acc.estimatedTimeLeft += timeLeft;
                }
                return acc;
            },
            { actualTime: 0, timeLapsed: 0, estimatedTimeLeft: 0 }
        );

        const averageCompletionTime = totalTasks
            ? timeStats.actualTime / completedTasks
            : 0;

        res.status(200).json({
            totalTasks,
            completedPercentage: (completedTasks / totalTasks) * 100,
            pendingPercentage: (pendingTasks / totalTasks) * 100,
            timeLapsed: timeStats.timeLapsed,
            estimatedTimeLeft: timeStats.estimatedTimeLeft,
            averageCompletionTime,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};