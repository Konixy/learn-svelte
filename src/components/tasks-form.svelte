<script lang="ts">
	let newTask = $state('');
	let { addTask }: { addTask: (newTask: string) => void } = $props();

	function formSubmitted(e: SubmitEvent) {
		e.preventDefault();
		addTask(newTask);
		newTask = '';
	}
</script>

<form onsubmit={formSubmitted} class="flex flex-col">
	<label for="newTask" class="p-1 text-sm text-slate-300">New Task</label>
	<div class="flex w-full flex-row gap-2">
		<input
			type="text"
			id="newTask"
			placeholder="Learn Svelte 5"
			bind:value={newTask}
			required
			class="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 outline-none"
		/>
		<button class="rounded-lg bg-blue-600 px-4 py-2 outline-none">Add</button>
	</div>
</form>
