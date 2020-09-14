$(document).ready(function(){//pour verifier que tout est ok avant de demarrer
    
    let lot = [];
    let gain = [];

    for(let i=0; i<=50; i++){
        lot.push({
            name : 'billet',
            img : 'billet',
            nb : 1,
            win : 'true'
        })
    };
    for(let i=0; i<=50; i++){
        lot.push({
            name : 'piece',
            img : 'piece',
            nb : 1,
            win : 'true'
        })
    };

    for(let i=0; i<=25; i++){
        lot.push({
            name : 'billet',
            img : 'billet',
            nb : 5,
            win : 'true'
        })
    };

    for(let i=0; i<=25; i++){
        lot.push({
            name : 'piece',
            img : 'piece',
            nb : 5,
            win : 'true'
        })
    };

    for(let i=0; i<=100; i++){
        lot.push({
            name : 'Vous pouvez rejouer',
            img : 'pouce',
            nb : 0,
            win : false
        })
    };

    //on fait un random dans les lots entre un min et un max
    alealot = Math.floor(Math.random() * (300-0)+0);
    
    //pour mettre le canva 
    let canvas = document.querySelector('#zone');
    let context = canvas.getContext('2d');
    context.globalCompositeOperation='destination-over';

    $('#zone').css('pointer-events', 'none');//pour éviter le grattage si le joueur n'a pas acheté de partie 

    let img = new Image();
    img.src = 'img/zone_game.png';


    //pour afficher l'image sur le canva
    context.drawImage(img, 30,0);
    context.drawImage(img, 313,0);
    context.drawImage(img, 596,0);

    //on va ecouter chaque boutons pour les pieces
    $('#play_piece').click(function()
    {
        let piece=$('#user_piece').html();
        // on va verifier l'utilisateur a assez d'argent 
        if($('#user_piece').html() < 9)
        {
            alert ('Vous n\'avez plus assez de piece!');
        }
        else
        { 
            $.post(
                'op.php',//operation de retrait si l'utilisateur perd
                {
                    //on prend les donnees qu'il va recuperer et on les stock dans un objet
                    action : 'retrait',
                    monnaie : piece ,
                    nb: 9
                }
                
            ).done(function(data)
            {
                $('#user_piece').html(data);
                $('#play_billet').attr('disabled','disabled');//pour desactiver le bouton une fois que le joureur n'a plus d'argent 
                $('#play_piece').attr('disabled','disabled');//idem pour les pieces
                $('#zone').css('pointer-events', 'auto');//pour activer le grattage si le joueur a  acheté une partie 

                for(let i=0; i<=2; i++)
                {
                    //append pour faire apparaitre un element html
                    $('.grat').append('<div class="gain gain_'+i+'"><p>Vous avez gagné</p><p>' + lot[alealot].nb + ' ' + lot[alealot].name + '</p></div>');
                    if(lot[alealot].win==true){//on verifie si le lot est gagné
                        gain.push(//on a un gain que l'on stock un objet à l'interieur d'un tableau gain
                            {
                                name:lot[alealot].name,
                                nb:lot[alealot].nb
                            }
                        )
                    }
                }
            });
        }
    });

    //on va écouter chaque boutons pour les billets
    $('#play_billet').click(function()
    {
        let billet=$('#user_billet').html();
        // on va verifier l'utilisateur a assez d'argent 
        if($('#user_billet').html() < 2)
        {
            alert ('Vous n\'avez plus assez de billet!');
        }
        else
        { 
            $.post(
                'op.php',//operation de retrait  si l'utilisateur perd
                {
                    action : 'retrait',
                    papier : billet,
                    nb: 2
                }
            ).done(function(data)
            {
                $('#user_billet').html(data);
                $('#play_billet').attr('disabled','disabled');//pour desactiver le bouton une fois que le joureur n'a plus d'argent 
                $('#play_piece').attr('disabled','disabled');//idem pour les pieces
                $('#zone').css('pointer-events', 'auto');//pour activer le grattage si le joueur a  acheté une partie 

                for(let i=0; i<=2; i++)
                {
                    $('.grat').append('<div class="gain gain_'+i+'"><p>Bravo,<br/>Vous avez gagné</p><p>' + lot[alealot].nb + ' ' + lot[alealot].name + '</p></div>');
                    if(lot[alealot].win){//on verifie si le lot est gagné
                        gain.push(//on a un gain que l'on stock un objet à l'interieur d'un tableau gain
                            {
                                name : lot[alealot].name,
                                nb : lot[alealot].nb
                            }
                        )
                    }
                }
            });  
        }
    });

    // on ecoute le click de la souris pour la fonction grattage
    $('#zone').mousedown(function()
    {
        let mousedown = true;
        $('#zone').mousemove(function(e)//(e) = evenement du click de la souris
        {
            if(mousedown!=false)
            {
                context.clearRect(e.offsetX-15, e.offsetY-15,30,30);//on se place sur le canva 
                //le clearRect = grattage
            }
            $('#zone').mouseup(function()
            {
                mousedown = false; // pour arreter la fonction de grattage
            });
        });
    });
    
    $('#recup').click(function()//lorsqu'on clique sur recup
    {
        
        //on parcours tout le tableau gain pour voir s'il y a des lots gagnés
        if(gain.length>0)
        {
            for(let i=0; i<=gain.length-1; i++)
            {
                console.log(gain[i]);
                $.post(
                    'op.php',//operation de depot si l'utilisateur gagne 
                    {
                        action : 'depot',
                        monnaie : gain[i].name,
                        nb : gain[i].nb
                    }
                    
                ).done(function()
                {
                    //on recharge la page afin de réajuster les compteurs
                    location.reload();
                }
                );
            };
        }
        else
        {
            //on recharge la page afin de réajuster les compteurs
            location.reload();
        }
    });
});