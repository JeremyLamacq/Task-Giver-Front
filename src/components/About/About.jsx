import "./About.scss";

const About = () => {

    const handleReturnClick = () => {
        window.history.back();
    };

    return (
        <section id="about">
            <h1>A propos de Task Giver</h1>
            <div id="centerPage">
            
                <img src="/images/logo-poule.png"></img>
         
                <p>
                    Notre équipe est née aléatoirement lors de la phase d’apothéose à la fin de notre formation.
                    Le projet a été créé par notre product owner Guilhem et nous avons donc commencer par une réunion pour poser les bases du projet.
                    Une très bonne entente s’est installée dans l’équipe et de cette cohésion est née le Task Giver d’aujourd’hui :
                    <br/>
                    Une plateforme collaborative de gestion de tâche en partant d’une équipe qui réalise différentes tâches appartenant à différentes catégories.
                </p>
              
            </div>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>
            
        </section>
    )
}

export default About;