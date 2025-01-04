import {pool} from '../db.js'

export const getMembers = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Member;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const getMember = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Member WHERE id = ?;', [req.params.id])
        if (result.length <= 0) return res.status(404).json({message: "Member with " + req.params.id + " not found"})
        res.json(result[0])
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const createMemberRender = (req, res) => {
    res.render('members/create')
}

export const createMember = async (req, res) => {
    try {
        const {name, nickName, email} = req.body
        const [rows] = await pool.query('INSERT INTO Member (name, nick_name, email) VALUES (?, ?, ?);', 
            [name, nickName, email])
        res.send({
            id: rows.insertId,
            name: name,
            nickName: nickName,
            email: email
        })
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const updateMember = async (req, res) => { 
    try {
        const {id} = req.params
        const {name, nickName, email} = req.body
        const [result] = await pool.query('UPDATE Member SET name = IFNULL(?, name),' +
            'nick_name = IFNULL(?, nick_name), email = IFNULL(?, email) WHERE id = ?;', 
            [name, nickName, email, id])
        if (result.affectedRows === 0) return res.status(404).json({message: "Member with " + id + " not found"})
        const [rows] = await pool.query('SELECT * FROM Member WHERE id = ?;', [id])
        res.send(rows[0])
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteMember = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Member WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Member with " + req.params.id + " not found"})
        res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}