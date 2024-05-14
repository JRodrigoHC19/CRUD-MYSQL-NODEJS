const { Router } = require('express');
const querys = require('../database/querys');

const router = Router();

//! WELCOME
router.get("/", async (req, res) => {
    const query = await querys.getAllTasks();
    res.render('index.pug', {
        tasks: query
    });
});

//! ~ TASK ~ READ
router.get("/tasks", async (req, res) => {
    const query = await querys.getAllTasks();
    return res.status(200).json(query);
});


//! ~ TASK ~ SEARCH
router.get("/tasks/search/:id", async (req, res) => {
    const query = await querys.getOneTasks(req.params.id);

    let x = new Date(query[0].fecha_entrega_tarea);
    let year = x.getFullYear();
    let month = x.getMonth()+1;
    let day = x.getDate();
    month = month < 10 ? `0${month}` : month;
    day =  day < 10 ? `0${day}` : day;

    res.render('task.pug', {
        tasks: query,
        date: `${year}-${month}-${day}`,
    });
});

//! ~ TASK ~ CREATE
router.post("/tasks/add", async (req, res) => {
    const {task, encargado, fecha, estado} = req.body;
    await querys.addOneTask(task, encargado, fecha, estado);
    return res.redirect("/");
});

//! ~ TASK ~ DELETE
router.get("/tasks/del/:id", async (req, res) => {
    await querys.delOneTask(req.params.id);
    return res.redirect("/");
});

//! ~ TASK ~ UPDATE
router.post("/tasks/set/:id", async (req, res) => {
    const {task, encargado, fecha, estado} = req.body;
    await querys.setOneTask(task, encargado, fecha, estado,req.params.id);
    return res.redirect("/");
});


//! ~ TABLE
router.get("/table/create", async (req, res) => {
    const query = await querys.createTable();
    return res.status(200).json(query);
});

//! ~ TABLE
router.get("/table/drop", async (req, res) => {
    const query = await querys.dropTable();

    return res.status(200).json(query);
});

module.exports = router;