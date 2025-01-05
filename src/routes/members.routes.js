import { Router } from 'express'
import { getMembers, createMemberRender, createMember, updateMember, updateMemberRender, deleteMember, getMember } from '../controllers/members.controller.js'

const router = Router()

router.get('/members', getMembers)
router.get('/members/:id', getMember)
router.get('/createMember', createMemberRender)
router.get('/updateMember/:id', updateMemberRender)
router.get('/deleteMember/:id', deleteMember)
router.post('/members', createMember)
router.patch('/members/:id', updateMember)
router.post('/members/updateMember/:id', updateMember)
router.delete('/members/:id', deleteMember)

export default router