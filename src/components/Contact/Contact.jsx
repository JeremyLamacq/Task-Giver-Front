import "./Contact.scss";

const Contact = () => {

    const handleReturnClick = () => {
        window.history.back();
    };

    return (
        <section id="contact">
            <h1>Contact</h1>
            <div id="centerPage">
            
                <img src="/images/logo-poule.png"></img>
         
                <form id="form">
                    <input type='text' placeholder='Nom'/>
                    <input type='text' placeholder='Prénom'/>
                    <input type='email' placeholder='E-mail'/>
                    <textarea type='text' placeholder='Votre message ...'></textarea>
                    <button>Envoyer</button>
                </form>
              
            </div>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>
            
        </section>
    )
}

export default Contact;