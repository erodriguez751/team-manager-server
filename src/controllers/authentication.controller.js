import {pool} from '../db.js'

export const login = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Event;')
        res.json(result)
    } catch (error) {
        return res.sendStatus(500).json({message: "Something went wrong"})
    }
}
