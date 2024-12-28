import {pool} from '../db.js'

export const getMemberPayments = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Member_Payment;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getMemberPayment = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Member_Payment WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "MemberPayment with " + req.params.id + " not found"})
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createMemberPayment = async (req, res) => {
    try {
        const {memberId, paymentId} = req.body
        const [rows] = await pool.query('INSERT INTO Member_Payment (member_id, payment_id)' +
            ' VALUES (?, ?);', 
            [memberId, paymentId])
        const [memberRows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [memberId])
        const [paymentRows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [paymentId])
        res.send({
            id: rows.insertId,
            memberId: memberId,
            teamName: memberRows[0].name,
            paymentId: paymentId,
            paymentComment: paymentRows[0].comment
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateMemberPayment = async (req, res) => { 
    try {
        const {id} = req.params
        const {memberId, paymentId} = req.body
        const [result] = await pool.query('UPDATE Member_Payment SET member_id = IFNULL(?, member_id), payment_id = IFNULL(?, payment_id) WHERE id = ?;', 
            [memberId, paymentId, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Member Payment with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Member_Payment WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteMemberPayment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Member_Payment WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Member Payment with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}