// src/config/navBar.ts
import type { ActiveRouteChecker, NavigationItems } from '@/types/config/navBar';
import { ROUTES } from './routes';

// Éléments de navigation avec seulement les routes existantes
export const navigationItems: NavigationItems = [
	{
		label: 'Dashboard',
		path: ROUTES.DASHBOARD.path,
		icon: 'home',
	},
	{
		label: 'Membres',
		path: ROUTES.MEMBERS.path,
		icon: 'users',
		children: [
			{
				label: 'Liste des membres',
				path: ROUTES.MEMBERS.path,
				icon: 'list',
			},
			{
				label: 'Ajouter un membre',
				path: ROUTES.MEMBERS.ADD.path,
				icon: 'user-plus',
			},
		],
	},
];

// Fonction utilitaire pour vérifier si une route est active
export const isActiveRoute: ActiveRouteChecker = (path: string, currentPath: string): boolean => {
	// Cas spécial pour la page dashboard
	if (path === ROUTES.DASHBOARD.path && (currentPath === '/' || currentPath === ROUTES.DASHBOARD.path)) {
		return true;
	}

	// Cas spécial pour la racine
	if (path === '/' && currentPath === '/') {
		return true;
	}

	// Pour les autres routes, vérifier si le chemin actuel commence par le chemin de l'élément
	// mais éviter les faux positifs (ex: /members ne doit pas matcher /members-stats)
	if (path !== '/' && currentPath.startsWith(path)) {
		// Vérifier que le caractère suivant est un '/' ou que c'est la fin de la chaîne
		const nextChar = currentPath.charAt(path.length);
		return nextChar === '' || nextChar === '/' || nextChar === '?' || nextChar === '#';
	}

	return false;
};

// Fonction pour vérifier si un des enfants d'un élément de navigation est actif
export const hasActiveChild = (item: NavigationItems[0], currentPath: string): boolean => {
	if (!item.children) return false;

	return item.children.some((child) => isActiveRoute(child.path, currentPath));
};

export default {
	navigationItems,
	isActiveRoute,
	hasActiveChild,
};
