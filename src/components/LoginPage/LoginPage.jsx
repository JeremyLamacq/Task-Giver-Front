import "./LoginPage.scss";
// eslint-disable-next-line react/prop-types
const LoginPage = ({ onSubmit, email, setEmail, password, setPassword }) => {

    /**
     * 
     * @param {*} event 
     */
    const handleSetEmail = (event) => {
        setEmail(event.target.value);
      };
    
    /**
     * 
     * @param {*} event 
     */
    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

    /**
     * 
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(email, password);
        
        setEmail('');
        setPassword('');
      };
    
    const handleReturnClick = () => {
        window.history.back();
    };
    
    return (
        <section id="loginPage">
            <h1>Connexion</h1>
            <div id="centerPage">
                <img src="/images/logo-poule.png"></img>
         
                <form id="form" onSubmit={handleSubmit}>
                    <input type='email' id='email' placeholder='E-mail' value={email} name='username' onChange={handleSetEmail} onPaste={handleSetEmail} onCopy={handleSetEmail} onCut={handleSetEmail}/>
                    <input type='password' id='password' placeholder='Password' value={password} name='password' onChange={handleSetPassword} onPaste={handleSetPassword} onCopy={handleSetPassword} onCut={handleSetPassword}/>
                    <button type="submit">Connexion</button>
                </form>
              
            </div>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>

        </section>
    )
    
}

export default LoginPage;