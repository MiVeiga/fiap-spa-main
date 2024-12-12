import { useState } from 'react';
import cn from 'classnames';

import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {ReactComponent as Avatar} from "../../images/Avatar.svg";
import {ReactComponent as Fechar} from "../../images/Fechar.svg";

import styles from "./Header.module.scss"


export default function Header(props: HeaderProps) {
  const {items} = props;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderDesktopHeader = () => {
    return (
      <span className={styles.userNameContainer}>
        <span className={styles.userName}>Joana da Silva Oliveira</span>
        <Avatar alt='Avatar' height={40} width={40}/>
      </span>
    );
  }

  const renderMobileHeader = () => {
    return (
      <div className={styles.mobileHeaderContainer}>
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className={styles.menuIcon}/>
        </IconButton>
        <Fechar alt='Avatar' height={40} width={40}/>
      </div>
    );
  }

  const renderMobileMenu = () => {
    return (
      <div className={styles.mobileMenuContainer} onClick={() => setIsMenuOpen(false)}>
        <div className={styles.mobileMenu}>
          <span className={styles.closeButton}>
            <Fechar 
              alt='Fechar'
              height={16}
              width={16}
            />
          </span>
          {items.map((item) => (
            <a 
              key={item.title}
              className={cn({[styles.itemSelected]: item.selected}, styles.menuItem)} 
              href={item.route}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    );
  }

  const getHeader = () => {
    if (typeof window !== "undefined" && window.screen.width <= 425) {
      return renderMobileHeader();
    }

    return renderDesktopHeader();
  }

  return (
    <div id='header' className={styles.header}>
      <div className={styles.headerGrid}>
        {getHeader()}
      </div>
      {isMenuOpen && renderMobileMenu()}
    </div>
  );
}

interface HeaderProps {
  items: {
    title: string;
    route: string;
    selected: boolean;
  }[];
}