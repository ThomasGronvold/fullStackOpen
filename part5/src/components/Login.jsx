import PropTypes from 'prop-types'

const Login = ({ handleLogin, setUsername, setPassword }) => {
   return (
      <div>
         <h2>Log in to application</h2>
         <form onSubmit={handleLogin}>
            <table>
               <tbody>
                  <tr>
                     <td>
                        <label htmlFor="username">Username: </label>
                     </td>
                     <td>
                        <input
                           type="text"
                           name="username"
                           id="username"
                           onChange={({ target }) => setUsername(target.value)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <label htmlFor="password">Password: </label>
                     </td>
                     <td>
                        <input
                           type="password"
                           name="password"
                           id="password"
                           onChange={({ target }) => setPassword(target.value)}
                        />
                     </td>
                  </tr>
               </tbody>
            </table>
            <button>Login</button>
         </form>
      </div>
   );
};

Login.propTypes = {
   handleLogin: PropTypes.func.isRequired,
   setUsername: PropTypes.func.isRequired,
   setPassword: PropTypes.func.isRequired,
}

export default Login;
