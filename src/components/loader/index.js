import {memo} from "react";
import './styles.css'
function Loader(){
  return (
    <div className={'wrapper-loader'}>
      <div
        className={'lds-spinner'}
      >
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  )
}

export default memo(Loader)