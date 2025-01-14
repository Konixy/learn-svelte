<script lang="ts">
	let { name }: { name?: string } = $props();
</script>

<div class="font-bold">{name || 'User'}'s form</div>
