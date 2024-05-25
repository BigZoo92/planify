import { z } from 'zod';

/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','firstName','lastName','urls','createdAt','updatedAt','darkMode','language','pushToken']);

export const AgendaScalarFieldEnumSchema = z.enum(['id','type','name','private','createdAt','updatedAt']);

export const AgendaUserScalarFieldEnumSchema = z.enum(['agendaId','userId','role','active','createdAt','updatedAt']);

export const EventScalarFieldEnumSchema = z.enum(['id','summary','location','start','end','data','universityDataId','createdAt','updatedAt']);

export const UniversityEventDataScalarFieldEnumSchema = z.enum(['id','group','type','staff','note','course']);

export const EventAgendaScalarFieldEnumSchema = z.enum(['eventId','agendaId','createdAt','updatedAt']);

export const EventUserScalarFieldEnumSchema = z.enum(['eventId','userId','createdAt','updatedAt','agendaId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','content','senderId','receiverId','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);


export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);


export const AgendaTypeSchema = z.enum(['UNIVERSITAIRE','PERSONNEL']);

export type AgendaTypeType = `${z.infer<typeof AgendaTypeSchema>}`

export const UniversityEventTypeSchema = z.enum(['TD','TP','CM','REUNION','SOUTENANCE','AUTRE']);

export type UniversityEventTypeType = `${z.infer<typeof UniversityEventTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  urls: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  darkMode: z.boolean(),
  language: z.string().nullable(),
  pushToken: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// AGENDA SCHEMA
/////////////////////////////////////////

export const AgendaSchema = z.object({
  type: AgendaTypeSchema,
  id: z.number(),
  name: z.string(),
  private: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Agenda = z.infer<typeof AgendaSchema>

/////////////////////////////////////////
// AGENDA USER SCHEMA
/////////////////////////////////////////

export const AgendaUserSchema = z.object({
  agendaId: z.number(),
  userId: z.number(),
  role: z.string(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type AgendaUser = z.infer<typeof AgendaUserSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.number(),
  summary: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  data: z.any(),
  universityDataId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// UNIVERSITY EVENT DATA SCHEMA
/////////////////////////////////////////

export const UniversityEventDataSchema = z.object({
  type: UniversityEventTypeSchema,
  id: z.number(),
  group: z.string().array(),
  staff: z.string().array(),
  note: z.string(),
  course: z.string(),
})

export type UniversityEventData = z.infer<typeof UniversityEventDataSchema>

/////////////////////////////////////////
// EVENT AGENDA SCHEMA
/////////////////////////////////////////

export const EventAgendaSchema = z.object({
  eventId: z.number(),
  agendaId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type EventAgenda = z.infer<typeof EventAgendaSchema>

/////////////////////////////////////////
// EVENT USER SCHEMA
/////////////////////////////////////////

export const EventUserSchema = z.object({
  eventId: z.number(),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  agendaId: z.number().nullable(),
})

export type EventUser = z.infer<typeof EventUserSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.number(),
  content: z.string(),
  senderId: z.number(),
  receiverId: z.number(),
  createdAt: z.date(),
})

export type Message = z.infer<typeof MessageSchema>
