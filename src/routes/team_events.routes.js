import { Router } from 'express'
import { getTeamEvents, createTeamEvent, updateTeamEvent, deleteTeamEvent, getTeamEvent } from '../controllers/team_events.controller.js'

const router = Router()

router.get('/teamEvents', getTeamEvents)
router.get('/teamEvents/:id', getTeamEvent)
router.post('/teamEvents', createTeamEvent)
router.patch('/teamEvents/:id', updateTeamEvent)
router.delete('/teamEvents/:id', deleteTeamEvent)

export default router