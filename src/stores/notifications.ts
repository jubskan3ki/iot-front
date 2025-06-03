// src/store/notif.ts
import { defineStore } from 'pinia';

import type { Notif, NotifOptions, NotifState } from '@/types/store/notifications';

export const useNotifStore = defineStore('notif', {
	state: (): NotifState => ({
		notifs: [] as Notif[],
		counter: 0, // Pour générer des IDs uniques
	}),

	actions: {
		add(notif: NotifOptions): string {
			const id = String(++this.counter);

			// Ajouter l'notife avec un ID unique
			this.notifs.push({
				...notif,
				id,
			});

			// Auto-suppression si autoClose est actif
			if (notif.autoClose !== false) {
				const timeout = notif.timeout || 5000;
				setTimeout(() => {
					this.remove(id);
				}, timeout);
			}

			return id;
		},

		remove(id: string): void {
			this.notifs = this.notifs.filter((a: { id: string }) => a.id !== id);
		},

		clear(): void {
			this.notifs = [];
		},
	},
});

export default useNotifStore;
