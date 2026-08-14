import React from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';

const CookieBanner: React.FC = () => {
  return (
    <CookieConsent
      cookieName="site_cookie_consent"
      expires={365}                       // días
      location="bottom"
      buttonText="Aceptar"
      declineButtonText="Rechazar"
      enableDeclineButton
      style={{ background: '#2b2b2b' }}
      buttonStyle={{ color: '#fff', background: '#8B4513', borderRadius: 4 }}
      declineButtonStyle={{ color: '#fff', background: '#D2691E', borderRadius: 4 }}
      onDecline={() => {
        // Aquí podrías desactivar scripts de seguimiento, etc.
        console.log('Cookies rechazadas');
      }}
    >
      Usamos cookies para mejorar tu experiencia.{' '}
      <a href="/politica-de-cookies" className="underline">
        Leer más
      </a>
    </CookieConsent>
  );
};

export default CookieBanner;
