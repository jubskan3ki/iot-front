// types/store/notif.ts

// Types d'notifes disponibles
export type NotifType = 'success' | 'error' | 'warning' | 'info';

// Interface pour une notife
export interface Notif {
	id: string;
	message: string;
	type: NotifType;
	title?: string;
	autoClose?: boolean;
	timeout?: number;
	dismissible?: boolean;
}

// Interface pour l'état du store d'notifes
export interface NotifState {
	notifs: Notif[];
	counter: number; // Pour générer des IDs uniques
}

// Interface pour les paramètres d'ajout d'une notife (sans l'ID)
export type NotifOptions = Omit<Notif, 'id'>;

// Interface pour les getters du store d'notifes
export interface NotifGetters {
	// Actuellement pas de getters spécifiques
}

// Interface pour les actions du store d'notifes
export interface NotifActions {
	add(notif: NotifOptions): string;
	remove(id: string): void;
	clear(): void;
}

// Interface pour les paramètres de notifications simplifiés
export interface NotifyOptions {
	message: string;
	type?: NotifType;
	title?: string;
	autoClose?: boolean;
	timeout?: number;
	dismissible?: boolean;
}

// Interface pour le composable useNotif
export interface UseNotifReturn {
	notify: (options: NotifyOptions) => string;
	success: (message: string, title?: string, options?: Partial<NotifyOptions>) => string;
	error: (message: string, title?: string, options?: Partial<NotifyOptions>) => string;
	warning: (message: string, title?: string, options?: Partial<NotifyOptions>) => string;
	info: (message: string, title?: string, options?: Partial<NotifyOptions>) => string;
	removeNotification: (id: string) => void;
	clearAllNotifications: () => void;
}
