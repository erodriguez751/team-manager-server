import { Router } from 'express'
import { getTeamEventMemberPayments, createTeamEventMemberPayment, updateTeamEventMemberPayment, deleteTeamEventMemberPayment, getTeamEventMemberPayment } from '../controllers/team_event_member_payments.controller.js'

const router = Router()

router.get('/teamEventMemberPayments', getTeamEventMemberPayments)
router.get('/teamEventMemberPayments/:id', getTeamEventMemberPayment)
router.post('/teamEventMemberPayments', createTeamEventMemberPayment)
router.patch('/teamEventMemberPayments/:id', updateTeamEventMemberPayment)
router.delete('/teamEventMemberPayments/:id', deleteTeamEventMemberPayment)

export default router