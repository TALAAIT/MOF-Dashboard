import { writable } from 'svelte/store'

export const hoverData = writable<{}|null>(null);
