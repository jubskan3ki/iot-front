// src/router/index.ts
import { routes } from '@/router/routes';
import { useAuthStore } from '@/stores/auth';
import { useNavStore } from '@/stores/navBar';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const navStore = useNavStore();

	// Fermer le menu mobile lors de la navigation
	navStore.closeMobileMenu();

	// Vérifier l'authentification
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

	// Si la route nécessite une authentification
	if (requiresAuth && !authStore.isAuthenticated) {
		next({ name: 'Login', query: { redirect: to.fullPath } });
		return;
	}

	// Si la route est pour les invités uniquement (login/register)
	if (requiresGuest && authStore.isAuthenticated) {
		next({ name: 'Dashboard' });
		return;
	}

	next();
});

router.afterEach((to) => {
	// Mettre à jour le titre de la page
	const title = to.meta.title as string;
	if (title) {
		document.title = `${title} - IoT App`;
	} else {
		document.title = 'IoT App';
	}
});

export default router;
