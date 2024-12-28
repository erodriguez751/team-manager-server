import { Router } from 'express'
import { getTeamPayments, createTeamPayment, updateTeamPayment, deleteTeamPayment, getTeamPayment } from '../controllers/team_payments.controller.js'

const router = Router()

router.get('/teamPayments', getTeamPayments)
router.get('/teamPayments/:id', getTeamPayment)
router.post('/teamPayments', createTeamPayment)
router.patch('/teamPayments/:id', updateTeamPayment)
router.delete('/teamPayments/:id', deleteTeamPayment)

export default router