<!-- src/components/layouts/AuthLayout.vue -->
<template>
	<div class="auth-layout">
		<!-- Main content container -->
		<div class="auth-layout__container">
			<!-- Left side - Branding/Info -->
			<div class="auth-layout__brand">
				<div class="auth-layout__brand-content">
					<div class="auth-layout__logo">
						<h1 class="auth-layout__logo-text">IoT App</h1>
					</div>

					<div class="auth-layout__welcome">
						<h2 class="auth-layout__welcome-title">Bienvenue dans votre application IoT</h2>
						<p class="auth-layout__welcome-description">
							Gérez vos appareils connectés et surveillez vos données en temps réel. Une solution complète
							pour votre écosystème IoT.
						</p>
					</div>

					<div class="auth-layout__features">
						<div class="feature-item">
							<div class="feature-item__icon">
								<BaseIcon name="wifi" :size="24" />
							</div>
							<span class="feature-item__text">Connectivité IoT</span>
						</div>
						<div class="feature-item">
							<div class="feature-item__icon">
								<BaseIcon name="bar-chart" :size="24" />
							</div>
							<span class="feature-item__text">Analytics avancés</span>
						</div>
						<div class="feature-item">
							<div class="feature-item__icon">
								<BaseIcon name="shield" :size="24" />
							</div>
							<span class="feature-item__text">Sécurité renforcée</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Right side - Auth Form -->
			<div class="auth-layout__form">
				<div class="auth-layout__form-container">
					<div class="auth-layout__form-header">
						<router-link to="/" class="auth-layout__back-link">
							<BaseIcon name="arrow-left" :size="20" />
							<span>Retour</span>
						</router-link>
					</div>

					<div class="auth-layout__form-content">
						<slot></slot>
					</div>

					<div class="auth-layout__form-footer">
						<p class="auth-layout__footer-text">© 2025 IoT App. Tous droits réservés.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Alert system -->
		<AlertList position="top-right" />

		<!-- Loading overlay -->
		<Loader />
	</div>
</template>

<script setup lang="ts">
	import BaseIcon from '@/components/base/BaseIcon.vue';
	import AlertList from '@/components/feedback/AlertList.vue';
	import Loader from '@/components/loaders/Loader.vue';
</script>

<style lang="scss" scoped>
	@use '@/styles/abstracts/variables' as vars;
	@use '@/styles/abstracts/mixins' as mix;
	@use '@/styles/abstracts/functions' as func;

	.auth-layout {
		min-height: 100vh;
		position: relative;
		overflow: hidden;

		&__container {
			@include mix.flex(row, stretch, stretch);
			min-height: 100vh;

			@include mix.responsive(tablet) {
				@include mix.flex(column, flex-start, stretch);
			}
		}

		&__brand {
			flex: 1;
			@include mix.flex(column, center, center);
			padding: vars.$spacing-xl;
			background: linear-gradient(
				135deg,
				func.color-alpha(vars.$primary-color, 0.95) 0%,
				func.color-alpha(vars.$secondary-color, 0.9) 100%
			);
			color: vars.$white;
			position: relative;

			@include mix.responsive(tablet) {
				padding: vars.$spacing-lg vars.$spacing-md;
				min-height: 40vh;
			}

			@include mix.responsive(mobile) {
				padding: vars.$spacing-md;
				min-height: 30vh;
			}

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
				opacity: 0.3;
			}

			&-content {
				position: relative;
				z-index: 1;
				text-align: center;
				max-width: 500px;
			}
		}

		&__logo {
			margin-bottom: vars.$spacing-xl;

			&-text {
				font-size: func.font-size('h1', 'large');
				font-weight: 700;
				margin-bottom: vars.$spacing-sm;

				@include mix.responsive(mobile) {
					font-size: func.font-size('h2', 'medium');
				}
			}
		}

		&__welcome {
			margin-bottom: vars.$spacing-xl;

			&-title {
				font-size: func.font-size('h3', 'large');
				font-weight: 600;
				margin-bottom: vars.$spacing-md;
				line-height: 1.3;

				@include mix.responsive(mobile) {
					font-size: func.font-size('h4', 'medium');
				}
			}

			&-description {
				font-size: func.font-size('p', 'large');
				opacity: 0.9;
				line-height: 1.6;

				@include mix.responsive(mobile) {
					font-size: func.font-size('p', 'medium');
				}
			}
		}

		&__features {
			@include mix.flex(column, flex-start, flex-start);
			gap: vars.$spacing-md;

			@include mix.responsive(tablet) {
				@include mix.flex(row, center, center);
				flex-wrap: wrap;
				gap: vars.$spacing-lg;
			}
		}

		&__form {
			flex: 1;
			@include mix.flex(column, center, center);
			background: vars.$white;
			padding: vars.$spacing-xl;
			position: relative;

			@include mix.responsive(tablet) {
				padding: vars.$spacing-lg vars.$spacing-md;
			}

			@include mix.responsive(mobile) {
				padding: vars.$spacing-md;
			}

			&-container {
				width: 100%;
				max-width: 450px;
				@include mix.flex(column, space-between, stretch);
				min-height: 100%;
			}

			&-header {
				margin-bottom: vars.$spacing-lg;
			}

			&-content {
				flex: 1;
				@include mix.flex(column, center, stretch);
			}

			&-footer {
				margin-top: vars.$spacing-lg;
				text-align: center;
			}
		}

		&__back-link {
			@include mix.flex(row, flex-start, center);
			gap: vars.$spacing-xs;
			color: vars.$gray-dark;
			font-weight: 500;
			@include mix.transition(color);

			&:hover {
				color: vars.$primary-color;
			}
		}

		&__footer-text {
			font-size: func.font-size('small', 'medium');
			color: vars.$gray;
		}
	}

	.feature-item {
		@include mix.flex(row, flex-start, center);
		gap: vars.$spacing-md;

		@include mix.responsive(tablet) {
			@include mix.flex(column, center, center);
			text-align: center;
			gap: vars.$spacing-xs;
		}

		&__icon {
			@include mix.flex(row, center, center);
			width: 48px;
			height: 48px;
			background: func.color-alpha(vars.$white, 0.2);
			border-radius: vars.$border-radius-md;
			flex-shrink: 0;

			@include mix.responsive(tablet) {
				width: 40px;
				height: 40px;
			}
		}

		&__text {
			font-weight: 500;
			font-size: func.font-size('p', 'medium');

			@include mix.responsive(mobile) {
				font-size: func.font-size('small', 'medium');
			}
		}
	}

	// Animations
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	// Dark mode support
	@include mix.dark-mode {
		.auth-layout {
			&__form {
				background: vars.$black-light;
				color: vars.$white;
			}

			&__footer-text {
				color: vars.$gray-light;
			}

			&__back-link {
				color: vars.$gray-light;

				&:hover {
					color: vars.$primary-color;
				}
			}
		}
	}
</style>
