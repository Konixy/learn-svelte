export type Task = {
	id: number;
	title: string;
	done: boolean;
};

export type Filter = 'all' | 'todo' | 'done';
