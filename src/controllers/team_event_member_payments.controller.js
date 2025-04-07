import {pool} from '../database.js'

export const getTeamEventMemberPayments = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Event_Member_Payment;')
        console.log(result)
        if (result.length > 0) {
            var fullResults = []
            for (var i = 0; i < result.length; i++) {
                const [teamEventRows] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [result[i].team_event_id])
                const [memberPaymentRows] = await pool.query('SELECT * FROM Member_Payment WHERE id = ?;', [result[i].member_payment_id])
                const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamEventRows[i].team_id])
                const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [teamEventRows[i].event_id])
                const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [memberPaymentRows[i].member_id])
                const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [memberPaymentRows[i].payment_id])
                const fullResult = {
                    id: result[i].id,
                    teamName: teamRows[0].name,
                    eventName: eventRows[0].name,
                    memberName: memberRows[0].name,
                    paymentComment: paymentRows[0].comment,
                    paymentAmount: paymentRows[0].amount,
                    paymentDate: paymentRows[0].date
                }
                fullResults.push(fullResult)
            }
            res.json(fullResults)
        } else {
            res.json(result)
        }
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getTeamEventMemberPayment = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Team_Event_Member_Payment WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Team Event Member with " + req.params.id + " not found"})
        const [teamEventRows] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [result[0].team_event_id])
        const [memberPaymentRows] = await pool.query('SELECT * FROM Member_Payment WHERE id = ?;', [result[0].member_payment_id])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamEventRows[0].team_id])
        const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [teamEventRows[0].event_id])
        const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [memberPaymentRows[0].member_id])
        const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [memberPaymentRows[0].payment_id])
        res.json({
            id: result[0].id,
            teamName: teamRows[0].name,
            eventName: eventRows[0].name,
            memberName: memberRows[0].name,
            paymentComment: paymentRows[0].comment,
            paymentAmount: paymentRows[0].amount,
            paymentDate: paymentRows[0].date
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createTeamEventMemberPayment = async (req, res) => {
    try {
        const {teamEventId, memberPaymentId} = req.body
        const [rows] = await pool.query('INSERT INTO Team_Event_Member_Payment (team_event_id, member_payment_id)' +
            ' VALUES (?, ?);', 
            [teamEventId, memberPaymentId])
        const [teamEventRows] = await pool.query('SELECT * FROM Team_Event WHERE id = ?;', [teamEventId])
        const [teamRows] = await pool.query('SELECT * FROM Team WHERE id = ?;', [teamEventRows[0].team_id])
        const [eventRows] = await pool.query('SELECT * FROM Event WHERE id = ?;', [teamEventRows[0].event_id])
        const [memberPaymentRows] = await pool.query('SELECT * FROM Member_Payment WHERE id = ?;', [memberPaymentId])
        const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [memberPaymentRows[0].member_id])
        const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [memberPaymentRows[0].payment_id])
        res.send({
            id: rows.insertId,
            teamName: teamRows[0].name,
            eventName: eventRows[0].name,
            memberName: memberRows[0].name,
            paymentComment: paymentRows[0].comment
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateTeamEventMemberPayment = async (req, res) => { 
    try {
        const {id} = req.params
        const {teamEventId, memberPaymentId} = req.body
        const [result] = await pool.query('UPDATE Team_Event_Member_Payment SET ' +
            'team_event_id = IFNULL(?, team_event_id), member_payment_id = IFNULL(?, member_payment_id) WHERE id = ?;', 
            [teamEventId, memberPaymentId, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Team Event Member with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Team_Event_Member_Payment WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteTeamEventMemberPayment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Team_Event_Member_Payment WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Team Event Member with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}