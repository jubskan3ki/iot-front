// types/config/routes.ts

/**
 * Types pour la configuration des routes
 */

// Type de base pour une route
export interface Route {
	path: string;
	name: string;
}

// Type pour une fonction générant une route avec un paramètre ID
export type RouteWithIdGenerator = (id: string | number) => Route;

// Type pour les routes des membres
export interface MembersRoutes {
	path: string;
	name: string;
	ADD: Route;
	DETAIL: RouteWithIdGenerator;
}

// Type pour les routes d'authentification
export interface AuthRoutes {
	path: string;
	name: string;
	LOGIN: Route;
	REGISTER: Route;
}

// Type pour l'ensemble des routes de l'application
export interface AppRoutes {
	DASHBOARD: Route;
	MEMBERS: MembersRoutes;
	AUTH: AuthRoutes;
	ERROR_404: Route;
}

// Type pour les fonctions de création de chemins
export type PathCreator = (route: { path: string }, params?: Record<string, string | number>) => string;

// Type pour les fonctions de navigation typée
export interface NamedRoutes {
	// Dashboard
	goToDashboard: () => Route;

	// Members
	goToMembers: () => MembersRoutes;
	goToAddMember: () => Route;
	goToMemberDetail: (id: string | number) => Route;

	// Auth
	goToLogin: () => Route;
	goToRegister: () => Route;

	// Errors
	goToNotFound: () => Route;
}
