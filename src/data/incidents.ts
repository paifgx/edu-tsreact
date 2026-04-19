import rawIncidents from './incidents.json';
import rawUsers from './users.json';

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'open' | 'investigating' | 'resolved' | 'closed';
export type Team = 'backend' | 'frontend' | 'platform' | 'security';

export interface User {
  id: string;
  name: string;
  email: string;
  team: Team;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  assignee: User | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export const SEVERITIES: Severity[] = ['low', 'medium', 'high', 'critical'];
export const STATUSES: Status[] = ['open', 'investigating', 'resolved', 'closed'];
export const TEAMS: Team[] = ['backend', 'frontend', 'platform', 'security'];

export const USERS = rawUsers as User[];
export const users = USERS;
export const INCIDENTS = rawIncidents as Incident[];
export const incidents = INCIDENTS;

