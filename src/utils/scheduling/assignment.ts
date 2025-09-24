import { PriorityQueue } from '../algorithms/priority-queue';

export interface SchedulerUser {
  id: string;
  skills: string[];
  availability: number; // hours/week
}

export interface SchedulerTask {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  skillsRequired: string[];
  estimateHours: number;
}

function priorityScore(p: SchedulerTask['priority']): number {
  switch (p) {
    case 'urgent': return 0;
    case 'high': return 1;
    case 'medium': return 2;
    default: return 3;
  }
}

function hasSkills(user: SchedulerUser, task: SchedulerTask) {
  return task.skillsRequired.every((s) => user.skills.includes(s));
}

export function assignTasks(users: SchedulerUser[], tasks: SchedulerTask[]) {
  const pq = new PriorityQueue<SchedulerTask>((a, b) => priorityScore(a.priority) - priorityScore(b.priority));
  tasks.forEach((t) => pq.push(t));

  const assignments: Record<string, string | null> = {};

  while (!pq.isEmpty()) {
    const task = pq.pop()!;
    const candidate = users
      .filter((u) => hasSkills(u, task) && u.availability >= task.estimateHours)
      .sort((a, b) => b.availability - a.availability)[0];
    if (candidate) {
      assignments[task.id] = candidate.id;
      candidate.availability -= task.estimateHours;
    } else {
      assignments[task.id] = null; // could not assign
    }
  }
  return assignments;
}

