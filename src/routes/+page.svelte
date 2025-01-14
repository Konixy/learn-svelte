<script lang="ts">
	import TasksForm from '../components/tasks-form.svelte';
	import TasksList from '../components/tasks-list.svelte';
	import type { Filter, Task } from '../lib/types';

	let id = 0;

	let tasks = $state<Task[]>([]);
	let totalDone = $derived(tasks.filter((e) => e.done).length);
	let currentFilter = $state<Filter>('all');
	let filteredTasks = $derived.by(() => {
		switch (currentFilter) {
			case 'all':
				return tasks;
			case 'todo':
				return tasks.filter((task) => !task.done);
			case 'done':
				return tasks.filter((task) => task.done);
		}
		return tasks;
	});

	function addTask(newTask: string) {
		tasks.push({
			id: id++,
			title: newTask,
			done: false
		});
	}

	function toggleDone(task: Task) {
		task.done = !task.done;
	}

	function removeTask(id: number) {
		const index = tasks.findIndex((task) => task.id === id);
		tasks.splice(index, 1);
	}
</script>

<main class="m-10">
	<div class="mb-10 flex items-center justify-center text-4xl font-semibold">Task App</div>
	<TasksForm {addTask} />
	<div class="mx-1 mt-2 text-sm text-slate-300">{totalDone} / {tasks.length} tasks completed</div>
	{#if tasks.length}
		<TasksList
			tasks={filteredTasks}
			{toggleDone}
			{removeTask}
			{currentFilter}
			setCurrentFilter={(f) => (currentFilter = f)}
		/>
	{:else}
		<div class="mt-4 flex justify-center">Add a task to get started</div>
	{/if}
</main>
