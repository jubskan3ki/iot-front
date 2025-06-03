<template>
	<div class="notif-list" :class="positionClass">
		<transition-group name="notif-transition">
			<NotifItem v-for="notif in notifs" :key="notif.id" :notif="notif" @close="removeNotif" />
		</transition-group>
	</div>
</template>

<script setup lang="ts">
	import { useNotifStore } from '@/stores/notifications';
	import { computed } from 'vue';
	import NotifItem from './NotifItem.vue';

	const props = withDefaults(
		defineProps<{
			position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
		}>(),
		{
			position: 'top-right',
		}
	);

	const notifStore = useNotifStore();

	const notifs = computed(() => notifStore.notifs);

	const positionClass = computed(() => {
		return `notif-list--${props.position}`;
	});

	function removeNotif(id: string) {
		notifStore.remove(id);
	}
</script>

<style lang="scss" scoped>
	@use '@/styles/abstracts/variables' as vars;
	@use '@/styles/abstracts/mixins' as mix;
	@use '@/styles/abstracts/functions' as func;

	.notif-list {
		position: fixed;
		z-index: func.z('dropdown') + 100;
		padding: vars.$spacing-md;
		display: flex;
		flex-direction: column;
		pointer-events: none;
		max-width: 100%;

		> * {
			pointer-events: auto;
		}

		// Positions
		&--top-right {
			top: 0;
			right: 0;
		}

		&--top-left {
			top: 0;
			left: 0;
		}

		&--bottom-right {
			bottom: 0;
			right: 0;
		}

		&--bottom-left {
			bottom: 0;
			left: 0;
		}

		&--top-center {
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		&--bottom-center {
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	// Animations pour les transitions
	.notif-transition-enter-active {
		transition: all 0.3s ease-out;
	}

	.notif-transition-leave-active {
		transition: all 0.3s ease-in;
		position: absolute;
		width: 100%;
	}

	.notif-transition-enter-from {
		opacity: 0;
		transform: translateX(50px);
	}

	.notif-transition-leave-to {
		opacity: 0;
		transform: translateX(50px);
	}
</style>
