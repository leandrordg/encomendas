/**
 * Array de rotas públicas.
 * Estas rotas não precisam de autenticação.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/explorar", "/categorias", "/restaurantes"];

/**
 * Array de rotas para autenticação.
 * Estas rotas precisam de autenticação.
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * Prefixo da API para rotas de autenticação.
 * As rotas que começarem com este prefixo serão tratadas como rotas de autenticação.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Array de rotas da API.
 * Estas rotas são rotas da API que não precisam de autenticação.
 * @type {string[]}
 */
export const apiRoutes = ["/api/uploadthing"];

/**
 * Rota padrão de redirecionamento após o login.
 * Esta rota será utilizada para redirecionar o usuário após o login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
