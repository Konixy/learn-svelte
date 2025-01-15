<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Task, Filter } from '../lib/types';

	let {
		tasks,
		toggleDone,
		removeTask,
		currentFilter,
		setCurrentFilter
	}: {
		tasks: Task[];
		toggleDone: (task: Task) => void;
		removeTask: (id: number) => void;
		currentFilter: Filter;
		setCurrentFilter: (filter: Filter) => void;
	} = $props();
</script>

<section class="mt-10 flex flex-col gap-2">
	<div class="flex flex-row justify-end gap-2">
		{@render filterButton('all')}
		{@render filterButton('todo')}
		{@render filterButton('done')}

		{#snippet filterButton(filter: Filter)}
			<button
				onclick={() => setCurrentFilter(filter)}
				class="rounded-lg bg-slate-600 px-4 py-2 text-sm capitalize {currentFilter === filter &&
					'bg-white text-black'}">{filter}</button
			>
		{/snippet}
	</div>
	<div class="flex flex-col-reverse gap-2">
		{#each tasks as task}
			<article
				class="flex flex-row items-center gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4"
				in:fly
			>
				<input
					type="checkbox"
					id={String(task.id)}
					checked={task.done}
					onchange={() => toggleDone(task)}
					class="h-4 w-4 rounded-lg border-slate-600 bg-slate-700 text-blue-600 ring-offset-slate-800 focus:ring-2 focus:ring-blue-600"
				/>
				<label
					for={String(task.id)}
					class="w-full cursor-pointer font-semibold {task.done && 'text-slate-300 line-through'}"
				>
					{task.title}
				</label>
				<button
					onclick={() => removeTask(task.id)}
					class="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-600 hover:text-white"
					>Remove</button
				>
			</article>
		{/each}
	</div>
</section>
