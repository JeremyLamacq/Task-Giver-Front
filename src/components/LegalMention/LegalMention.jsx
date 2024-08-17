import "./LegalMention.scss";

const LegalMention = () => {

    const handleReturnClick = () => {
        window.history.back();
    };

    return (
        <section id="legalMention">
            <h1>Mentions légales</h1>
            <div id="centerPage">
            
                <img src="/images/logo-poule.png"></img>
         
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent pharetra pretium risus nec laoreet. Nullam sit amet cursus elit.
                    Aliquam id erat hendrerit, fermentum eros ac, accumsan nulla.
                    Aenean aliquam hendrerit facilisis. Nunc sed ipsum neque. 
                    Suspendisse suscipit, diam ullamcorper consectetur ullamcorper, 
                    turpis ex ultrices purus, non faucibus nibh turpis at magna. Nullam ac hendrerit quam.
                    Suspendisse maximus leo ac tincidunt congue.
                </p>
              
            </div>

            <section className='actions'>
                <button type='click' onClick={handleReturnClick}>retour</button>
            </section>
            
        </section>
    )
}

export default LegalMention;