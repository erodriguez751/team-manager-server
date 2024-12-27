import { Router } from 'express'
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, getTeamMember } from '../controllers/team_members.controller.js'

const router = Router()

router.get('/teamMembers', getTeamMembers)
router.get('/teamMembers/:id', getTeamMember)
router.post('/teamMembers', createTeamMember)
router.patch('/teamMembers/:id', updateTeamMember)
router.delete('/teamMembers/:id', deleteTeamMember)

export default router