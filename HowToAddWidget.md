# Comment ajouter un Widget ?

Les widgets utlilisés dans notre dashboard sont contruits en deux parties, un "form" qui correspond à ce que l'on peut voir dans le menu de création, ensuite il y a la partie "print" du widget qui apparait une fois que nous avons créé notre widget.


## Widget Form

Le Widget form se fait très simplement il suffit de faire un petit questionnaire avec les différentes settings de notre widget, pour ce qui est de l'ajout du widget à l'utilisateur il suffit de créer un objet data par exmple, de lui attribuer le type de notre widget ainsi qu'une partie settings qui est une chaîne de caractère.

Ensuite il faut appeler la fonction addWidget qui retourne l'id du widget que nous pouvons directement ajouter à l'utilisateur avec la fonction AddWidgetToUser. Pour ajouter notre widget il faut aussi créer notre type dans la base de donnée, pour ce faire il suffit de l'ajouter dans le datamodel dans le dossier prisma du serveur.

## Widget Print

Pour faire la seconde partie de notre widget, Il suffit de créer un composant qui lors de l'instanciation récupère les informations données en props, id du widget et settings. Avec ces informations nous pouvons donc créer notre widget et faire les différents appel aux api dont nous avons besoin à ce moment.

Pour pouvoir afficher notre componant il faut aller dans la Homepage et le rajouter à la suite des autres widgets. Il en est de même sur la page de création du widget. Dans cette partie du widget il ne faut pas oublier de rajouter une partie pour mettre à jour les settings de notre widget, pour se faire il suffit d'appeler la fonction UpdateWidgetSettings avec en argument un objet data par exemple qui se compose de l'id et des nouvelles settings de notre widget. Pour ce qui est de la suppresion du widget faut appeler la fonction disconnectWidget qui va supprimer notre widget.

Pour le graphique du widget on peut appeler les class Button et ButtonDel pour ce qui correspond respectivement au bouton des settings et au bouton de la poubelle pour la suppression du widget.