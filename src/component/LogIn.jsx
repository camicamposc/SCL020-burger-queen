import React from 'react'

const LogIn = () => {
  return (
    <div>
        <form>
            <p>
                Introduce tu usuario y contraseña para comenzar
            </p>
            <input type="email" className="form-logIn mb-2" placeholder='usuario' />
            <input type="password" className="form-logIn mb-2" placeholder='contraseña' />  
            <button className="btn">Ingresar</button>
        </form>
    </div>
  )
}

export default LogIn