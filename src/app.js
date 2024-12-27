import express from 'express'
import membersRoutes from './routes/members.routes.js'
import teamsRoutes from './routes/teams.routes.js'

const app = express()

app.use(express.json())
app.use(membersRoutes)
app.use(teamsRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app