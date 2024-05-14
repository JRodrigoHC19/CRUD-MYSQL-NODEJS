const connection = require('./client');


const createTable = async () => {
    const [query] = await connection
        .execute("CREATE TABLE IF NOT EXISTS tareas (\
            id_tarea INT PRIMARY KEY AUTO_INCREMENT,\
            nombre_tarea VARCHAR(255) NOT NULL,\
            encargado_tarea VARCHAR(255) NOT NULL,\
            fecha_entrega_tarea DATE NOT NULL,\
            estado_tarea ENUM('Pendiente', 'En curso', 'Completada') NOT NULL DEFAULT 'Pendiente'\
        );");
    return query;
};

const dropTable = async () => {
    const [query] = await connection
        .execute("DROP TABLE tareas");
    return query;
};


const getAllTasks = async () => {
    const [query] = await connection
        .execute("SELECT * FROM tareas");
    return query;
}

const getOneTasks = async (id) => {
    const [query] = await connection
        .execute(`SELECT * FROM tareas WHERE id_tarea=?`, [id]);
    return query;
}

const addOneTask = async (tarea, encargado, fecha, estado) => {
    const [query] = await connection
        .execute(`INSERT INTO tareas (nombre_tarea, encargado_tarea, fecha_entrega_tarea, estado_tarea) VALUE (?,?,?,?);`, [tarea, encargado, fecha, estado]);
    return query;
}

const delOneTask = async (id) => {
    const item = await getOneTasks(id);
    if (item.length === 0) { return null; }

    const [query] = await connection
        .execute(`DELETE FROM tareas WHERE id_tarea=?`, [id]);
    return query;
}

const setOneTask = async (tarea, encargado, fecha, estado, id) => {
    const item = await getOneTasks(id);
    if (item.length === 0) { return null; }

    const [query] = await connection
        .execute(`UPDATE tareas SET nombre_tarea=?, encargado_tarea=?, fecha_entrega_tarea=?, estado_tarea=? WHERE id_tarea=?`, [tarea, encargado, fecha, estado, id]);
    return query;
}

module.exports = {
    createTable,
    dropTable,
    getAllTasks,
    addOneTask,
    setOneTask,
    delOneTask,
    getOneTasks
};