export default ({ children, ...rest }) => (
  <div className='container' {...rest}>
    {children}
    <style jsx>{`
      .container {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
      }
    `}</style>
  </div>
)
