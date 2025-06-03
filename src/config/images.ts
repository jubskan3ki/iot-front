/**
 * Configuration centralisée des images
 * Utilise les imports dynamiques de Vite pour gérer correctement les chemins d'images
 */

// Importation de l'helper glob de Vite pour l'importation des assets
export const imageModules = import.meta.glob('/src/assets/images/**/*.*', { eager: true });

// Type pour les différentes catégories d'images
export interface ImageCategory {
	[key: string]: string;
}
