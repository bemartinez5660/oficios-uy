import { TranslocoTestingModule } from '@jsverse/transloco';

export function getTranslocoModule() {
  return TranslocoTestingModule.forRoot({
    langs: {
      es: {
        'APP.TITLE': 'OficiosUY',
        'NAV.SERVICES': 'Servicios',
        'NAV.PROFILE': 'Perfil',
        'NAV.LOGOUT': 'Cerrar Sesión',
        'NAV.LOGIN': 'Iniciar Sesión',
        'NAV.REGISTER': 'Registrarse'
      }
    },
    translocoConfig: {
      availableLangs: ['es', 'en'],
      defaultLang: 'es'
    }
  });
}
