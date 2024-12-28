import { Router } from 'express'
import { getMemberPayments, createMemberPayment, updateMemberPayment, deleteMemberPayment, getMemberPayment } from '../controllers/member_payments.controller.js'

const router = Router()

router.get('/memberPayments', getMemberPayments)
router.get('/memberPayments/:id', getMemberPayment)
router.post('/memberPayments', createMemberPayment)
router.patch('/memberPayments/:id', updateMemberPayment)
router.delete('/memberPayments/:id', deleteMemberPayment)

export default router