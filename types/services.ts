import { EmailVerification, User } from './entities';

export type EmailVerificationSend = (user: User) => Promise<EmailVerification>;

export type EmailVerificationCreate = (userId: string) => Promise<EmailVerification>;

export type NodemailerSend = (user: User, hash: string) => Promise<unknown>;
