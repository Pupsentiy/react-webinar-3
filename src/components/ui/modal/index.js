import React, { useEffect, useState } from "react";
import {Portal} from "../portal";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

export const Modal = (props) => {
  const {
    children,
    isOpen,
    lazy
  } = props;
  const cn = bem('Modal');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.querySelector('.PageLayout')}>
      <section
        className={`${cn()} ${isOpen ? 'opened' : 'isClosing'}` }
      >
        <div className={cn('overlay')} >
          <div
            className={cn('content')}
          >
            {children}
          </div>
        </div>
      </section>
    </Portal>
  );
};

Modal.propTypes = {
  children:PropTypes.node,
  isOpen:PropTypes.bool,
  lazy:PropTypes.bool
}