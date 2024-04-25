import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','firstName','lastName','createdAt','updatedAt']);

export const AgendaScalarFieldEnumSchema = z.enum(['id','type','createdAt','updatedAt']);

export const AgendaUserScalarFieldEnumSchema = z.enum(['agendaId','userId','role','createdAt','updatedAt']);

export const EventScalarFieldEnumSchema = z.enum(['id','agendaId','summary','location','start','end','data','createdAt','updatedAt']);

export const MessageScalarFieldEnumSchema = z.enum(['id','content','senderId','receiverId','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);
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
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// AGENDA SCHEMA
/////////////////////////////////////////

export const AgendaSchema = z.object({
  id: z.number(),
  type: z.string(),
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
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type AgendaUser = z.infer<typeof AgendaUserSchema>

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
  data: JsonValueSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Event = z.infer<typeof EventSchema>

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
