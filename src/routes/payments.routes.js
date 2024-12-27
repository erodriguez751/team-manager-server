import { Router } from 'express'
import { getPayments, createPayment, updatePayment, deletePayment, getPayment } from '../controllers/payments.controller.js'

const router = Router()

router.get('/payments', getPayments)
router.get('/payments/:id', getPayment)
router.post('/payments', createPayment)
router.patch('/payments/:id', updatePayment)
router.delete('/payments/:id', deletePayment)

export default router