// src/types/config/navBar.ts

/**
 * Type pour un élément enfant de navigation
 * Représente un lien de sous-menu dans la navigation
 */
export interface NavChildItem {
	label: string;
	path: string;
	icon?: string;
}

/**
 * Type pour un élément principal de navigation
 * Peut contenir des éléments enfants pour former un sous-menu
 */
export interface NavItem {
	label: string;
	path: string;
	icon?: string;
	children?: NavChildItem[];
}

/**
 * Type pour la liste des éléments de navigation
 * Représente l'ensemble de la structure de navigation
 */
export type NavigationItems = NavItem[];

/**
 * Type pour la fonction de vérification d'une route active
 * Utilisé pour déterminer si un élément de menu doit être mis en évidence
 */
export type ActiveRouteChecker = (path: string, currentPath: string) => boolean;

/**
 * Type pour la fonction de vérification d'un enfant actif
 * Utilisé pour déterminer si un sous-menu contient un élément actif
 */
export type ActiveChildChecker = (item: NavItem, currentPath: string) => boolean;
