import { Router } from 'express'
import { getMembers, createMemberRender, createMember, updateMember, deleteMember, getMember } from '../controllers/members.controller.js'

const router = Router()

router.get('/members', getMembers)
router.get('/members/:id', getMember)
router.get('/createMember', createMemberRender)
router.post('/members', createMember)
router.patch('/members/:id', updateMember)
router.delete('/members/:id', deleteMember)

export default router