<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-type" content="text/html" charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="desc"/>
    <meta name="keywords" content="keyword">
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <title>Jeu de grattage</title>
</head>
<body>

<?php require_once 'database.php';
//s'il y a au moins un  utilisateur enregistrer on peut jouer
$req=$db->query('SELECT * FROM users LIMIT 1');
$user = $req->fetchObject();
//var_dump($user);
?>


<div class="header">
    <nav>
        <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Casino</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li><a href="index.php">Home</a></li>
            <li><a href="badges.html">Jeux de grattage</a></li>
        </ul>
        </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="index.php">Home</a></li>
        <li><a href="badges.html">Jeux de grattage</a></li>
    </ul>
</div>
<div class="game-buy">
    <div class="card">
        <h5>Bonjour <?=$user->name ?></h5>
    </div>
    <div class="card">
        <h6>Vous avez : </h6>
        <div class="stat">
        <h6 id="user_piece"><?= $user->piece ?></h6>
            <img src="img/piece.png" alt="icone piece">
        </div>
        <div class="stat">
            <h6 id="user_billet"><?= $user->billet ?></h6>
            <img src="img/billet.png" alt="icone billet">
        </div>
    </div>
    <button class="waves-effect waves-light btn" id="play_piece">Acheter une partie pour 9<img src="img/piece.png" alt="icone piece"></button>
    <button class="waves-effect waves-light btn" id="play_billet">Acheter une partie pour 2<img src="img/billet.png" alt="icone billet"></button>
</div>
<div class="jeux">
    <div class="top"><img src="img/fond.jpg" alt="Title"></div>
    <div class="grat"></div>
    <canvas id="zone" width="835px" height="203px"></canvas>
    <button class="waves-effect waves-light btn" id="recup">Récuperer vos récompenses</button>
</div>






    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/game.js"></script>
</body>
</html>