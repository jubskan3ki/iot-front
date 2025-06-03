<!-- src/components/layouts/Footer.vue -->
<template>
	<footer class="footer">
		<div class="container">
			<!-- Bas de page -->
			<div class="footer__bottom">
				<small class="footer__copyright"> &copy; {{ currentYear }} </small>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	// Année actuelle pour le copyright
	const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
	@use '@/styles/abstracts/variables' as vars;
	@use '@/styles/abstracts/mixins' as mix;
	@use '@/styles/abstracts/functions' as func;

	.footer {
		background: linear-gradient(
			to right,
			func.color-alpha(vars.$primary-color, 0.05),
			func.color-alpha(vars.$secondary-color, 0.05)
		);
		padding: vars.$spacing-xl 0;

		&__main {
			display: grid;
			grid-template-columns: 3fr 1fr;
			gap: vars.$spacing-lg;
			margin-bottom: vars.$spacing-lg;

			@include mix.responsive(tablet) {
				grid-template-columns: 1fr;
				gap: vars.$spacing-md;
			}
		}

		&__contact {
			display: flex;
			flex-direction: column;
			gap: vars.$spacing-lg;

			@include mix.responsive(tablet) {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: vars.$spacing-md;
			}
		}

		&__bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: vars.$spacing-md;
			border-top: 1px solid func.color-alpha(vars.$gray, 0.3);

			@include mix.responsive(mobile) {
				flex-direction: column;
				gap: vars.$spacing-sm;
				align-items: flex-start;
			}
		}

		&__copyright {
			color: vars.$gray-dark;
		}

		&__legal {
			display: flex;
			gap: vars.$spacing-md;

			@include mix.responsive(mobile) {
				flex-direction: column;
				gap: vars.$spacing-xs;
			}
		}

		&__legal-link {
			color: vars.$gray-dark;
			transition: color vars.$transition-base;

			&:hover {
				color: vars.$primary-color;
			}
		}
	}
</style>
