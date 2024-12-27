import {pool} from '../db.js'

export const getEvents = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Event;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getEvent = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Event WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Event with " + req.params.id + " not found"})
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createEvent = async (req, res) => {
    try {
        const {name, dateScheduled, dateCreated, cost, type} = req.body
        const [rows] = await pool.query('INSERT INTO Event (name, date_scheduled, date_created, cost, type)' + 
            ' VALUES (?, ?, ?, ?, ?);', 
            [name, dateScheduled, dateCreated, cost, type])
        res.send({
            id: rows.insertId,
            name: name,
            dateScheduled: dateScheduled,
            dateCreated: dateCreated,
            cost: cost,
            type: type
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateEvent = async (req, res) => { 
    try {
        const {id} = req.params
        const {name, dateScheduled, dateCreated, cost, type} = req.body
        const [result] = await pool.query('UPDATE Event SET name = IFNULL(?, name),' +
            'date_scheduled = IFNULL(?, date_scheduled), date_created = IFNULL(?, date_created), ' +
            'cost = IFNULL(?, cost), type = IFNULL(?, type) WHERE id = ?;', 
            [name, dateScheduled, dateCreated, cost, type, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Event with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteEvent = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Event WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Event with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}