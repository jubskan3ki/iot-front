// src/config/routes.ts
import type { AppRoutes, NamedRoutes, PathCreator } from '@/types/config/routes';

export const ROUTES: AppRoutes = {
	// Dashboard/Home
	DASHBOARD: {
		path: '/dashboard',
		name: 'Dashboard',
	},

	// Members routes (seules pages existantes)
	MEMBERS: {
		path: '/members',
		name: 'Members',
		ADD: {
			path: '/members/add',
			name: 'AddMember',
		},
		DETAIL: (id: string | number) => ({
			path: `/members/${id}`,
			name: 'MemberDetail',
		}),
	},

	// Auth routes
	AUTH: {
		path: '/auth',
		name: 'Auth',
		LOGIN: {
			path: '/auth/login',
			name: 'Login',
		},
		REGISTER: {
			path: '/auth/register',
			name: 'Register',
		},
	},

	// Error pages
	ERROR_404: {
		path: '/404',
		name: 'NotFound',
	},
};

// Helper functions for navigation
export const createPath: PathCreator = (route: { path: string }, params: Record<string, string | number> = {}) => {
	let path = route.path;

	// Replace path parameters
	Object.entries(params).forEach(([key, value]) => {
		path = path.replace(`:${key}`, String(value));
	});

	return path;
};

// For strongly typed navigation with params
export const namedRoutes: NamedRoutes = {
	// Dashboard
	goToDashboard: () => ROUTES.DASHBOARD,

	// Members
	goToMembers: () => ROUTES.MEMBERS,
	goToAddMember: () => ROUTES.MEMBERS.ADD,
	goToMemberDetail: (id: string | number) => ROUTES.MEMBERS.DETAIL(id),

	// Auth
	goToLogin: () => ROUTES.AUTH.LOGIN,
	goToRegister: () => ROUTES.AUTH.REGISTER,

	// Errors
	goToNotFound: () => ROUTES.ERROR_404,
};

// Utility function to check if route requires authentication
export const requiresAuth = (routeName: string): boolean => {
	const publicRoutes = ['Login', 'Register', 'NotFound'];

	return !publicRoutes.includes(routeName);
};

export default ROUTES;
