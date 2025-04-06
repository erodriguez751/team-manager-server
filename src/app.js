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
import "./lib/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const path = require('path')
const passport = require('passport');
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const app = express()

const options = {
	host: 'localhost',
	port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'TEAM_MANAGER_DB'
};

const sessionStore = new MySQLStore(options);

app.set('views', path.join(__dirname, 'views'))

const exphbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  });

app.engine('.hbs', exphbs.engine)
app.set('view engine', '.hbs')

app.use(session({
    secret: "team-manager-session",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
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

// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app