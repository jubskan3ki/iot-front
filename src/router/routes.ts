// src/config/routes.ts
import type { PathCreator } from '@/types/config/routes';

// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router';

// Layouts
const AppShell = () => import('@/components/layouts/AppShell.vue');
const AuthLayout = () => import('@/components/layouts/AuthLayout.vue');

// Views - Dashboard
const HomeView = () => import('@/views/dashboard/HomeView.vue');

// Views - Members
const MembersView = () => import('@/views/members/MembersView.vue');
const AddMemberView = () => import('@/views/members/AddMemberView.vue');
const MemberDetailView = () => import('@/views/members/MemberDetailView.vue');

// Views - Auth
const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');

export const routes: RouteRecordRaw[] = [
	// Routes avec AppShell Layout (authentifiées)
	{
		path: '/',
		component: AppShell,
		meta: { requiresAuth: true },
		children: [
			{
				path: '',
				redirect: '/dashboard',
			},
			// Dashboard
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: HomeView,
				meta: {
					title: 'Tableau de bord',
					breadcrumb: 'Dashboard',
				},
			},
			// Members routes
			{
				path: 'members',
				name: 'Members',
				component: MembersView,
				meta: {
					title: 'Membres',
					breadcrumb: 'Membres',
				},
			},
			{
				path: 'members/add',
				name: 'AddMember',
				component: AddMemberView,
				meta: {
					title: 'Ajouter un membre',
					breadcrumb: 'Ajouter un membre',
				},
			},
			{
				path: 'members/:id',
				name: 'MemberDetail',
				component: MemberDetailView,
				meta: {
					title: 'Détail du membre',
					breadcrumb: 'Détail',
				},
				props: true,
			},
		],
	},

	// Routes avec AuthLayout (non authentifiées)
	{
		path: '/auth',
		component: AuthLayout,
		meta: { requiresGuest: true },
		children: [
			{
				path: '',
				redirect: '/auth/login',
			},
			{
				path: 'login',
				name: 'Login',
				component: LoginView,
				meta: {
					title: 'Connexion',
				},
			},
			{
				path: 'register',
				name: 'Register',
				component: RegisterView,
				meta: {
					title: 'Inscription',
				},
			},
		],
	},

	// Route 404
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/errors/NotFoundView.vue'),
		meta: {
			title: 'Page non trouvée',
		},
	},
];
// Helper functions for navigation
export const createPath: PathCreator = (route: { path: string }, params: Record<string, string | number> = {}) => {
	let path = route.path;

	// Replace path parameters
	Object.entries(params).forEach(([key, value]) => {
		path = path.replace(`:${key}`, String(value));
	});

	return path;
};
