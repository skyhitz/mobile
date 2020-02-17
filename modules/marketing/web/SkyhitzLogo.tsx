import React from 'react';

const SkyhitzLogo = () => (
    <div className='logo-wrap'>
        <img
            className='logo'
            src='https://res.cloudinary.com/skyhitz/image/upload/c_scale,q_100,w_42/v1512418696/web/skyhitz_logo_tzt0kr.png'
            alt='skyhitz logo'
        />
        <style jsx>{`
      .logo {
        width: 42px;
        height: 33.6px;
      }
      .logo-wrap {
        display: inline-block;
      }
    `}</style>
    </div>
);

export default SkyhitzLogo;
