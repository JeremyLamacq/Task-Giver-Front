import "./AccessDenied.scss";

const AccessDeniedPage = () => {

  const handleReturnClick = () => {
    window.history.back();
  };
    
    return [
      <>   
        <section id="accessDenied">
            <h1>Vous n&apos;êtes pas autorisé à accéder à cette page</h1>
            <div id="centerPage">
                <img src="/images/logo-poule.png" alt="logo"></img>
                <p id="textZone">
                    Oups !!! <br />
                    Il semblerait qu’une erreur se soit produite. <br />
                    Nous te proposons de revenir en arrière ou de te diriger sur la page de ton choix.
                </p>
                      
            </div>
            
            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>
        </section>

      </>
    ]
  };

  export default AccessDeniedPage;