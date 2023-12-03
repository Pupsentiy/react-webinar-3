import {Modal} from "../ui/modal";
import React from 'react'
import Head from "../head";
import List from "../list";
import './styles.css'
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {formatNumber} from "../../utils";
export const CartModal = (props) => {
  const cn = bem('CartModal')

  return (
    <Modal isOpen={props?.isOpenModal} lazy>
    <div className={cn("wrapper-content")}>
      <Head title={'Корзина'} onAction={props?.toggleModal}/>
      {Boolean(props?.cart.length) &&
        <div className={cn("wrapper-list")}>
          <List list={props?.cart} cartFlag onAction={props?.onDelete}/>
        </div>
      }
      <div className={cn("total")}>
        <span>Итого</span>{formatNumber(props.totalPrice)}
      </div>
    </div>
    </Modal>
  );
};

CartModal.propTypes = {
  isOpenModal:PropTypes.bool.isRequired,
  cart:PropTypes.array.isRequired,
  toggleModal:PropTypes.func,
  onDelete:PropTypes.func,
  totalPrice:PropTypes.number
}

CartModal.defaultProps = {
  toggleModal:() => {},
  onDelete:()=>{}
}