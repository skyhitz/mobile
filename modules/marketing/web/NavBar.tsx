import React from 'react';
import Link from './Link';
import SkyhitzLogo from './SkyhitzLogo';

const Navbar = () => (
    <div className='navbar'>
        <Link href='/'>
            <div className='logo-type'>
                <SkyhitzLogo />
                <div className='text'>SKYHITZ</div>
            </div>
        </Link>
        <style jsx>{`
      .navbar {
        border-color: #000;
        background: rgba(0, 0, 0, 0.7);
        height: 56px;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 80;
      }
      .logo-type {
        max-height: 56px;
        margin-right: 15px;
        padding: 11.2px 0 7.22px 15px;
        display: table;
        cursor: pointer;
      }
      .text {
        color: white;
        font-family: Raleway-Light;
        font-weight: 200;
        font-size: 18px;
        letter-spacing: 12px;
        display: inline-block;
        vertical-align: top;
        padding-top: 6.3px;
        padding-left: 8px;
      }
    `}</style>
    </div>
);

export default Navbar;
