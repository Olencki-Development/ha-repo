// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	interface PrivateEnv {
		DB_USERNAME: string;
		DB_PASSWORD: string;
		DB_DATABASE: string;
		DB_HOST: string;
	}
	// interface PublicEnv {}
}
