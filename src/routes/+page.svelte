<script lang="ts">
	import { isActionFailure } from '@sveltejs/kit';
	import Header from './Header.svelte';

	let formState = $state({
		answers: {
			name: '',
			birthday: '',
			color: ''
		},
		step: 0,
		error: ''
	});

	type Question = {
		question: string;
		id: keyof typeof formState.answers;
		type: 'text' | 'date' | 'color';
		isLast?: boolean;
	};

	const questions: Question[] = [
		{
			question: "What's your name?",
			id: 'name',
			type: 'text'
		},
		{
			question: 'When were you born?',
			id: 'birthday',
			type: 'date'
		},
		{
			question: "What's your favorite color?",
			id: 'color',
			type: 'color',
			isLast: true
		}
	];

	function nextStep(id: keyof typeof formState.answers) {
		if (formState.answers[id] !== '') {
			formState.step += 1;
			formState.error = '';
		} else {
			formState.error = 'Please fill out the form input';
		}
	}
</script>

<Header name={formState.answers.name} />

<main class="flex flex-col">
	{#if formState.step >= questions.length}
		<div>Thank you for choosing us!</div>
	{:else}
		<div>Step {formState.step + 1}</div>
	{/if}

	{#each questions as question, i (question.id)}
		{#if formState.step === i}
			{@render formStep(question)}
		{/if}
	{/each}

	{#if formState.error}
		<div class="text-red-500">{formState.error}</div>
	{/if}
</main>

{#snippet formStep({ question, id, type, isLast }: Question)}
	<article>
		<div>
			<label for={id}>{question}</label>
			<input {type} {id} bind:value={formState.answers[id]} />
		</div>
		<button onclick={() => nextStep(id)}>{isLast ? 'Finish' : 'Next'}</button>
	</article>
{/snippet}
