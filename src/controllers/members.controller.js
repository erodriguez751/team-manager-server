import {pool} from '../db.js'

export const getMembers = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Member;')
        //res.json(result)
        res.render('members/list', { members: result })
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
        req.flash('success', 'Usuario guardado satisfactoriamente')
        res.redirect('/members')
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}

export const updateMemberRender = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM Member WHERE id = ?;', [req.params.id])
    res.render('members/update', {member: result[0]})
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
        res.redirect('/members')
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
export const deleteMember = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Member WHERE id = ?;', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({message: "Member with " + req.params.id + " not found"})
        const [getResult] = await pool.query('SELECT * FROM Member;')
        res.redirect('/members')
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}