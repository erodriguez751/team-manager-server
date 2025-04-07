import {pool} from '../database.js'

export const getTeams = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getTeam = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Team with " + req.params.id + " not found"})
        res.json(result[0])
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createTeam = async (req, res) => {
    try {
        const {name, shortName} = req.body
        const [rows] = await pool.query('INSERT INTO Team (name, short_name) VALUES (?, ?);', 
            [name, shortName])
        res.send({
            id: rows.insertId,
            name: name,
            shortName: shortName
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateTeam = async (req, res) => { 
    try {
        const {id} = req.params
        const {name, shortName} = req.body
        const [result] = await pool.query('UPDATE Team SET name = IFNULL(?, name),' +
            'short_name = IFNULL(?, short_name) WHERE id = ?;', 
            [name,shortName, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Team with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteTeam = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Team WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Team with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}