/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/","/fr",
    "/auth/new-verification", "/fr/auth/new-verification",
    "/about","/fr/about",
    "/brokers-services","/fr/brokers-services",
    "/sellers-services","/fr/sellers-services",
    "/consumers-benefits","/fr/consumers-benefits",
    "/razin-benefits","/fr/razin-benefits",
    "/calculate-fees","/fr/calculate-fees",
 ];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/fr/auth/login",
  "/fr/auth/register",
  "/fr/auth/error",
  "/fr/auth/reset",
  "/fr/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
