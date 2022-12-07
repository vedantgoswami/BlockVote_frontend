import React from 'react'

const Inputbox = ({value}) => {
  return (
    
    <div class="form">
        <input type="text"  id={value}
        class="input form_input" autocomplete="off" placeholder=" "/>
        <label for="name" class="label form_label">{value}</label>
    </div>
  )
}

export default Inputbox