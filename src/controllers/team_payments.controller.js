import {pool} from '../database.js'

export const getTeamPayments = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Payment;')
        var fullResults = []
        for (var i = 0; i < result.length; i++) {
            const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [result[i].team_id])
            const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [result[i].payment_id])
            const fullResult = {
                id: result[i].id,
                teamName: teamRows[0].name,
                paymentComment: paymentRows[0].comment,
                paymentAmount: paymentRows[0].amount,
                paymentDate: paymentRows[0].date
            }
            fullResults.push(fullResult)
        }
        res.json(fullResults)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getTeamPayment = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Payment WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "TeamPayment with " + req.params.id + " not found"})
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [result[0].team_id])
        const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [result[0].payment_id])
        res.json({
            id: result[0].id,
            teamName: teamRows[0].name,
            paymentComment: paymentRows[0].comment,
            paymentAmount: paymentRows[0].amount,
            paymentDate: paymentRows[0].date
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createTeamPayment = async (req, res) => {
    try {
        const {teamId, paymentId} = req.body
        const [rows] = await pool.query('INSERT INTO Team_Payment (team_id, payment_id)' +
            ' VALUES (?, ?);', 
            [teamId, paymentId])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamId])
        const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [paymentId])
        res.send({
            id: rows.insertId,
            teamId: teamId,
            teamName: teamRows[0].name,
            paymentId: paymentId,
            paymentComment: paymentRows[0].comment
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateTeamPayment = async (req, res) => { 
    try {
        const {id} = req.params
        const {teamId, paymentId} = req.body
        const [result] = await pool.query('UPDATE Team_Payment SET team_id = IFNULL(?, team_id), payment_id = IFNULL(?, payment_id) WHERE id = ?;', 
            [teamId, paymentId, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Team Payment with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Team_Payment WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteTeamPayment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Team_Payment WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Team Payment with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}