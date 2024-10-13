export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
 Analiza: '/dashboard/Analiza',
 Kalendarz: '/dashboard/Kalendarz',
 Lista_szkolen: '/dashboard/Lista_szkolen',
 Dodaj_szkolenie: '/dashboard/Dodaj_szkolenie',
 Dodaj_ankiete: '/dashboard/Dodaj_ankiete',
 Archiwum: '/dashboard/Archiwalne_szkolenia',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
    