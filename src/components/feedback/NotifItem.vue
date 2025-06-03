<!-- src/components/feedback/NotifItem.vue -->
<template>
	<div
		class="notif-item"
		:class="[`notif-item--${notif.type}`, { 'notif-item--closing': isClosing }]"
		role="notif"
		@mouseenter="pauseAutoClose"
		@mouseleave="resumeAutoClose"
	>
		<div class="notif-item__icon">
			<BaseIcon :name="iconName" />
		</div>

		<div class="notif-item__content">
			<h4 v-if="notif.title" class="notif-item__title">
				{{ notif.title }}
			</h4>
			<p class="notif-item__message">{{ notif.message }}</p>
		</div>

		<button v-if="notif.dismissible" class="notif-item__close" aria-label="Fermer" @click="close">
			<BaseIcon name="close" size="16" />
		</button>
	</div>
</template>

<script setup lang="ts">
	import BaseIcon from '@/components/base/BaseIcon.vue';
	import type { Notif } from '@/types/store/notifications';
	import { computed, onBeforeUnmount, ref } from 'vue';

	const props = defineProps<{
		notif: Notif;
	}>();

	const emit = defineEmits<{
		(e: 'close', id: string): void;
	}>();

	// Animation de fermeture
	const isClosing = ref(false);

	// Gestion de l'auto-fermeture
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;
	let remainingTime = props.notif.timeout || 5000;
	let startTime: number;

	// Icône en fonction du type d'notife
	const iconName = computed(() => {
		switch (props.notif.type) {
			case 'success':
				return 'success';
			case 'error':
				return 'error';
			case 'warning':
				return 'warning';
			case 'info':
				return 'info';
			default:
				return 'info';
		}
	});

	// Configuration de l'auto-fermeture si nécessaire
	function setupAutoClose() {
		if (props.notif.autoClose !== false) {
			startTime = Date.now();
			closeTimeout = setTimeout(() => {
				close();
			}, remainingTime);
		}
	}

	// Pause de l'auto-fermeture lorsque la souris est sur l'notife
	function pauseAutoClose() {
		if (closeTimeout && props.notif.autoClose !== false) {
			clearTimeout(closeTimeout);
			closeTimeout = null;

			// Calculer le temps restant
			const elapsedTime = Date.now() - startTime;
			remainingTime = Math.max(0, (props.notif.timeout || 5000) - elapsedTime);
		}
	}

	// Reprise de l'auto-fermeture lorsque la souris quitte l'notife
	function resumeAutoClose() {
		if (props.notif.autoClose !== false && !closeTimeout && remainingTime > 0) {
			startTime = Date.now();
			closeTimeout = setTimeout(() => {
				close();
			}, remainingTime);
		}
	}

	// Fermeture de l'notife
	function close() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}

		// Animation de fermeture
		isClosing.value = true;

		// Attendre la fin de l'animation avant d'émettre l'événement de fermeture
		setTimeout(() => {
			emit('close', props.notif.id);
		}, 300);
	}

	// Configuration de l'auto-fermeture au montage
	setupAutoClose();

	// Nettoyage avant la destruction
	onBeforeUnmount(() => {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
		}
	});
</script>

<style lang="scss" scoped>
	@use '@/styles/abstracts/variables' as vars;
	@use '@/styles/abstracts/mixins' as mix;
	@use '@/styles/abstracts/functions' as func;

	.notif-item {
		position: relative;
		display: flex;
		align-items: flex-start;
		padding: vars.$spacing-md;
		border-radius: vars.$border-radius-md;
		margin-bottom: vars.$spacing-sm;
		box-shadow: vars.$box-shadow;
		background-color: vars.$white;
		max-width: 400px;
		width: 100%;
		opacity: 1;
		transform: translateX(0);
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;

		&--closing {
			transform: translateX(100%);
			opacity: 0;
		}

		&__icon {
			flex-shrink: 0;
			margin-right: vars.$spacing-sm;
			color: vars.$white;
			border-radius: vars.$border-radius-full;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__content {
			flex: 1;
			min-width: 0;
		}

		&__title {
			font-weight: 600;
			margin-bottom: vars.$spacing-xs;
		}

		&__message {
			margin-bottom: 0;
			@include mix.truncate(3);
		}

		&__close {
			flex-shrink: 0;
			margin-left: vars.$spacing-sm;
			color: vars.$gray;
			padding: vars.$spacing-xxs;
			@include mix.transition(color);

			&:hover {
				color: vars.$black;
			}
		}

		// Styles spécifiques selon le type d'notife
		&--success {
			border-left: 4px solid vars.$success-color;

			.notif-item__icon {
				background-color: vars.$success-color;
			}

			.notif-item__title {
				color: func.adjust-color-brightness(vars.$success-color, -30%);
			}
		}

		&--error {
			border-left: 4px solid vars.$danger-color;

			.notif-item__icon {
				background-color: vars.$danger-color;
			}

			.notif-item__title {
				color: func.adjust-color-brightness(vars.$danger-color, -20%);
			}
		}

		&--warning {
			border-left: 4px solid vars.$warning-color;

			.notif-item__icon {
				background-color: vars.$warning-color;
			}

			.notif-item__title {
				color: func.adjust-color-brightness(vars.$warning-color, -30%);
			}
		}

		&--info {
			border-left: 4px solid vars.$info-color;

			.notif-item__icon {
				background-color: vars.$info-color;
			}

			.notif-item__title {
				color: func.adjust-color-brightness(vars.$info-color, -30%);
			}
		}
	}
</style>
