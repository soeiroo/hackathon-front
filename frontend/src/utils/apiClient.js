// This shim re-exports the user's TSX apiClient implementation.
// Exporting explicitly from the .tsx path prevents the bundler from resolving
// the import to this .js file (which would cause a circular reference).
// Explicitly import named exports and re-export them. This makes it clear to
// the bundler which symbols are available and avoids ambiguous wildcard re-exports.
import { addUser, loginByCpf, resetPassword } from './apiClient.tsx';
export { addUser, loginByCpf, resetPassword };
export { default } from './apiClient.tsx';
