import {pool} from '../db.js'

export const getTeamMembers = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Member;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getTeamMember = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Member WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "TeamMember with " + req.params.id + " not found"})
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createTeamMember = async (req, res) => {
    try {
        const {isAdmin, memberType, teamId, memberId} = req.body
        const [rows] = await pool.query('INSERT INTO Team_Member (is_admin, member_type, team_id, member_id)' +
            ' VALUES (?, ?, ?, ?);', 
            [isAdmin, memberType, teamId, memberId])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamId])
        const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [memberId])
        console.log(teamRows)
        console.log(memberRows)
        res.send({
            id: rows.insertId,
            isAdmin: isAdmin,
            memberType: memberType,
            teamId: teamId,
            teamName: teamRows[0].name,
            memberId: memberId,
            memberName: memberRows[0].name
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateTeamMember = async (req, res) => { 
    try {
        const {id} = req.params
        const {isAdmin, memberType, teamId, memberId} = req.body
        const [result] = await pool.query('UPDATE Team_Member SET is_admin = IFNULL(?, is_admin),' +
            'member_type = IFNULL(?, member_type), team_id = IFNULL(?, team_id), member_id = IFNULL(?, member_id) WHERE id = ?;', 
            [isAdmin, memberType, teamId, memberId, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Team Member with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Team_Member WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteTeamMember = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Team_Member WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Team Member with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}