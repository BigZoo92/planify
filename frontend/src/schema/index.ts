import { z } from 'zod';

/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'password',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
]);

export const AgendaScalarFieldEnumSchema = z.enum([
  'id',
  'type',
  'createdAt',
  'updatedAt',
]);

export const AgendaUserScalarFieldEnumSchema = z.enum([
  'agendaId',
  'userId',
  'role',
  'createdAt',
  'updatedAt',
]);

export const EventScalarFieldEnumSchema = z.enum([
  'id',
  'agendaId',
  'summary',
  'location',
  'start',
  'end',
  'data',
  'createdAt',
  'updatedAt',
]);

export const MessageScalarFieldEnumSchema = z.enum([
  'id',
  'content',
  'senderId',
  'receiverId',
  'createdAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

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
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// AGENDA SCHEMA
/////////////////////////////////////////

export const AgendaSchema = z.object({
  id: z.number(),
  type: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Agenda = z.infer<typeof AgendaSchema>;

/////////////////////////////////////////
// AGENDA USER SCHEMA
/////////////////////////////////////////

export const AgendaUserSchema = z.object({
  agendaId: z.number(),
  userId: z.number(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AgendaUser = z.infer<typeof AgendaUserSchema>;

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.number(),
  agendaId: z.number(),
  summary: z.string(),
  location: z.string(),
  start: z.date(),
  end: z.date(),
  data: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Event = z.infer<typeof EventSchema>;

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.number(),
  content: z.string(),
  senderId: z.number(),
  receiverId: z.number(),
  createdAt: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;
