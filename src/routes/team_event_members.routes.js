import { Router } from 'express'
import { getTeamEventMembers, createTeamEventMember, updateTeamEventMember, deleteTeamEventMember, getTeamEventMember } from '../controllers/team_event_members.controller.js'

const router = Router()

router.get('/teamEventMembers', getTeamEventMembers)
router.get('/teamEventMembers/:id', getTeamEventMember)
router.post('/teamEventMembers', createTeamEventMember)
router.patch('/teamEventMembers/:id', updateTeamEventMember)
router.delete('/teamEventMembers/:id', deleteTeamEventMember)

export default router