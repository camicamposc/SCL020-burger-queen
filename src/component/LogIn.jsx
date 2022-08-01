import React from 'react'


const LogIn = () => {
  return (
    <div >
       <img src="https://github.com/Noribel/SCL020-burger-queen/blob/main/src/imagenes/logo.png?raw=true" className="mt-5 rounded-pill w-50" alt=""/>
        <form>
            <p className="mt-5">
                Introduce tu usuario y contraseña para comenzar
            </p>
          <div className='sesion'>
            <input type="email" className="form-logIn bg-indigo-600" placeholder='usuario' />
            <input type="password" className="form-logIn mt-2" placeholder='contraseña' />  
            <button className="btn-dark mt-2" >Ingresar</button>  

          </div>
           
           
        </form>
    </div>
  )
}

export default LogIn