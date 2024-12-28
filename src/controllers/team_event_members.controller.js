import {pool} from '../db.js'

export const getTeamEventMembers = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Event_Member;')
        const [teamEventRows] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [result[0].team_event_id])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamEventRows[0].team_id])
        const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [teamEventRows[0].event_id])
        const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [result[0].member_id])
        res.json({
            id: result[0].id,
            status: result[0].status,
            teamName: teamRows[0].name,
            eventName: eventRows[0].name,
            memberName: memberRows[0].name
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getTeamEventMember = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Event_Member WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Team Event Member with " + req.params.id + " not found"})
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createTeamEventMember = async (req, res) => {
    try {
        const {status, teamEventId, memberId} = req.body
        const [rows] = await pool.query('INSERT INTO Team_Event_Member (status, team_event_id, member_id)' +
            ' VALUES (?, ?, ?);', 
            [status, teamEventId, memberId])
        const [teamEventRows] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [teamEventId])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamEventRows[0].team_id])
        const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [teamEventRows[0].event_id])
        const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [memberId])
        res.send({
            id: rows.insertId,
            status: status,
            teamName: teamRows[0].name,
            eventName: eventRows[0].name,
            memberName: memberRows[0].name
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateTeamEventMember = async (req, res) => { 
    try {
        const {id} = req.params
        const {status, teamEventId, memberId} = req.body
        const [result] = await pool.query('UPDATE Team_Event_Member SET status = IFNULL(?, status),' +
            'team_event_id = IFNULL(?, team_event_id), member_id = IFNULL(?, member_id) WHERE id = ?;', 
            [status, teamEventId, memberId, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Team Event Member with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Team_Event_Member WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteTeamEventMember = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Team_Event_Member WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Team Event Member with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}