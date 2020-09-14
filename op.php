<?php
//on regarde les infos dans la bdd
require_once 'database.php';


//s'il y a une action avec assez des pieces(ou billets) et le bon chiffre
if(isset($_POST['action']) AND isset($_POST['monnaie']) AND isset($_POST['nb']))
{
    $monnaie= $_POST['monnaie'];
    $nb=$_POST['nb'];
    
    //et si l'action que l'on veut effectuer est égal à un retrait
    if($_POST['action']=="retrait")
    {
        //alors on peut déduire le montant de la partie
        $newMonnaie = $monnaie - $nb ;
        $db->query("UPDATE users SET piece = '$newMonnaie'");
        $req = $db->query('SELECT * FROM users');
        $user = $req->fetchObject();
        if($monnaie == "piece")
        {
            echo $user->piece;
        } 
        else

        $db->query("UPDATE users SET billet = '$newMonnaie'");
        $req = $db->query('SELECT * FROM users');
        $user = $req->fetchObject();
        if($monnaie == "billet")
        {
            echo $user->billet;
        }
    }
    else if ($_POST['action']=="depot")
    {
        $newMonnaie = $monnaie + $nb ;
        $db->query("UPDATE users SET piece = '$newMonnaie'");
        $req = $db->query('SELECT * FROM users');
        $user = $req->fetchObject();
        if($monnaie == "piece")
        {
            echo $user->piece;
        } 
        else
        {
            echo $user->billet;
        }
    }
}