import React from "react";

interface EvenementProps {}

const Evenement: React.FC<EvenementProps> = () => {
    return (
        <div className="page-wrapper">
            <h1>Créer un nouvel événement</h1>
            <div className="form-wrapper">
                <form>
                    <div className="form-wrapper">
                        <label>Nom de l'événement:</label>
                        <input type="text" name="nom" />
                    </div>
                    <div className="form-wrapper">
                        <label>Date de l'événement:</label>
                        <input type="date" name="date" />
                    </div>
                    <div className="form-wrapper">
                        <label>Lieu de l'événement:</label>
                        <input type="text" name="lieu" />
                    </div>
                    <input type="submit" value="Soumettre" />
                </form>
            </div>
        </div>
    );
};

export default Evenement;
