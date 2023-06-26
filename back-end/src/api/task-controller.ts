import express from 'express';
import mysql, {Pool} from "promise-mysql";
import dotenv from 'dotenv';

export const router = express.Router();
let pool:Pool;

dotenv.config();

initPool();

async function initPool() {
    pool = await mysql.createPool({
        host: process.env.host,
        port: +process.env.port!,
        database: process.env.database,
        user: process.env.username,
        password: process.env.password,
        connectionLimit: +process.env.connection_limit!
    });
}

type Task = {
    id: number,
    description: String,
    status: 'COMPLETED' | 'NOT_COMPLETED' | undefined
}

/* Get All Tasks */
router.get('/', async (req, res)=>{
    const tasks = await pool.query('SELECT * FROM Task');
    res.json(tasks);
});

/* Save a New Task */
router.post('/', async (req, res) => {
    const task = (req.body as Task);
    if (!task.description?.trim()) {
        res.sendStatus(400);
        return;
    }

    const result = await pool.query('INSERT INTO Task (description, status) VALUES (?,DEFAULT)',
        [task.description]);

    task.id = result.insertId;
    task.status = 'NOT_COMPLETED';

    res.status(201).json(task);
});