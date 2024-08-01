const router = require('express').Router();
const { Types } = require('mongoose')

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

router.post('/projects', (req, res, next) => {
    const { title, description } = req.body;

    Project.create({ title, description, tasks: [] })
        .then((response) => res.json(response))
        .catch((err) => {
            console.log("Error while creating the project", err);
            res.status(500).json({ message: "An error occurred while creating the project" })
        })
})

router.get("/projects", (req, res, next) => {
    Project.find()
        .populate("tasks")
        .then((allProjects) => res.json(allProjects))
        .catch((err) => {
            console.log("Error while fetching projects", err);
            res.status(500).json({ message: "An error occurred while fetching projects" })
        })
})

router.get("/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;

    if (!Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Project.findById(projectId)
        .populate('tasks')
        .then((project) => res.status(200).json(project))
        .catch((err) => {
            console.log("Error while retrieving the project", err);
            res.status(500).json({ message: "Error while retrieving the project" });
        });
})

router.put("/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;

    if (!Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Project.findByIdAndUpdate(projectId, req.body, { new: true })
        .then((updatedProject) => res.json(updatedProject))
        .catch((err) => {
            console.log("Error while updating project", err);
            res.status(500).json({ message: "An error occurred while updating project" })
        })
})

router.delete("/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;

    if (!Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Project.findByIdAndDelete(projectId)
        .then((deletedProject) => res.json(deletedProject))
        .catch((err) => {
            console.log("Error while deleting project", err);
            res.status(500).json({ message: "An error occurred while deleting project" })
        })
})

module.exports = router;