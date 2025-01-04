import express from 'express'
import { create } from 'express-handlebars'
import membersRoutes from './routes/members.routes.js'
import teamsRoutes from './routes/teams.routes.js'
import eventsRoutes from './routes/events.routes.js'
import paymentsRoutes from './routes/payments.routes.js'
import teamMembersRoutes from './routes/team_members.routes.js'
import teamEventsRoutes from './routes/team_events.routes.js'
import teamPaymentsRoutes from './routes/team_payments.routes.js'
import teamEventMembersRoutes from './routes/team_event_members.routes.js'
import memberPaymentsRoutes from './routes/member_payments.routes.js'
import teamEventMemberPaymentsRoutes from './routes/team_event_member_payments.routes.js'
import login from './routes/authentication.routes.js'
import { createRequire } from "module";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'views'))

const exphbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  });

app.engine('.hbs', exphbs.engine)
app.set('view engine', '.hbs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(membersRoutes)
app.use(teamsRoutes)
app.use(eventsRoutes)
app.use(paymentsRoutes)
app.use(teamMembersRoutes)
app.use(teamEventsRoutes)
app.use(teamPaymentsRoutes)
app.use(teamEventMembersRoutes)
app.use(memberPaymentsRoutes)
app.use(teamEventMemberPaymentsRoutes)
app.use(login) 

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app