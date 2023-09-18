import React from 'react'
// import '../Styles/footer.css'
function Footer() {
  return (
    <div>
      {/* footer */}
      <footer className="bg-light text-center text-lg-start mt-auto">
        <div className="text-center p-3" style={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
        © 2023 Copyright 
        <a className="text-dark" href="https://mdbootstrap.com/"> React Js</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer