import {pool} from '../db.js'

export const getPayments = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Payment;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getPayment = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Payment with " + req.params.id + " not found"})
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createPayment = async (req, res) => {
    try {
        const {comment, date, amount} = req.body
        const [rows] = await pool.query('INSERT INTO Payment (comment, date, amount) VALUES (?, ?, ?);', 
            [comment, date])
        res.send({
            id: rows.insertId,
            comment: comment,
            date: date,
            amount, amount
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updatePayment = async (req, res) => { 
    try {
        const {id} = req.params
        const {comment, date, amount} = req.body
        const [result] = await pool.query('UPDATE Payment SET comment = IFNULL(?, comment),' +
            'date = IFNULL(?, date), amount = IFNULL(?, amount) WHERE id = ?;', 
            [comment, date, amount, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Payment with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Payment WHERE id = ?;', [id])
        res.send({rows})
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deletePayment = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Payment WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Payment with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}