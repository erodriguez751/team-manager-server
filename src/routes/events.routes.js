import { Router } from 'express'
import { getEvents, createEvent, updateEvent, deleteEvent, getEvent } from '../controllers/events.controller.js'

const router = Router()

router.get('/events', getEvents)
router.get('/events/:id', getEvent)
router.post('/events', createEvent)
router.patch('/events/:id', updateEvent)
router.delete('/events/:id', deleteEvent)

export default router