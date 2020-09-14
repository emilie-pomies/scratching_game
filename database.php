<?php

$db = new PDO('mysql:host=localhost:3308; dbname=casino', 'root', '');

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);