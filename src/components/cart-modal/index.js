import {Modal} from "../ui/modal";
import React from 'react'
import Head from "../head";
import List from "../list";
import './styles.css'
import {totalPrice} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
export const CartModal = (props) => {
  const cn = bem('CartModal')

  return (
    <Modal isOpen={props.isOpenModal} lazy>
    <div className={cn("wrapper-content")}>
      <Head title={'Корзина'} onAction={props.toggleModal}/>
      {Boolean(props.cart.length) &&
        <div className={cn("wrapper-list")}>
          <List list={props.cart} cartFlag onAction={props.onDelete}/>
        </div>
      }
      <div className={cn("total")}>
        <span>Итого</span>{totalPrice(props.cart)} ₽
      </div>
    </div>
    </Modal>
  );
};

CartModal.propTypes = {
  isOpenModal:PropTypes.bool.isRequired,
  cart:PropTypes.array.isRequired,
  toggleModal:PropTypes.func,
  onDelete:PropTypes.func
}

CartModal.defaultProps = {
  toggleModal:() => {},
  onDelete:()=>{}
}