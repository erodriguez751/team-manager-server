import {pool} from '../database.js'

export const getTeamEvents = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Event;')
        var fullResults = []
        for (var i = 0; i < result.length; i++) {
            const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [result[i].team_id])
            const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [result[i].event_id])
            const fullResult = {
                id: result[i].id,
                status: result[i].status,
                teamName: teamRows[0].name,
                eventName: eventRows[0].name,
                eventType: eventRows[0].type,
                eventDate: eventRows[0].date_scheduled
            }
            fullResults.push(fullResult)
        }
        res.json(fullResults)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getTeamEvent = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Team Event with " + req.params.id + " not found"})
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [result[0].team_id])
        const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [result[0].event_id])
        res.json({
            id: result[0].id,
            status: result[0].status,
            teamName: teamRows[0].name,
            eventName: eventRows[0].name,
            eventType: eventRows[0].type,
            eventDate: eventRows[0].date_scheduled
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createTeamEvent = async (req, res) => {
    try {
        const {status, teamId, eventId} = req.body
        const [rows] = await pool.query('INSERT INTO Team_Event (status, team_id, event_id)' +
            ' VALUES (?, ?, ?);', 
            [status, teamId, eventId])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamId])
        const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [eventId])
        res.send({
            id: rows.insertId,
            status: status,
            teamId: teamId,
            teamName: teamRows[0].name,
            eventId: eventId,
            eventName: eventRows[0].name
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateTeamEvent = async (req, res) => { 
    try {
        const {id} = req.params
        const {status, teamId, eventId} = req.body
        const [result] = await pool.query('UPDATE Team_Event SET status = IFNULL(?, status),' +
            'team_id = IFNULL(?, team_id), event_id = IFNULL(?, event_id) WHERE id = ?;', 
            [status, teamId, eventId, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Team Event with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteTeamEvent = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Team_Event WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Team Event with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}