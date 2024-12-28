import express from 'express'
import membersRoutes from './routes/members.routes.js'
import teamsRoutes from './routes/teams.routes.js'
import eventsRoutes from './routes/events.routes.js'
import paymentsRoutes from './routes/payments.routes.js'
import teamMembersRoutes from './routes/team_members.routes.js'
import teamEventsRoutes from './routes/team_events.routes.js'
import teamPaymentsRoutes from './routes/team_payments.routes.js'
import teamEventMembersRoutes from './routes/team_event_members.routes.js'

const app = express()

app.use(express.json())
app.use(membersRoutes)
app.use(teamsRoutes)
app.use(eventsRoutes)
app.use(paymentsRoutes)
app.use(teamMembersRoutes)
app.use(teamEventsRoutes)
app.use(teamPaymentsRoutes)
app.use(teamEventMembersRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app